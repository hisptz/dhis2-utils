import DataSource from "./dataSource";
import type { Pager } from "./dataSets";

export class CustomDataSource extends DataSource {
	getSources(data: {
		sources: { pager: Pager; [key: string]: unknown };
	}): Array<{ id: string; displayName: string }> {
		throw "Not implemented";
	}
}
