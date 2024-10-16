import { z } from "zod";
import type { RowData } from "@tanstack/react-table";

export const supportedDataSources = z.enum([
	"indicator",
	"programIndicator",
	"dataSet",
	"dataElement",
	"customFunction",
	"sqlView",
]);

export const scorecardSharing = z.object({
	owner: z.string(),
	external: z.boolean(),
	public: z.string(),
	users: z.record(
		z.string(),
		z.object({ access: z.string(), id: z.string() }),
	),
	userGroups: z.record(
		z.string(),
		z.object({ access: z.string(), id: z.string() }),
	),
});

export type ScorecardSharing = z.infer<typeof scorecardSharing>;

export type SupportedDataSources = z.infer<typeof supportedDataSources>;

export const legendDefinitionSchema = z.object({
	id: z.string(),
	color: z.string(),
	name: z.string(),
	isDefault: z.boolean().optional(),
});

export type LegendDefinition = z.infer<typeof legendDefinitionSchema>;

export const scorecardViewOptionsSchema = z.object({
	averageColumn: z.boolean().optional(),
	averageDisplayType: z
		.enum(["ALL", "ABOVE_AVERAGE", "BELOW_AVERAGE"])
		.optional(),
	averageRow: z.boolean().optional(),
	emptyRows: z.boolean().optional(),
	highlightedIndicators: z.boolean().optional(),
	itemNumber: z.boolean().optional(),
	legend: z.boolean().optional(),
	showHierarchy: z.boolean().optional(),
	title: z.boolean().optional(),
	arrows: z.boolean().optional(),
	showDataInRows: z.boolean().optional(),
	disableExpanding: z.boolean().optional(),
	disablePagination: z.boolean().optional(),
	printMode: z.boolean().optional(),
});

export type ScorecardViewOptions = z.infer<typeof scorecardViewOptionsSchema>;

export const organisationUnitSelectionSchema = z.object({
	userOrgUnit: z.boolean().optional(),
	userSubUnit: z.boolean().optional(),
	userSubX2Unit: z.boolean().optional(),
	orgUnits: z.array(
		z.object({
			id: z.string(),
		}),
	),
	groups: z.array(z.string()).optional(),
	levels: z.array(z.string()).optional(),
});

export type OrgUnitSelection = z.infer<typeof organisationUnitSelectionSchema>;

export const periodSelectionSchema = z.object({
	periods: z.array(
		z.object({
			id: z.string(),
		}),
	),
	type: z.string().optional(),
});

export type PeriodSelection = z.infer<typeof periodSelectionSchema>;

export const legendSchema = z.object({
	legendDefinitionId: z.string(),
	id: z.string(),
	startValue: z.union([z.string(), z.number()]),
	endValue: z.union([z.string(), z.number()]),
});

export type ScorecardLegend = z.infer<typeof legendSchema>;

export const specificTargetSchema = z.object({
	type: z.enum(["periods", "orgUnit"]),
	items: z.array(z.string()),
	legends: z.array(legendSchema),
});

export type SpecificTarget = z.infer<typeof specificTargetSchema>;

export const orgUnitLevelLegendSchema = z.record(
	z.string(),
	z.array(legendSchema),
);

export type OrgUnitLevelLegend = z.infer<typeof orgUnitLevelLegendSchema>;

export const dataSourceSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string().optional(),
	type: supportedDataSources,
	displayArrows: z.boolean(),
	highIsGood: z.boolean(),
	effectiveGap: z.number(),
	showColors: z.boolean(),
	weight: z.number(),
	legends: z.union([z.array(legendSchema), orgUnitLevelLegendSchema]),
	specificTargets: z.array(specificTargetSchema).optional(),
	specificTargetsSet: z.boolean().optional(),
	description: z.string().optional(),
});

export type ScorecardDataSource = z.infer<typeof dataSourceSchema>;

