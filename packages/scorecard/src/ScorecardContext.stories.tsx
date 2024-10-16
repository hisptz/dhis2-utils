import type { Meta, StoryObj } from "@storybook/react";
import type { ScorecardConfig } from "./schemas/config";
import { ScorecardContext } from "./components";
import { Scorecard } from "./Scorecard";

const config: ScorecardConfig = {
	additionalLabels: ["Data label"],
	customHeader: "<p>W</p>\n",
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
								id: "EzE8xZ31zfC",
								label: "Availability of Vaccines: BCG (no stockout)",
								legends: [
									{
										endValue: 100,
										id: "XWUMmCmeM6o",
										legendDefinitionId: "#008000",
										startValue: 80,
									},
									{
										endValue: 80,
										id: "TOey7YmIgVW",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "PeTnkJSrh0N",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "Availability of Vaccines: BCG (no stockout)",
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
								id: "uNau1zjH08I",
								label: "Availability of Vaccines DPT  (no stockout)",
								legends: [
									{
										endValue: 100,
										id: "BwTObmlCQJ9",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "VBf0tTk0FAg",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "Bi2wvoRTFtg",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "Availability of Vaccines DPT  (no stockout)",
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
								id: "Dca85UJ7O40",
								label: "DPT1 coverage",
								legends: [
									{
										endValue: 100,
										id: "uClcTQnvGjo",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "VM7MrPcAzVY",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "IgXxzTrOdfA",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "DPT1 coverage",
								showColors: true,
								type: "indicator",
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
								id: "YT5UD0H7875",
								label: "DPT2  Coverage",
								legends: [
									{
										endValue: 100,
										id: "AvNvnIHhPL9",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "L6SjYX2Ob7X",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "FDlibzlPjKa",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "DPT2  Coverage",
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
								id: "E31SemmmFGb",
								label: "DPT3 coverage",
								legends: [
									{
										endValue: 100,
										id: "vIzqi9I5U5W",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "p8iuaIFYrVh",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "IAawVVFlrHW",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "DPT3 coverage",
								showColors: true,
								type: "indicator",
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
								id: "k7S2WEEZeWO",
								label: "BCG coverage",
								legends: [
									{
										endValue: 100,
										id: "HTxdj0lqOni",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "QDRGsOkTFRo",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "ijCUM3ePjXe",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "BCG coverage",
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
								id: "wpgvPjYTBba",
								label: "MCV1 Coverage",
								legends: [
									{
										endValue: 100,
										id: "cORYIx7oEkM",
										legendDefinitionId: "#008000",
										startValue: 80,
									},
									{
										endValue: 80,
										id: "yCulcK3litW",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "uHU6IMpweu1",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "MCV1 Coverage",
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
								id: "TGFBdsVUobf",
								label: "Fully Immunized",
								legends: [
									{
										endValue: 100,
										id: "aGVS5sqcRd4",
										legendDefinitionId: "#008000",
										startValue: 67,
									},
									{
										endValue: 67,
										id: "EKIY64Ferh3",
										legendDefinitionId: "#FFFF00",
										startValue: 34,
									},
									{
										endValue: 34,
										id: "EfSaPcUQvUA",
										legendDefinitionId: "#FF0000",
										startValue: 1,
									},
								],
								name: "Fully Immunized",
								showColors: true,
								type: "indicator",
								weight: 100,
							},
						],
						id: 7,
					},
				],
				id: 1,
				style: {
					backgroundColor: "#ffffff",
					color: "#000000",
				},
				title: "Default",
			},
		],
	},
	description: "Immunization scorecard",
	highlightedIndicators: [],
	id: "VQ4ipFr7YHx",
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
		showHierarchy: false,
		title: true,
	},
	orgUnitSelection: {
		groups: [],
		levels: ["P0QFTFfTl2X"],
		orgUnits: [
			{
				id: "GD7TowwI46c",
			},
		],
		userOrgUnit: false,
		userSubUnit: false,
		userSubX2Unit: false,
	},
	periodSelection: {
		periods: [
			{
				id: "2018Q2",
			},
		],
		type: "Quarterly",
	},
	sharing: {
		external: false,
		owner: "M5zQapPyTZI",
		public: "------",
		userGroups: {
			ji3bRmgKwkS: {
				access: "------",
				id: "ji3bRmgKwkS",
			},
		},
		users: {},
	},
	subtitle: "",
	title: "Immunization scorecard",
};

const linkedConfig: ScorecardConfig = {
	additionalLabels: [],
	customHeader:
		'<p style="text-align: center;"><strong><span style="font-size: 14pt;">Reproductive Mother Newborn Child Adolescent Health Scorecard</span></strong></p>',
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
								label: "ANC 1st visit coverage (%)",
								legends: {
									BNQIkbGlA00: [
										{
											endValue: "100",
											id: "KpYHhHJn6TW",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "D7p3mOofXV5",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "h53u0qtfWrm",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									P0QFTFfTl2X: [
										{
											endValue: "100",
											id: "Gu1MEoKBM9z",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "Ov1gJoUyWGA",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "kdr4mFvCXeF",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									VJJOhuBJSJe: [
										{
											endValue: "100",
											id: "ZRel5tdDTxP",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "ZdkqaQjk4dy",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "yHqYRGJTuZ7",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									ZqI1kKnH7ve: [
										{
											endValue: "100",
											id: "M8SRVFU7qaJ",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "t0kMCebyKa3",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "qQWheNiAv5H",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
								},
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "FgNnsRgCs8r",
								label: "ANC 4th visit coverage (%)",
								legends: {
									BNQIkbGlA00: [
										{
											endValue: "100",
											id: "XMzI6YTRjnh",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "XaSA3Wbd8ev",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "zTVnWeobd1W",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									P0QFTFfTl2X: [
										{
											endValue: "100",
											id: "uMqW1iTVZbk",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "KF017pCID2N",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "L3PNXKkZlKn",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									VJJOhuBJSJe: [
										{
											endValue: "100",
											id: "lpPPAVPWAHa",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "qtzhYa0YOZe",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "rcPPIBAegMP",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									ZqI1kKnH7ve: [
										{
											endValue: "100",
											id: "w31XD1NVKYc",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "Yka97h8Gp5S",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "rq5CQddHPzj",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
								},
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: "kJx1Eg83H1A",
					},
				],
				id: "uRgQI4ArrDc",
				style: {
					backgroundColor: "#FFFFFF",
					color: "#000000",
				},
				title: "ANC",
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
								label: "PCV 3 coverage (%)",
								legends: [
									{
										endValue: "100",
										id: "bnLSP7FW4CD",
										legendDefinitionId: "Hp7RQEOkeeI",
										startValue: "66",
									},
									{
										endValue: "66",
										id: "eIQjXQYMwYF",
										legendDefinitionId: "Tdn0N0KCkfS",
										startValue: "33",
									},
									{
										endValue: "33",
										id: "eeXyZVN0FCX",
										legendDefinitionId: "wvkMv3ABWbT",
										startValue: "0",
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "ZNz5XzwJZK5",
								label: "RMNCH IPTp1 coverage (%)",
								legends: [
									{
										endValue: "100",
										id: "M3O2zlFt2QR",
										legendDefinitionId: "Hp7RQEOkeeI",
										startValue: "66",
									},
									{
										endValue: "66",
										id: "XrYIKCaK5uO",
										legendDefinitionId: "Tdn0N0KCkfS",
										startValue: "33",
									},
									{
										endValue: "33",
										id: "yAfwEbfXWab",
										legendDefinitionId: "wvkMv3ABWbT",
										startValue: "0",
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: "kfl50Ej7lDu",
					},
				],
				id: "QcZw8mJ1Rze",
				style: {
					backgroundColor: "#FFFFFF",
					color: "#000000",
				},
				title: "Child Health",
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
								label: "Post partum care coverage (within 2 days) (%)",
								legends: [
									{
										endValue: "100",
										id: "b3UiR0upygY",
										legendDefinitionId: "Hp7RQEOkeeI",
										startValue: "66",
									},
									{
										endValue: "66",
										id: "Qws2zJ6nnhO",
										legendDefinitionId: "Tdn0N0KCkfS",
										startValue: "33",
									},
									{
										endValue: "33",
										id: "EjYfDZUMrvh",
										legendDefinitionId: "wvkMv3ABWbT",
										startValue: "0",
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "NV6Xc9oGJZV",
								label: "Breastfeeding within 1 hour after delivery (%)",
								legends: [
									{
										endValue: "100",
										id: "wqt6J8rW5Gg",
										legendDefinitionId: "Hp7RQEOkeeI",
										startValue: "66",
									},
									{
										endValue: "66",
										id: "BoXJK9Y7xfL",
										legendDefinitionId: "Tdn0N0KCkfS",
										startValue: "33",
									},
									{
										endValue: "33",
										id: "leioF1u23By",
										legendDefinitionId: "wvkMv3ABWbT",
										startValue: "0",
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: "w8XIm3FYgHf",
					},
				],
				id: "UVvskRg3Q3O",
				style: {
					backgroundColor: "#FFFFFF",
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
								id: "XXDXVGzvSx1",
								label: "Caesarean section delivery rate (%)",
								legends: [
									{
										endValue: "100",
										id: "nYuMTV2paEd",
										legendDefinitionId: "Hp7RQEOkeeI",
										startValue: "66",
									},
									{
										endValue: "66",
										id: "iRmHVCt9uCF",
										legendDefinitionId: "Tdn0N0KCkfS",
										startValue: "33",
									},
									{
										endValue: "33",
										id: "oZC6QPZ7AAS",
										legendDefinitionId: "wvkMv3ABWbT",
										startValue: "0",
									},
								],
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
							{
								displayArrows: true,
								effectiveGap: 5,
								highIsGood: true,
								id: "lMRhTK17SDQ",
								label: "Institutional delivery rate (%)",
								legends: {
									BNQIkbGlA00: [
										{
											endValue: "100",
											id: "mOYx4YWdhVl",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "gxG34EbioX8",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "MBAKh3ZG2dK",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									P0QFTFfTl2X: [
										{
											endValue: "100",
											id: "MmQldQ7jgAH",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "WF1kso6rvDr",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "JcaFJoC6kNi",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									VJJOhuBJSJe: [
										{
											endValue: "100",
											id: "L07Gb3JDHVS",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "jZ9fu7sOQDr",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "EoTSwqHRfZV",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
									ZqI1kKnH7ve: [
										{
											endValue: "100",
											id: "CO0eiIoCRty",
											legendDefinitionId: "Hp7RQEOkeeI",
											startValue: "66",
										},
										{
											endValue: "66",
											id: "YWySiVblPtQ",
											legendDefinitionId: "Tdn0N0KCkfS",
											startValue: "33",
										},
										{
											endValue: "33",
											id: "paJxvmioynV",
											legendDefinitionId: "wvkMv3ABWbT",
											startValue: "0",
										},
									],
								},
								showColors: true,
								type: "dataElement",
								weight: 100,
							},
						],
						id: "yZsI8HZOKab",
					},
				],
				id: "erF3HyaFtYs",
				style: {
					backgroundColor: "#FFFFFF",
					color: "#000000",
				},
				title: "Birth",
			},
		],
	},
	description:
		"Reproductive Mother Newborn Child Adolescent Health Score Card",
	highlightedIndicators: [
		{
			displayArrows: true,
			effectiveGap: 5,
			highIsGood: true,
			id: "BvG8P80QxqZ",
			label: "Access to ANC Services",
			legends: [
				{
					endValue: "100",
					id: "gpxLYDFnZmu",
					legendDefinitionId: "Hp7RQEOkeeI",
					startValue: "80",
				},
				{
					endValue: "80",
					id: "nG6xsue9WBm",
					legendDefinitionId: "Tdn0N0KCkfS",
					startValue: "60",
				},
				{
					endValue: "60",
					id: "UeAJV56yLPg",
					legendDefinitionId: "wvkMv3ABWbT",
					startValue: "40",
				},
				{
					endValue: "40",
					id: "Gop7mo2IUdC",
					legendDefinitionId: "N/A",
					startValue: "20",
				},
				{
					endValue: "20",
					id: "RE0ln0cImOf",
					legendDefinitionId: "No Data",
					startValue: "0",
				},
			],
			showColors: true,
			type: "indicator",
			weight: 100,
		},
	],
	id: "KKQrggIIOlT",
	legendDefinitions: [
		{
			color: "#008000",
			id: "Hp7RQEOkeeI",
			name: "Target Reached/ On Track",
		},
		{
			color: "#FFFF00",
			id: "Tdn0N0KCkfS",
			name: "Progress, but more effort required",
		},
		{
			color: "#FF0000",
			id: "wvkMv3ABWbT",
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
			id: "No Data",
			isDefault: true,
			name: "No Data",
		},
	],
	options: {
		arrows: true,
		averageColumn: false,
		averageDisplayType: "ALL",
		averageRow: false,
		emptyRows: false,
		highlightedIndicators: false,
		itemNumber: true,
		legend: true,
		showDataInRows: false,
		showHierarchy: true,
		title: true,
	},
	orgUnitSelection: {
		groups: [],
		levels: ["P0QFTFfTl2X"],
		orgUnits: [
			{
				id: "GD7TowwI46c",
			},
		],
		userOrgUnit: false,
		userSubUnit: false,
		userSubX2Unit: false,
	},
	periodSelection: {
		periods: [
			{
				id: "2018",
			},
		],
	},
	subtitle: "",
	title: "RMNCAH Score Card Revised",
};

const meta: Meta<typeof ScorecardContext> = {
	title: "Scorecard Context",
	component: ScorecardContext,
	decorators: (Story, context) => {
		return (
			<Story
				args={{
					initialState: context.args.initialState,
					config: context.args.config,
				}}
			>
				<Scorecard />
			</Story>
		);
	},
};

export default meta;

type Story = StoryObj<typeof ScorecardContext>;

export const Default: Story = {
	name: "Default View",
	args: {
		config,
		initialState: {
			...config,
		},
	},
};
// export const DataInRows: Story = {
// 	name: "Data in rows view",
// 	args: {},
// };
// export const FilteredAboveAverage: Story = {
// 	name: "Filtered above average",
// 	args: {},
// };
// export const FilteredBelowAverage: Story = {
// 	name: "Filtered below average",
// 	args: {},
// };
// export const WithLinkedCells: Story = {
// 	name: "With linked cells",
// 	args: {},
// };
// export const WithLinkedCellsDataInRows: Story = {
// 	name: "With linked cells and data in rows",
// 	args: {},
// };
