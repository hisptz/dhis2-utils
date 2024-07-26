import { z } from "zod";

export const supportedDataSources = z.enum([
	"indicator",
	"dataElement",
	"dataSet",
	"",
]);

export type SupportedDataSources = z.infer<typeof supportedDataSources>;

export const legendDefinitionSchema = z.object({
	id: z.string(),
	color: z.string(),
	name: z.string(),
	isDefault: z.boolean().optional(),
});

export type LegendDefinition = z.infer<typeof legendDefinitionSchema>;

export const scorecardViewOptionsSchema = z.object({
	averageColumn: z.boolean(),
	averageDisplayType: z.enum(["ALL"]),
	averageRow: z.boolean(),
	emptyRows: z.boolean(),
	highlightedIndicators: z.boolean(),
	itemNumber: z.boolean(),
	legend: z.boolean(),
	showHierarchy: z.boolean(),
	title: z.boolean(),
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
	groups: z.array(z.string()),
	levels: z.array(z.string()),
});

export type OrgUnitSelection = z.infer<typeof organisationUnitSelectionSchema>;

export const periodSelectionSchema = z.object({
	periods: z.array(z.string()),
	type: z.string(),
});

export type PeriodSelection = z.infer<typeof periodSelectionSchema>;

export const legendSchema = z.object({
	legendDefinitionId: z.string(),
	id: z.string(),
	startValue: z.number(),
	endValue: z.number(),
});

export type ScorecardLegend = z.infer<typeof legendSchema>;

export const dataSourceSchema = z.object({
	id: z.string(),
	label: z.string().optional(),
	type: supportedDataSources,
	displayArrows: z.boolean(),
	highIsGood: z.boolean(),
	effectiveGap: z.number(),
	showColors: z.boolean(),
	weight: z.number(),
	legends: z.array(legendSchema),
});

export type ScorecardDataSource = z.infer<typeof dataSourceSchema>;

export const dataHolderSchema = z.object({
	id: z.number(),
	dataSources: z.array(dataSourceSchema),
});

export type ScorecardDataHolder = z.infer<typeof dataHolderSchema>;

export const dataGroupSchema = z.object({
	id: z.number(),
	dataHolders: z.array(dataHolderSchema),
	style: z.object({}),
	title: z.string(),
});

export type ScorecardDataGroup = z.infer<typeof dataGroupSchema>;

const scorecardConfig = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string(),
	customHeader: z.string(),
	description: z.string().optional(),
	legendDefinitions: z.array(legendDefinitionSchema),
	options: scorecardViewOptionsSchema,
	orgUnitSelection: organisationUnitSelectionSchema,
	periodSelection: periodSelectionSchema,
	dataSelection: z.object({
		dataGroups: z.array(dataGroupSchema),
	}),
	highlightedIndicators: z.array(dataSourceSchema),
	additionalLabels: z.array(z.string()),
});

export type ScorecardConfig = z.infer<typeof scorecardConfig>;

const scorecardStateSchema = z.object({
	orgUnitSelection: organisationUnitSelectionSchema,
	periodSelection: periodSelectionSchema,
	options: scorecardViewOptionsSchema,
});

export type ScorecardState = z.infer<typeof scorecardStateSchema>;
