import { DataSourceType } from "../types";
import DataSource from "./dataSource.js";

export default class NativeDataSource extends DataSource {
	resource: string;
	groupResource: string | undefined;
	dimensionItemType: string | undefined;
	groupKey: string | undefined;
	filterType: string | undefined;
	groupsQuery: any;
	dataSourcesQuery: any;

	constructor({
		label,
		resource,
		groupResource,
		dimensionItemType,
		groupKey,
		type,
		filterType,
		filter,
	}: DataSourceType) {
		super({ resource, label, type, filter });
		this.resource = resource;
		this.groupResource = groupResource;
		this.dimensionItemType = dimensionItemType;
		this.groupKey = groupKey;
		this.filterType = filterType ?? "eq";

		this.groupsQuery = {
			groups: {
				resource: this?.groupResource,
				params: {
					fields: [
						"displayName",
						"name",
						"id",
						`${this?.resource}[displayName,id,shortName,description,name]`,
					],
				},
			},
		};

		this.dataSourcesQuery = {
			sources: {
				resource: this.resource,
				params: ({
					page,
					filter,
				}: {
					page: number;
					filter: Array<string>;
				}) => ({
					page,
					pageSize: 100,
					totalPages: true,
					fields: [
						"displayName",
						"id",
						"shortName",
						"description",
						"name",
					],
					filter,
					order: "displayName:asc",
				}),
			},
		};
	}
}
