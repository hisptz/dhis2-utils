import NativeDataSource from "./nativeDataSource.js";

export default class EventDataItems extends NativeDataSource {
	constructor() {
		super({
			label: "Event Data Items",
			resource: "programTrackedEntityAttributes",
			dimensionItemType: "[PROGRAM_DATA_ELEMENT,PROGRAM_ATTRIBUTE]",
			filterType: "in",
			groupKey: "programId",
			groupResource: "programs",
			type: "programDataItem",
		});

		this.dataSourcesQuery = {
			attributes: {
				resource: "programs",
				id: ({ id }: { id: string }) => id,
				params: {
					fields: [
						"id",
						"programTrackedEntityAttributes[trackedEntityAttribute[id,displayName,valueType,shortName]]",
					],
				},
			},
			dataElements: {
				resource: "programDataElements",
				params: ({
					id,
					page,
					filter,
				}: {
					id: string;
					page: number;
					filter: Array<string>;
				}) => ({
					program: id,
					page,
					filter: [`valueType:eq:NUMBER`, ...filter],
					fields: [
						"dataElement[id,displayName]",
						"displayName",
						"valueType",
						"shortName",
					],
				}),
			},
		};
	}
}
