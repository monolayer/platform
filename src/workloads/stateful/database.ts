import { StatefulWorkloadWithClient } from "~/workloads/stateful/stateful-workload.js";

/**
 * Database workload.
 *
 * @group Abstract Classes
 * @typeParam C - Client type
 */
export abstract class Database extends StatefulWorkloadWithClient {
	/**
	 * Database name.
	 */
	readonly databaseName: string;

	constructor(
		/**
		 * Database name.
		 */
		databaseName: string,
	) {
		super(databaseName);
		this.databaseName = databaseName;
	}

	/**
	 * Database ID
	 *
	 * **Note:**
	 * Alias of `ìd`.
	 */
	get databaseId() {
		return this.id;
	}

	/**
	 * @internal
	 */
	abstract connStringPrefix(): string;

	/**
	 * @internal
	 */
	get connStringComponents() {
		return [
			this.connStringPrefix(),
			...(this.id === this.databaseName
				? [this.id]
				: [this.id, this.databaseName]),
			"database",
		];
	}
}
