import { type DataSourceResponse, DataSourceType } from "../types/index.js";
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
	}: DataSourceType) {
		super({ resource, label, type });
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

		this.getGroups = this.getGroups.bind(this);
		this.getDataSources = this.getDataSources.bind(this);
		this.filter = this.filter.bind(this);
	}

	async getGroups(engine: any) {
		return (await engine.query(this.groupsQuery))?.groups?.[
			`${this.groupResource}`
		];
	}

	async getDataSources(
		engine: any,
		{
			page,
			filter,
			programId,
		}: { page: number; filter?: Array<string>; programId?: string },
	) {
		const response = await engine?.query(this.dataSourcesQuery, {
			variables: {
				page,
				filter: filter ?? [],
			},
		});
		return {
			data: response?.sources?.[this.resource],
			pager: response?.sources?.pager,
		};
	}

	async filter(
		engine: any,
		{
			page,
			selectedGroup,
			searchKeyword,
		}: {
			page: number;
			selectedGroup: { id: string };
			searchKeyword: string;
		},
	): Promise<DataSourceResponse> {
		const filter = [];
		if (selectedGroup?.id) {
			filter.push(`${this.groupKey}:eq:${selectedGroup.id}`);
		}
		if (searchKeyword) {
			filter.push(`identifiable:token:${searchKeyword}`);
		}
		return await this.getDataSources(engine, { page, filter });
	}
}
