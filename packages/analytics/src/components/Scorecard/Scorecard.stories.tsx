import type { Meta, StoryObj } from "@storybook/react";
import { Scorecard } from "./Scorecard";
import type { ScorecardConfig } from "./schemas/config";

// const config: ScorecardConfig = {
// 	additionalLabels: [],
// 	customHeader: "",
// 	dataSelection: {
// 		dataGroups: [
// 			{
// 				id: 1,
// 				style: {
// 					backgroundColor: "#ffffff",
// 					color: "#000000",
// 				},
// 				title: "Default",
// 				dataHolders: [
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "BvG8P80QxqZ",
// 								label: "Access to ANC Services",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "KjB8Vu688Zt",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "v6LtGSWMZTO",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "vJ6n0zUtRrk",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 2,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "C2R035EN1zx",
// 								label: "Availability of Tetanus Toxoid",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "QFK7ZrZurS3",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "GYTuVDo0vzy",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "DBLuwCA6uiR",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 3,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "GUEA7Zd1F54",
// 								label: "Effective Coverage/Quality FANC Lab Tests",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "egUAbSDN7MO",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "Gty3ercXhsg",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "lOqd8XcN0cZ",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
//
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 4,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "cn8c5IGTCrf",
// 								label: "Initial Utilization ANC",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "QeqKnBXQwli",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "lR3oMGM3Aa1",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "DXEPrwPrNhF",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 5,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "Ho2X2O2NIzk",
// 								label: "Availability of Trained FANC Providers",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "oZhlGAuF13r",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "jc2EeNHcZom",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "Xik6Fc3iyiw",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 6,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "DjsVrjWMW5S",
// 								label: "Continuous Utilization ANC Visits",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "won0Ug3ntZg",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "GZhbgMilsz6",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "TxPBfk2kHpt",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 7,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "BVmO0Bd9VtS",
// 								label: "Effective Coverage/Quality FANC Visits",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "Ua4EympkZiH",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "rz2MtBuFYTX",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "sOr783XaYYT",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 8,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "A26Oa7x7EWJ",
// 								label: "BNA:ANC5-Expected number of pregnant women living with HIV",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "AFUPJir5Mwn",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "F2SDpR8kMHb",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "diY4prSZLrJ",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "dataElement",
// 								weight: 100,
// 							},
// 						],
// 						id: 9,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "EHAnAym87BH",
// 								label: "BNA:ANC11-HIV+ve Preg. women already on ART in ANC.",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "Z9SmhhDasDS",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "xWk12wEbZas",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "IBWupUpsyAQ",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "dataElement",
// 								weight: 100,
// 							},
// 						],
// 						id: 10,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "K44UklHPDAM",
// 								label: "BNA:ANC10-HIV+ve Preg. women newly initated on ART in ANC",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "VPrYeWL0Dld",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "GxDt98wdMr2",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "QKejtfJmZAO",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "dataElement",
// 								weight: 100,
// 							},
// 						],
// 						id: 11,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "QnGKELt394W",
// 								label: "BNA:ANC25 Number of facilities providing PMTCT services",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "ugjegNo4ixI",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "TQ0naUSBQEl",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "deKo9MtqJy8",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "dataElement",
// 								weight: 100,
// 							},
// 						],
// 						id: 12,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "TyvkjWQLXIS",
// 								label: "Availability of Trained Skilled Delivery Providers",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "TQILYLxSOwp",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "y4yrdCU4ynY",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "PTohHNOAW6J",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
//
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 13,
// 					},
// 					{
// 						dataSources: [
// 							{
// 								displayArrows: true,
// 								effectiveGap: 5,
// 								highIsGood: true,
// 								id: "NZrLwW5idYW",
// 								label: "Continuous Utilization Infant Feeding",
// 								legends: [
// 									{
// 										endValue: 100,
// 										id: "L1lgzPgeGMO",
// 										legendDefinitionId: "#008000",
// 										startValue: 67,
// 									},
// 									{
// 										endValue: 67,
// 										id: "HFUVP7D9ZJR",
// 										legendDefinitionId: "#FFFF00",
// 										startValue: 34,
// 									},
// 									{
// 										endValue: 34,
// 										id: "wBwnmpenkQY",
// 										legendDefinitionId: "#FF0000",
// 										startValue: 1,
// 									},
// 								],
// 								showColors: true,
// 								type: "indicator",
// 								weight: 100,
// 							},
// 						],
// 						id: 14,
// 					},
// 				],
// 			},
// 		],
// 	},
// 	description: "Scorecard Cat district",
// 	highlightedIndicators: [],
// 	id: "3pjJ58PtVrm",
// 	legendDefinitions: [
// 		{
// 			color: "#008000",
// 			id: "#008000",
// 			name: "Target achieved / on track",
// 		},
// 		{
// 			color: "#FFFF00",
// 			id: "#FFFF00",
// 			name: "Progress, but more effort required",
// 		},
// 		{
// 			color: "#FF0000",
// 			id: "#FF0000",
// 			name: "Not on track",
// 		},
// 		{
// 			color: "#D3D3D3",
// 			id: "N/A",
// 			isDefault: true,
// 			name: "N/A",
// 		},
// 		{
// 			color: "#FFFFFF",
// 			id: "No data",
// 			isDefault: true,
// 			name: "No data",
// 		},
// 	],
// 	options: {
// 		averageColumn: false,
// 		averageDisplayType: "ALL",
// 		averageRow: false,
// 		emptyRows: true,
// 		highlightedIndicators: false,
// 		itemNumber: true,
// 		legend: true,
// 		showHierarchy: true,
// 		title: true,
// 	},
// 	orgUnitSelection: {
// 		groups: [],
// 		levels: [],
// 		orgUnits: [
// 			{
// 				id: "P8hBn1kPPau",
// 			},
// 			{
// 				id: "RI95HQRHbKc",
// 			},
// 			{
// 				id: "uxeKkkTXQBJ",
// 			},
// 			{
// 				id: "VkxNyvaLtoz",
// 			},
// 			{
// 				id: "gsTTPvFXTAk",
// 			},
// 			{
// 				id: "Ec0GNLtOnoS",
// 			},
// 			{
// 				id: "NR9TAx2SccV",
// 			},
// 			{
// 				id: "q4u5ODUDUrF",
// 			},
// 		],
// 		userOrgUnit: false,
// 		userSubUnit: false,
// 		userSubX2Unit: false,
// 	},
// 	periodSelection: {
// 		periods: ["2020Q4"],
// 		type: "Quarterly",
// 	},
// 	subtitle: "",
// 	title: "RMNCAH Monitoring",
// };

