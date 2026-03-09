# Monolayer CLI

Command-line interface for Monolayer control plane operations.

Documentation: https://monolayer.dev/docs/cli/overview

Current command surface:

- `projects:list`
- `deployments:deploy`

## Install

```bash
npm install -g @monolayer/cli
```

Or run without global install:

```bash
npx @monolayer/cli@latest --help
```

## Quick Start

Set your control plane URL:

```bash
export MONOLAYER_BASE_URL="https://control-plane-domain"
```

List projects:

```bash
export MONOLAYER_AUTH_TOKEN="token_xxx"
mnlyr projects:list --limit 10
```

Trigger a deployment:

```bash
export MONOLAYER_DEPLOYMENT_TOKEN="deploy_token_xxx"
mnlyr deployments:deploy --project-id proj-1 --branch-name main
```

## Configuration

Base URL:

- `--base-url`
- `MONOLAYER_BASE_URL`

Auth token (`projects:list`):

- `--auth-token`
- `MONOLAYER_AUTH_TOKEN`

Deployment token (`deployments:deploy`):

- `--auth-token`
- `MONOLAYER_DEPLOYMENT_TOKEN`
- must start with `deploy_token_`

## Commands

### `projects:list`

Lists projects with cursor-based pagination.

Flags:

- `--base-url <url>`
- `--auth-token <token>`
- `--cursor <cursor>`
- `--limit <n>` (default: `50`)

Output:

- JSON to stdout

Example:

```bash
mnlyr projects:list --base-url https://control-plane-domain --auth-token token_xxx --limit 10
```

### `deployments:deploy`

Triggers a deployment and streams status/log updates.

Flags:

- `--base-url <url>`
- `--auth-token <deploy_token_...>`
- `--project-id <id>` (required)
- `--branch-name <name>` (optional; defaults to current git branch)
- `--poll-interval-ms <n>` (default: `2000`)

Behavior:

- rejects branch names with `refs/heads/` or `branch/` prefixes
- uses incremental polling (`x-next-since`)
- suppresses blank log lines
- exits non-zero when deployment reaches `Failed`

Example:

```bash
mnlyr deployments:deploy \
  --base-url https://control-plane-domain \
  --auth-token deploy_token_xxx \
  --project-id proj-1 \
  --branch-name main
```

## Help

```bash
mnlyr --help
mnlyr projects:list --help
mnlyr deployments:deploy --help
```

## Contributing

For maintainer and development workflow details, see [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md).

## License

MIT
