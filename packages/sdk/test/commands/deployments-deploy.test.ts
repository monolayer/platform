import { execFileSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import DeploymentsDeploy from "../../src/commands/deployments/deploy.js";

const captureStdout = async <T>(task: () => Promise<T>) => {
	const chunks: Array<string> = [];
	const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(((
		chunk: string | Uint8Array,
	) => {
		chunks.push(
			typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"),
		);
		return true;
	}) as typeof process.stdout.write);

	try {
		const result = await task();
		return { result, stdout: chunks.join("") };
	} finally {
		writeSpy.mockRestore();
	}
};

const jsonResponse = (
	status: number,
	body: unknown,
	headers: Record<string, string> = {},
): Response =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			...headers,
		},
	});

const withTempDir = async <T>(task: (dir: string) => Promise<T>): Promise<T> => {
	const dir = await mkdtemp(path.join(tmpdir(), "deployments-deploy-test-"));
	try {
		return await task(dir);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
};

const runInCwd = async <T>(
	cwd: string,
	task: () => Promise<T>,
): Promise<T> => {
	const originalCwd = process.cwd();
	process.chdir(cwd);
	try {
		return await task();
	} finally {
		process.chdir(originalCwd);
	}
};

const initializeGitRepo = async (
	repoDir: string,
	branchName: string,
): Promise<void> => {
	execFileSync("git", ["init"], { cwd: repoDir, stdio: "ignore" });
	execFileSync("git", ["checkout", "-b", branchName], {
		cwd: repoDir,
		stdio: "ignore",
	});
};

describe("deployments deploy command", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.clearAllMocks();
	});

	it("triggers deployment, polls logs, and stops when finished", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				jsonResponse(202, {
					type: "triggered",
					success: true,
					deploymentNumber: "dep-101",
					queued: false,
				}),
			)
			.mockResolvedValueOnce(
				jsonResponse(
					200,
					{
						status: "Ongoing",
						logs: [
							{
								message: "Build started",
								timestamp: 1_762_200_001_000,
								logGroupName: "group",
								logStreamName: "stream",
								eventId: "evt-1",
							},
						],
					},
					{ "x-next-since": "1762200002000" },
				),
			)
			.mockResolvedValueOnce(
				jsonResponse(200, {
					status: "Finished",
					logs: [
						{
							message: "Build finished",
							timestamp: 1_762_200_003_000,
							logGroupName: "group",
							logStreamName: "stream",
							eventId: "evt-2",
						},
					],
				}),
			);

		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			DeploymentsDeploy.run([
				"--base-url",
				"https://api.monolayer.com",
				"--deployment-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
				"--branch-name",
				"feature/test-branch",
				"--poll-interval-ms",
				"0",
			]),
		);

		expect(result.branchName).toBe("feature/test-branch");
		expect(result.status).toBe("Finished");
		expect(result.logs).toHaveLength(2);
		expect(stdout).toContain("Build started");
		expect(stdout).toContain("Build finished");
		expect(fetchMock).toHaveBeenCalledTimes(3);

		const firstCall = fetchMock.mock.calls[0];
		const firstUrl = firstCall?.[0] as URL;
		const firstInit = firstCall?.[1] as RequestInit;
		expect(firstUrl.toString()).toBe("https://api.monolayer.com/sdk/deployments");
		expect(firstInit.method).toBe("POST");
		expect(firstInit.headers).toMatchObject({
			authorization: "Bearer deploy_token_test",
		});
		expect(firstInit.body).toBe(
			JSON.stringify({ branchName: "feature/test-branch" }),
		);

		const secondCallUrl = fetchMock.mock.calls[1]?.[0] as URL;
		const thirdCallUrl = fetchMock.mock.calls[2]?.[0] as URL;
		expect(secondCallUrl.searchParams.get("since")).toBeNull();
		expect(thirdCallUrl.searchParams.get("since")).toBe("1762200002000");
	});

	it("does not poll when trigger response is queued", async () => {
		const fetchMock = vi.fn().mockResolvedValueOnce(
			jsonResponse(202, {
				type: "queued",
				success: true,
				queued: true,
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			DeploymentsDeploy.run([
				"--base-url",
				"https://api.monolayer.com",
				"--deployment-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
				"--branch-name",
				"feature/test-branch",
			]),
		);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(result.status).toBe("Queued");
		expect(result.logs).toHaveLength(0);
		expect(stdout).toContain("Deployment already queued");
	});

	it("stops polling immediately when polled status is queued", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				jsonResponse(202, {
					type: "triggered",
					success: true,
					deploymentNumber: "dep-102",
					queued: false,
				}),
			)
			.mockResolvedValueOnce(
				jsonResponse(
					200,
					{
						status: "Queued",
						logs: [
							{
								message: "Queued behind active deployment",
								timestamp: 1_762_200_010_000,
								logGroupName: "group",
								logStreamName: "stream",
							},
						],
					},
					{ "x-next-since": "1762200011000" },
				),
			);

		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			DeploymentsDeploy.run([
				"--base-url",
				"https://api.monolayer.com",
				"--deployment-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
				"--branch-name",
				"feature/test-branch",
				"--poll-interval-ms",
				"0",
			]),
		);

		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(result.status).toBe("Queued");
		expect(result.logs).toHaveLength(1);
		expect(stdout).toContain("Queued behind active deployment");
	});

	it("fails command when deployment reaches failed terminal status", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				jsonResponse(202, {
					type: "triggered",
					success: true,
					deploymentNumber: "dep-105",
					queued: false,
				}),
			)
			.mockResolvedValueOnce(
				jsonResponse(200, {
					status: "Failed",
					logs: [
						{
							message: "Build failed",
							timestamp: 1_762_200_020_000,
							logGroupName: "group",
							logStreamName: "stream",
						},
					],
				}),
			);

		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				DeploymentsDeploy.run([
					"--base-url",
					"https://api.monolayer.com",
					"--deployment-token",
					"deploy_token_test",
					"--project-id",
					"proj-1",
					"--branch-name",
					"feature/test-branch",
					"--poll-interval-ms",
					"0",
				]),
			),
		).rejects.toThrow(/Deployment dep-105 failed/);

		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	it("uses --branch-name and does not read git branch automatically", async () => {
		await withTempDir(async (dir) => {
			const fetchMock = vi
				.fn()
				.mockResolvedValueOnce(
					jsonResponse(202, {
						type: "triggered",
						success: true,
						deploymentNumber: "dep-103",
						queued: false,
					}),
				)
				.mockResolvedValueOnce(
					jsonResponse(200, {
						status: "Finished",
						logs: [],
					}),
				);

			vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

			const { result } = await runInCwd(dir, () =>
				captureStdout(() =>
					DeploymentsDeploy.run([
						"--base-url",
						"https://api.monolayer.com",
						"--deployment-token",
						"deploy_token_test",
						"--project-id",
						"proj-1",
						"--branch-name",
						"feature/from-flag",
						"--poll-interval-ms",
						"0",
					]),
				),
			);

			expect(result.branchName).toBe("feature/from-flag");
			const firstCall = fetchMock.mock.calls[0];
			const firstInit = firstCall?.[1] as RequestInit;
			expect(firstInit.body).toBe(
				JSON.stringify({ branchName: "feature/from-flag" }),
			);
		});
	});

	it("reads current git branch when --branch-name is omitted", async () => {
		await withTempDir(async (dir) => {
			await initializeGitRepo(dir, "feature/from-git");

			const fetchMock = vi
				.fn()
				.mockResolvedValueOnce(
					jsonResponse(202, {
						type: "triggered",
						success: true,
						deploymentNumber: "dep-104",
						queued: false,
					}),
				)
				.mockResolvedValueOnce(
					jsonResponse(200, {
						status: "Finished",
						logs: [],
					}),
				);

			vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

			const { result } = await runInCwd(dir, () =>
				captureStdout(() =>
					DeploymentsDeploy.run([
						"--base-url",
						"https://api.monolayer.com",
						"--deployment-token",
						"deploy_token_test",
						"--project-id",
						"proj-1",
						"--poll-interval-ms",
						"0",
					]),
				),
			);

			expect(result.branchName).toBe("feature/from-git");

			const firstCall = fetchMock.mock.calls[0];
			const firstInit = firstCall?.[1] as RequestInit;
			expect(firstInit.body).toBe(
				JSON.stringify({ branchName: "feature/from-git" }),
			);
		});
	});

	it("fails with a controlled error outside git repos when --branch-name is omitted", async () => {
		await withTempDir(async (dir) => {
			const fetchMock = vi.fn();
			vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

			await expect(
				runInCwd(dir, () =>
					DeploymentsDeploy.run([
						"--base-url",
						"https://api.monolayer.com",
						"--deployment-token",
						"deploy_token_test",
						"--project-id",
						"proj-1",
						"--poll-interval-ms",
						"0",
					]),
				),
			).rejects.toThrow(/Unable to determine current git branch/);

			expect(fetchMock).not.toHaveBeenCalled();
		});
	});
});
