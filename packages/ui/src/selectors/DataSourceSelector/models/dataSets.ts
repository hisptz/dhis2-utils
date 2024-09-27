import { CustomDataSource } from "./customDataSource";

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

export default class DataSets extends CustomDataSource {
	groupKey = "id";
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
	groupsQuery: any = {
		groups: {
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
	dataSourcesQuery: any = {
		sources: {
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

	getSources(data: { sources: { pager: Pager; [key: string]: unknown } }) {
		return (
			data?.sources?.dataSets as Array<{
				id: string;
				displayName: string;
			}>
		)
			?.map(({ id, displayName }: { id: string; displayName: string }) =>
				this.categories.map(
					({ id: categoryId, label: categoryLabel }) => ({
						id: `${id}.${categoryId}`,
						displayName: `${displayName} - ${categoryLabel}`,
					}),
				),
			)
			.flat();
	}
}
