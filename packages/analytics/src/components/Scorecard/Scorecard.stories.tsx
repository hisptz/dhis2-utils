import type { Meta, StoryObj } from "@storybook/react";
import { Scorecard } from "./Scorecard";
import { useState } from "react";
import type { ScorecardConfig, ScorecardState } from "./schemas/config";

const config: ScorecardConfig = {
	additionalLabels: [],
	customHeader: "",
	dataSelection: {
		dataGroups: [
			{
				id: 1,
				style: {
					backgroundColor: "#ffffff",
					color: "#000000",
				},
				title: "Default",
				dataHolders: [
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "BvG8P80QxqZ",
								label: "Access to ANC Services",
								legends: [
									{
										endValue: 100,
										id: "KjB8Vu688Zt",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "v6LtGSWMZTO",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "vJ6n0zUtRrk",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 2,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "C2R035EN1zx",
								label: "Availability of Tetanus Toxoid",
								legends: [
									{
										endValue: 100,
										id: "QFK7ZrZurS3",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "GYTuVDo0vzy",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "DBLuwCA6uiR",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 3,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "GUEA7Zd1F54",
								label: "Effective Coverage/Quality FANC Lab Tests",
								legends: [
									{
										endValue: 100,
										id: "egUAbSDN7MO",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "Gty3ercXhsg",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "lOqd8XcN0cZ",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],

								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 4,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "cn8c5IGTCrf",
								label: "Initial Utilization ANC",
								legends: [
									{
										endValue: 100,
										id: "QeqKnBXQwli",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "lR3oMGM3Aa1",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "DXEPrwPrNhF",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 5,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "Ho2X2O2NIzk",
								label: "Availability of Trained FANC Providers",
								legends: [
									{
										endValue: 100,
										id: "oZhlGAuF13r",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "jc2EeNHcZom",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "Xik6Fc3iyiw",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 6,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "DjsVrjWMW5S",
								label: "Continuous Utilization ANC Visits",
								legends: [
									{
										endValue: 100,
										id: "won0Ug3ntZg",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "GZhbgMilsz6",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "TxPBfk2kHpt",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 7,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "BVmO0Bd9VtS",
								label: "Effective Coverage/Quality FANC Visits",
								legends: [
									{
										endValue: 100,
										id: "Ua4EympkZiH",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "rz2MtBuFYTX",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "sOr783XaYYT",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 8,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "A26Oa7x7EWJ",
								label: "BNA:ANC5-Expected number of pregnant women living with HIV",
								legends: [
									{
										endValue: 100,
										id: "AFUPJir5Mwn",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "F2SDpR8kMHb",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "diY4prSZLrJ",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: 9,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "EHAnAym87BH",
								label: "BNA:ANC11-HIV+ve Preg. women already on ART in ANC.",
								legends: [
									{
										endValue: 100,
										id: "Z9SmhhDasDS",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "xWk12wEbZas",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "IBWupUpsyAQ",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: 10,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "K44UklHPDAM",
								label: "BNA:ANC10-HIV+ve Preg. women newly initated on ART in ANC",
								legends: [
									{
										endValue: 100,
										id: "VPrYeWL0Dld",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "GxDt98wdMr2",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "QKejtfJmZAO",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: 11,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "QnGKELt394W",
								label: "BNA:ANC25 Number of facilities providing PMTCT services",
								legends: [
									{
										endValue: 100,
										id: "ugjegNo4ixI",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "TQ0naUSBQEl",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "deKo9MtqJy8",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: 12,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "TyvkjWQLXIS",
								label: "Availability of Trained Skilled Delivery Providers",
								legends: [
									{
										endValue: 100,
										id: "TQILYLxSOwp",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "y4yrdCU4ynY",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "PTohHNOAW6J",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],

								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 13,
					},
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "NZrLwW5idYW",
								label: "Continuous Utilization Infant Feeding",
								legends: [
									{
										endValue: 100,
										id: "L1lgzPgeGMO",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "HFUVP7D9ZJR",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "wBwnmpenkQY",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 14,
					},
				],
			},
		],
	},
	description: "Scorecard Cat district",
	highlightedIndicators: [],
	id: "3pjJ58PtVrm",
	legendDefinitions: [
		{
			color: "#008000",
			id: "#008000",
			name: "Target achieved / on track",
		},
		{
			color: "#FFFF00",
			id: "#FFFF00",
			name: "Progress, but more effort required",
		},
		{
			color: "#FF0000",
			id: "#FF0000",
			name: "Not on track",
		},
		{
			color: "#D3D3D3",
			id: "N/A",
			isDefault: true,
			name: "N/A",
		},
		{
			color: "#FFFFFF",
			id: "No data",
			isDefault: true,
			name: "No data",
		},
	],
	options: {
		averageColumn: false,
		averageDisplayType: "ALL",
		averageRow: false,
		emptyRows: true,
		highlightedIndicators: false,
		itemNumber: true,
		legend: true,
		showHierarchy: true,
		title: true,
	},
	orgUnitSelection: {
		groups: [],
		levels: [],
		orgUnits: [
			{
				id: "P8hBn1kPPau",
			},
			{
				id: "RI95HQRHbKc",
			},
			{
				id: "uxeKkkTXQBJ",
			},
			{
				id: "VkxNyvaLtoz",
			},
			{
				id: "gsTTPvFXTAk",
			},
			{
				id: "Ec0GNLtOnoS",
			},
			{
				id: "NR9TAx2SccV",
			},
			{
				id: "q4u5ODUDUrF",
			},
		],
		userOrgUnit: false,
		userSubUnit: false,
		userSubX2Unit: false,
	},
	periodSelection: {
		periods: ["2020Q4"],
		type: "Quarterly",
	},
	subtitle: "",
	title: "RMNCAH Monitoring",
};

const meta: Meta<typeof Scorecard> = {
	title: "Scorecard",
	component: Scorecard,
	decorators: (Story) => {
		const [scorecardState, setScorecardState] = useState<ScorecardState>({
			orgUnitSelection: config.orgUnitSelection,
			periodSelection: config.periodSelection,
			options: config.options,
		});
		return <Story args={{ config, state: scorecardState }} />;
	},
};

export default meta;

type Story = StoryObj<typeof Scorecard>;

export const Default: Story = {
	name: "Default View",
};