const config: ScorecardConfig = {
	additionalLabels: ["Source: HMIS"],
	customHeader:
		'<p style="text-align:center"><span style="font-size:20px"><strong>MINISTRY OF&nbsp;HEALTH - TRAINING LAND LEAGUE TABLE</strong></span></p>\n',
	dataSelection: {
		dataGroups: [
			{
				dataHolders: [
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "UT1DJmtzyox",
								label: "RMNCH ANC 1st visit coverage (%)",
								legends: [
									{
										endValue: 100,
										id: "I5BZ2BJgAWR",
										legendDefinitionId: "#008000",
										startValue: 90,
									},
									{
										endValue: 89,
										id: "MKHqqxZBjcv",
										legendDefinitionId: "#FFFF00",
										startValue: 60,
									},
									{
										endValue: 59,
										id: "RCOGuO5LeYu",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
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
								id: "FgNnsRgCs8r",
								label: "RMNCH ANC 4th visit coverage (%)",
								legends: [
									{
										endValue: 100,
										id: "oZiSVtfDApy",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "PTB4B0EKJ5p",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "dhK8INBS1TU",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
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
								id: "ZNz5XzwJZK5",
								label: "RMNCH IPTp1 coverage (%)",
								legends: [
									{
										endValue: 100,
										id: "i9ezGwn5kLo",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "n6HQIzFrF2P",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "KiKLTyhjRzO",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: 4,
					},
				],
				id: 1,
				style: {
					backgroundColor: "#ffffff",
					color: "#000000",
				},
				title: "Pre-pregnancy and Adolescent",
			},
			{
				dataHolders: [
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "XXDXVGzvSx1",
								label: "RMNCH Caesarean section delivery rate (%)",
								legends: [
									{
										endValue: 100,
										id: "PVFLwvAejDZ",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "OajujtorQp0",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "zFoQrizRrDn",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
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
								id: "lMRhTK17SDQ",
								label: "RMNCH Institutional delivery rate (%)",
								legends: [
									{
										endValue: 100,
										id: "QCTXPMwvXcG",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "uDNKJ7degpD",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "vEkuagPynWT",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: 7,
					},
				],
				id: 2,
				style: {
					backgroundColor: "#ffffff",
					color: "#000000",
				},
				title: "Birth",
			},
			{
				dataHolders: [
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "wc3XYCyuxyE",
								label: "RMNCH Post partum care coverage (within 2 days) (%)",
								legends: [
									{
										endValue: 100,
										id: "Zsq5xeacKKP",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "DTjcKbqlrwW",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "WkkPAl4072e",
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
								id: "NV6Xc9oGJZV",
								label: "RMNCH Breastfeeding within 1 hour after delivery (%)",
								legends: [
									{
										endValue: 100,
										id: "JKP7KkWrHpL",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "Y1AjMBjzqHG",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "TA9loBqAQ9Z",
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
				],
				id: 3,
				style: {
					backgroundColor: "#ffffff",
					color: "#000000",
				},
				title: "PNC",
			},
			{
				dataHolders: [
					{
						dataSources: [
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "S0IzYPGQLnN",
								label: "RMNCH PCV 3 coverage (%)",
								legends: [
									{
										endValue: 100,
										id: "vbm5zkCvcqV",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "VKBCVl5hkxd",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "dKmtdX4VILS",
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
				],
				id: 4,
				style: {
					backgroundColor: "#ffffff",
					color: "#000000",
				},
				title: "Childhood",
			},
			{
				dataHolders: [
					{
						dataSources: [
							{
								description:
									"Proportion of the target population (women of reproductive age) within 5km or 1 hour travel time to the nearest health facility offering FANC",
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "BvG8P80QxqZ",
								label: "Access to ANC Services",
								legends: [
									{
										endValue: 33,
										id: "Sq1tv5ayiMR",
										legendDefinitionId: "#FF0000",
										startValue: 0,
									},
									{
										endValue: 66,
										id: "BHQ7EzH9bsO",
										legendDefinitionId: "#FFFF00",
										startValue: 33,
									},
									{
										endValue: 100,
										id: "WpBcBEAdp6B",
										legendDefinitionId: "#268626",
										startValue: 66,
									},
								],
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: "OMnbH67xuWf",
					},
				],
				id: "X1VTte1BgD0",
				style: {
					backgroundColor: "#FFFFFF",
					color: "#000000",
				},
				title: "ANC",
			},
		],
	},
	description:
		"Animal Region Reproductive Mother Newborn Child Adolescent Health Score Card",
	highlightedIndicators: [
		{
			description:
				"Proportion of the target population (women of reproductive age) within 5km or 1 hour travel time to the nearest health facility offering FANC",
			displayArrows: true,
			effectiveGap: 5,
			highIsGood: true,
			id: "BvG8P80QxqZ",
			label: "Access to ANC Services",
			legends: [
				{
					endValue: 33,
					id: "XG1msX1XDCF",
					legendDefinitionId: "#FF0000",
					startValue: 0,
				},
				{
					endValue: 66,
					id: "PwWQxx0iVrw",
					legendDefinitionId: "#FFFF00",
					startValue: 33,
				},
				{
					endValue: 100,
					id: "Ilaj6l1Wcbk",
					legendDefinitionId: "#268626",
					startValue: 66,
				},
			],
			showColors: true,
			type: "indicator",
			weight: 100,
		},
	],
	id: "b9p4p2eLEgS",
	legendDefinitions: [
		{
			color: "#268626",
			id: "#268626",
			name: "Meta Alcancada",
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
		averageColumn: true,
		averageDisplayType: "ALL",
		averageRow: true,
		emptyRows: true,
		highlightedIndicators: false,
		itemNumber: false,
		legend: true,
		showHierarchy: false,
		title: true,
		showDataInRows: false,
		arrows: true,
	},
	orgUnitSelection: {
		groups: [],
		levels: [],
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: true,
	},
	periodSelection: {
		periods: ["201811", "201809", "201810"],
		type: "Monthly",
	},
	subtitle: "",
	title: "League Table: RMNCAH",
};

const meta: Meta<typeof Scorecard> = {
	title: "Scorecard",
	component: Scorecard,
	decorators: (Story) => {
		return (
			<div style={{ maxWidth: 1400, overflowX: "auto" }}>
				<Story />
			</div>
		);
	},
};

export default meta;

type Story = StoryObj<typeof Scorecard>;

export const Default: Story = {
	name: "Default View",
	args: {
		config,
		state: {
			options: {
				...config.options,
				averageRow: true,
			},
			orgUnitSelection: config.orgUnitSelection,
			periodSelection: config.periodSelection,
		},
	},
};
export const DataInRows: Story = {
	name: "Data in rows view",
	args: {
		config,
		state: {
			options: {
				...config.options,
				showDataInRows: true,
			},
			orgUnitSelection: config.orgUnitSelection,
			periodSelection: config.periodSelection,
		},
	},
};
