import { filter as _filter, flattenDeep } from "lodash";
import { DataSourceResponse } from "../types/index.js";
import DataSource from "./nativeDataSource.js";

export interface Pager {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export function updatePager(pager: Pager, itemListLength: number) {
	const { page, pageSize } = pager;

	return {
		page,
		pageSize,
		pageCount: Math.ceil(itemListLength / pageSize),
		total: itemListLength,
	};
}

export default class DataSets extends DataSource {
	groupKey = "dataSets.id";
	groupResource = "dataSets";
	categories: Array<{ label: string; id: string }> = [
		{
			label: "Reporting rate",
			id: "REPORTING_RATE",
		},
		{
			label: "Reporting rate on time",
			id: "REPORTING_RATE_ON_TIME",
		},
		{
			label: "Actual reports",
			id: "ACTUAL_REPORTS",
		},
		{
			label: "Actual reports on time",
			id: "ACTUAL_REPORTS_ON_TIME",
		},
		{
			label: "Expected Reports",
			id: "EXPECTED_REPORTS",
		},
	];
	groups: Array<any> = [];
	groupQuery: any = {
		dataSets: {
			resource: this.groupResource,
			params: ({
				page,
				filter,
			}: {
				page: number;
				filter: Array<string>;
			}) => ({
				page,
				fields: ["id", "displayName"],
				totalPages: true,
				filter,
				order: "displayName:asc",
			}),
		},
	};

	constructor({ label }: { label: string }) {
		super({
			resource: "",
			label: label ?? "Data Sets",
			type: "dataSet",
		});
	}

	async getData(engine: any) {
		this.groups = engine.query(this.groupQuery)?.dataSets;
	}

	async getDataSources(
		engine: any,
		{ filter, page }: { filter: Array<string>; page: number },
	) {
		const response = await engine.query(this.groupQuery, {
			variables: { filter, page },
		});
		return {
			pager: response?.dataSets?.pager,
			data: flattenDeep(
				response?.dataSets?.dataSets?.map(
					({
						id,
						displayName,
					}: {
						id: string;
						displayName: string;
					}) =>
						this.categories.map(
							({ id: categoryId, label: categoryLabel }) => ({
								id: `${id}.${categoryId}`,
								displayName: `${displayName} - ${categoryLabel}`,
							}),
						),
				),
			),
		};
	}

	async getGroups(engine: any) {
		const response = await engine.query(this.groupQuery, {
			variables: { filter: null, page: 1 },
		});
		return response?.dataSets?.dataSets ?? [];
	}

	async filter(
		engine: any,
		{
			filter,
			selectedGroup,
			page,
			searchKeyword,
		}: {
			filter: Array<string>;
			selectedGroup: { id: string };
			page: number;
			searchKeyword: string;
		},
	): Promise<DataSourceResponse> {
		const { data, pager } = await this.getDataSources(engine, {
			filter,
			page,
		});
		if (selectedGroup) {
			const filteredData = _filter(data, ({ id }: { id: string }) => {
				return id.split(".")[0] === selectedGroup?.id;
			});
			if (searchKeyword) {
				const searchedData = _filter(
					filteredData,
					({ id, displayName }) => {
						const index = `${id}-${displayName}`;
						return index.match(new RegExp(searchKeyword));
					},
				);
				return {
					pager: updatePager(pager, searchedData.length),
					data: searchedData,
				};
			}
			return Promise.resolve({
				pager: updatePager(pager, filteredData.length),
				data: filteredData,
			});
		}
		if (searchKeyword) {
			const filteredData = _filter(data, ({ id, displayName }) => {
				const index = `${id}-${displayName}`;
				return index
					.toLowerCase()
					.match(new RegExp(searchKeyword.toLowerCase()));
			});
			return Promise.resolve({
				pager: updatePager(pager, filteredData.length),
				data: filteredData,
			});
		}
		return await this.getDataSources(engine, { filter, page });
	}
}
