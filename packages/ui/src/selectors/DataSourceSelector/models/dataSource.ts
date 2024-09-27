export default class DataSource {
	label: string;
	type: string;
	resource: string | undefined;
	groupResource: string | undefined;
	dimensionItemType: string | undefined;
	groupKey: string | undefined;
	filterType: string | undefined;
	groupsQuery: any;
	dataSourcesQuery: any;
	filter?: string[];

	constructor({
		label,
		type,
		resource,
		filter,
	}: {
		label: string;
		type: string;
		resource: string;
		filter?: string[];
	}) {
		this.label = label;
		this.type = type;
		this.resource = resource;
		this.filter = filter;
	}
}
