import { flattenDeep, fromPairs } from "lodash";
import { DATASTORE_FUNCTIONS_ENDPOINT } from "../constants";
import DataSource from "./dataSource.js";

const keysQuery = {
	keys: {
		resource: DATASTORE_FUNCTIONS_ENDPOINT,
	},
};

const generateQuery = (keys: Array<string> | undefined) => {
	return fromPairs(
		keys?.map((key) => [
			key,
			{ resource: DATASTORE_FUNCTIONS_ENDPOINT, id: key },
		]),
	);
};

export default class CustomFunctions extends DataSource {
	functions: any | undefined;
	keys: Array<string> | undefined;
	rules: any | undefined;
	query: any | undefined;

	constructor({ label }: { label: string }) {
		super({ resource: "", label, type: "customFunction" });
	}

	async setQuery(engine: any) {
		this.keys = (await engine.query(keysQuery))?.keys;
		this.query = generateQuery(this.keys);
	}

	async queryData(engine: any) {
		try {
			await this.setQuery(engine);
			this.functions = Object.values(await engine.query(this.query));
			this.rules = flattenDeep(
				this.functions?.map(
					(func: any) =>
						func.rules?.map((rule: any) => ({
							id: `${func.id}.${rule.id}`,
							displayName: rule.name,
						})),
				),
			);
		} catch (e) {
			console.error(e);
			this.functions = [];
			this.rules = [];
		}
	}
}