export const dataHolderSchema = z.object({
	id: z.union([z.number(), z.string()]),
	dataSources: z.array(dataSourceSchema),
});

export type ScorecardDataHolder = z.infer<typeof dataHolderSchema>;

export const dataGroupSchema = z.object({
	id: z.union([z.number(), z.string()]),
	dataHolders: z.array(dataHolderSchema),
	style: z.object({}),
	title: z.string(),
});

export type ScorecardDataGroup = z.infer<typeof dataGroupSchema>;

export const scorecardConfig = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string().optional(),
	customHeader: z.string().optional(),
	description: z.string().optional(),
	legendDefinitions: z.array(legendDefinitionSchema),
	options: scorecardViewOptionsSchema,
	orgUnitSelection: organisationUnitSelectionSchema,
	periodSelection: periodSelectionSchema,
	dataSelection: z.object({
		dataGroups: z.array(dataGroupSchema),
	}),
	highlightedIndicators: z.array(dataSourceSchema),
	additionalLabels: z.array(z.string()).optional(),
	sharing: scorecardSharing,
});

export type ScorecardConfig = z.infer<typeof scorecardConfig>;

const scorecardStateSchema = z.object({
	orgUnitSelection: organisationUnitSelectionSchema,
	periodSelection: periodSelectionSchema,
	options: scorecardViewOptionsSchema,
	nested: z.boolean().optional(),
	hasOnePeriod: z.boolean().optional(),
});

export type ScorecardState = z.infer<typeof scorecardStateSchema>;

export const scorecardAnalyticsData = z.object({
	dx: z.string().optional(),
	pe: z.string().optional(),
	ou: z.string().optional(),
	value: z.string().optional(),
});

export type ScorecardAnalyticsData = z.infer<typeof scorecardAnalyticsData>;

export const scorecardTableData = z.object({
	label: z.string(),
	dataHolder: dataHolderSchema.optional(),
	orgUnit: z
		.object({
			uid: z.string(),
			name: z.string(),
			hierarchy: z.string(),
		})
		.optional(),
	expand: z.boolean().optional(),
});

export type ScorecardTableData = z.infer<typeof scorecardTableData> & RowData;

export const scorecardTableCellConfig = z.object({
	dataSources: z.array(dataSourceSchema),
	orgUnit: z.object({
		uid: z.string(),
		name: z.string(),
		hierarchy: z.string(),
	}),
	previousPeriod: z.string().optional(),
	currentPeriod: z.string().optional(),
});
export type ScorecardTableCellConfig = z.infer<typeof scorecardTableCellConfig>;

export const scorecardTableAverageCellConfig = z.object({
	dataHolder: dataHolderSchema.optional(),
	orgUnit: z
		.object({
			uid: z.string(),
			name: z.string(),
			hierarchy: z.string(),
		})
		.optional(),
});
export type ScorecardTableAverageCellConfig = z.infer<
	typeof scorecardTableAverageCellConfig
>;

export const scorecardCellDataSchema = dataSourceSchema.extend({
	data: z.object({
		previous: z.number().optional(),
		current: z.number().optional(),
	}),
});
export type ScorecardCellData = z.infer<typeof scorecardCellDataSchema>;

export const scorecardAverageCellDataSchema = dataSourceSchema.extend({
	data: z.object({
		average: z.number().optional(),
	}),
});
export type ScorecardAverageCellData = z.infer<
	typeof scorecardAverageCellDataSchema
>;

export type SanitizedScorecardTableData = z.infer<typeof scorecardTableData>;

export enum ScorecardTableOrientation {
	ORG_UNIT_VS_DATA = "orgUnitsVsData",
	DATA_VS_ORG_UNIT = "dataVsOrgUnits",
}

export enum ScorecardTableDimension {
	GROUP = "group",
	ORG_UNITS = "orgUnits",
	PERIODS = "periods",
	DATA = "data",
}

export enum ScorecardDraggableItems {
	ou = "ou",
	data = "data",
}
