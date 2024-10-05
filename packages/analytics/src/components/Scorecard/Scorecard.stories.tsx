import type { Meta, StoryObj } from "@storybook/react";
import { Scorecard } from "./Scorecard";
import type { ScorecardConfig, ScorecardState } from "./schemas/config";
import { ScorecardContext } from "./components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { RHFCheckboxField } from "@hisptz/dhis2-ui";
import i18n from "@dhis2/d2-i18n";

const hmisConfig = {
	id: "BhKVCyUvoWX",
	name: "NACP PEDIATRIC/ADOLESCENT/YOUTH HIV SCORECARD",
	user: {
		id: "ZXkqhHnNxUv",
	},
	title: "NACP PEDIATRIC/ADOLESCENT/YOUTH HIV SCORECARD",
	options: {
		title: true,
		legend: true,
		emptyRows: true,
		averageRow: false,
		itemNumber: true,
		averageColumn: false,
		showHierarchy: false,
		averageDisplayType: "ALL",
		highlightedIndicators: false,
	},
	subtitle: "",
	periodType: "RelativeQuarter",
	description:
		"The scorecard to monitor the performance of HIV indicators for pediatric, adolescent and youth ",
	customHeader:
		'<h3 style="text-align:center"><small>NACP HIV Scorecard for Pediatric, Adolescent and Youth&nbsp;</small></h3>\n',
	publicAccess: {
		id: "public",
		type: "public",
		access: "r-----",
		displayName: "Public",
	},
	userAccesses: [],
	dataSelection: {
		dataGroups: [
			{
				id: 1,
				style: {
					color: "#000000",
					backgroundColor: "#ffffff",
				},
				title: "HEID",
				dataHolders: [
					{
						id: 10,
						dataSources: [
							{
								id: "IthUUAMiFfL",
								name: "% of HEI tested for HIV by using DNA PCR at birth",
								type: "customFunction",
								label: "% of HEI tested for HIV by using DNA PCR at birth",
								weight: 100,
								legends: [
									{
										id: "Sxqhyp0mTNy",
										endValue: "-",
										startValue: "79",
										legendDefinitionId: "#008000",
									},
									{
										id: "aUPSsUgydxI",
										endValue: "79",
										startValue: "59",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "i2bk3Z5N5dc",
										endValue: "59",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 11,
						dataSources: [
							{
								id: "gRPou3d8CE9",
								name: "% of HEI tested for HIV by using DNA PCR by 2 months of age",
								type: "customFunction",
								label: "% of HEI tested for HIV by using DNA PCR by 2 months of age",
								weight: 100,
								legends: [
									{
										id: "wUkD7XzHb0j",
										endValue: "-",
										startValue: "89",
										legendDefinitionId: "#008000",
									},
									{
										id: "yhF2fhp24cq",
										endValue: "89",
										startValue: "69",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "vHyCp61XFcq",
										endValue: "89",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
							{
								id: "N0uX7d0NaVB",
								name: "% of HEI who received a first HIV test",
								type: "customFunction",
								label: "% of HEI who received a first HIV test",
								weight: 100,
								legends: [
									{
										id: "dNElN1hn00o",
										endValue: "-",
										startValue: "89",
										legendDefinitionId: "#008000",
									},
									{
										id: "YMPnRvYDN36",
										endValue: "89",
										startValue: "69",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "K5BWj3BrgZj",
										endValue: "69",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
				],
			},
			{
				id: 3,
				style: {
					color: "#000000",
					backgroundColor: "#ffffff",
				},
				title: "Children (0-14 Years)",
				dataHolders: [
					{
						id: 18,
						dataSources: [
							{
								id: "Jx7KCLruuYV",
								name: "Proportion of Children Knowing HIV Status",
								type: "customFunction",
								label: "Proportion of Children Knowing HIV Status",
								weight: 100,
								legends: [
									{
										id: "W4PYAXl1mUS",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "Axbz0ktD7Hp",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "wPv7QSNUzXR",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 15,
						dataSources: [
							{
								id: "HkfV3tNXRZb",
								name: "% of Children who are on  ART",
								type: "customFunction",
								label: "% of Children who are on  ART",
								weight: 100,
								legends: [
									{
										id: "BT9KhOryZk2",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "doqLR5kCUds",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "XDNw10t5dw5",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 7,
						dataSources: [
							{
								id: "HmbRukEsmjU",
								name: "% children with  HVL tests < 1000 copies/mL",
								type: "customFunction",
								label: "% children with  HVL tests < 1000 copies/mL",
								weight: 100,
								legends: [
									{
										id: "Qj7kJibCyu4",
										endValue: 100,
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "SqOWUnm4lno",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "VLPCRzM69xJ",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 5,
						dataSources: [
							{
								id: "jEGIBmPhEEK",
								name: "% of children initiated ART within 7 days",
								type: "customFunction",
								label: "% of children initiated ART within 7 days",
								weight: 100,
								legends: [
									{
										id: "LfhMUJjUYti",
										endValue: "-",
										startValue: "97",
										legendDefinitionId: "#008000",
									},
									{
										id: "edU1iXxAX9Z",
										endValue: "97",
										startValue: "84",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "bXd2d5Vsdwn",
										endValue: "84",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 2,
						dataSources: [
							{
								id: "FeW7SL5GuOR",
								name: "% of children screened for TB",
								type: "customFunction",
								label: "% of children screened for TB",
								weight: 100,
								legends: [
									{
										id: "ReVDVNbTs5e",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "ZWdPRzqTmew",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "PoeevSi8XRQ",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 27,
						dataSources: [
							{
								id: "cFljxyUNM1J",
								name: "% of children dispensed 3 months ARVs",
								type: "customFunction",
								label: "% of children dispensed 3 months ARVs",
								weight: 100,
								legends: [
									{
										id: "YVF1WWC3y8r",
										endValue: "-",
										startValue: "79",
										legendDefinitionId: "#008000",
									},
									{
										id: "frmDM5JBqGd",
										endValue: "79",
										startValue: "69",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "ODHJdmbS4qn",
										endValue: "69",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
				],
			},
			{
				id: 2,
				style: {
					color: "#000000",
					backgroundColor: "#ffffff",
				},
				title: "Adolescents (10-19 Years)",
				dataHolders: [
					{
						id: 19,
						dataSources: [
							{
								id: "uYxyQJZC75P",
								name: "Proportion of Adolescent knowing HIV Status",
								type: "customFunction",
								label: "Proportion of Adolescent knowing HIV Status",
								weight: 100,
								legends: [
									{
										id: "pNc1EYpMBYb",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "nWz2xKgBamK",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "pE0d0pgG2Sh",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 16,
						dataSources: [
							{
								id: "ZkCW7fqvsvy",
								name: "% of Adolescent who are on  ART",
								type: "customFunction",
								label: "% of Adolescent who are on  ART",
								weight: 100,
								legends: [
									{
										id: "Ux204RVn0Qm",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "Aormlo8t3fv",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "Nz5ZNbnMMIV",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 8,
						dataSources: [
							{
								id: "eyiLj3lv6cW",
								name: "% Adolescent with  HVL tests < 1000 copies/mL",
								type: "customFunction",
								label: "% Adolescent with  HVL tests < 1000 copies/mL",
								weight: 100,
								legends: [
									{
										id: "SARZtkvaBix",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "txh985aZM0k",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "yoveVKWINCJ",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 6,
						dataSources: [
							{
								id: "V45fiUhHi5I",
								name: "% of Adolescent initiated ART within 7 days",
								type: "customFunction",
								label: "% of Adolescent initiated ART within 7 days",
								weight: 100,
								legends: [
									{
										id: "lJ6cJPmFX1o",
										endValue: "-",
										startValue: "97",
										legendDefinitionId: "#008000",
									},
									{
										id: "qP7Nrpv0RYV",
										endValue: "97",
										startValue: "84",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "hDgBzaw9ao2",
										endValue: "84",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 4,
						dataSources: [
							{
								id: "apGNvWVPjdD",
								name: "% Adolescent screened for TB",
								type: "customFunction",
								label: "% Adolescent screened for TB",
								weight: 100,
								legends: [
									{
										id: "Zel8b8MskEJ",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "TTPQnNKTqY4",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "teysd5btMXI",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 26,
						dataSources: [
							{
								id: "SLMGdkRqQJQ",
								name: "% of adolescent dispensed 3 months ARVs",
								type: "customFunction",
								label: "% of adolescent dispensed 3 months ARVs",
								weight: 100,
								legends: [
									{
										id: "Gt8y7k8YB0P",
										endValue: "-",
										startValue: "79",
										legendDefinitionId: "#008000",
									},
									{
										id: "CxRB3bBUM6S",
										endValue: "79",
										startValue: "69",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "enUy3TXKOCY",
										endValue: "69",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
				],
			},
			{
				id: 4,
				style: {
					color: "#000000",
					backgroundColor: "#ffffff",
				},
				title: "Youth (15-24 years)",
				dataHolders: [
					{
						id: 29,
						dataSources: [
							{
								id: "GTn4oYrnpSf",
								name: "Proportion of youth knowing HIV Status",
								type: "customFunction",
								label: "Proportion of youth knowing HIV Status",
								weight: 100,
								legends: [
									{
										id: "KCpQiMQ6Xwy",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "sMyIGfUuKtl",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "Mt7awKnicq5",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 21,
						dataSources: [
							{
								id: "vjcbzF7Xb4e",
								name: "% of Youth who are on  ART",
								type: "customFunction",
								label: "% of Youth who are on  ART",
								weight: 100,
								legends: [
									{
										id: "q47yVLbjJli",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "oh9ZcL4Qof4",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "nodM5MY5V86",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 22,
						dataSources: [
							{
								id: "v1tiAysZvsG",
								name: "% of youth with  VL tests < 1000 copies/mL",
								type: "customFunction",
								label: "% of youth with  VL tests < 1000 copies/mL",
								weight: 100,
								legends: [
									{
										id: "V0M7jjMoQQ4",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "RKzIuDtKgUD",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "IFB9yHATD62",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 23,
						dataSources: [
							{
								id: "fbR5IKAROdW",
								name: "% of youth initiated on ART within 7 days",
								type: "customFunction",
								label: "% of youth initiated on ART within 7 days",
								weight: 100,
								legends: [
									{
										id: "wRz5KfLvT3s",
										endValue: "-",
										startValue: "97",
										legendDefinitionId: "#008000",
									},
									{
										id: "RJ0qeY9jClT",
										endValue: "97",
										startValue: "84",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "OZ1QA11qkm4",
										endValue: "84",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 24,
						dataSources: [
							{
								id: "iWivT3AD9xf",
								name: "% of youth screened for TB",
								type: "customFunction",
								label: "% of youth screened for TB",
								weight: 100,
								legends: [
									{
										id: "wAflNuY7yMg",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "vCLABA0Xqhr",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "BTT2lrVjh4o",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 25,
						dataSources: [
							{
								id: "gJAAd40LS1n",
								name: "% of youth dispensed 3 months ARVs",
								type: "customFunction",
								label: "% of youth dispensed 3 months ARVs",
								weight: 100,
								legends: [
									{
										id: "gTeRmLEdzJL",
										endValue: "-",
										startValue: "79",
										legendDefinitionId: "#008000",
									},
									{
										id: "P4bGlXE4BkO",
										endValue: "79",
										startValue: "69",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "pNOvvh4V641",
										endValue: "69",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
					{
						id: 28,
						dataSources: [
							{
								id: "OMsCcpxndJs",
								name: "% of youth screened positive for STI and linked to HIV counselling and testing services",
								type: "customFunction",
								label: "% of youth screened positive for STI and linked to HIV counselling and testing services",
								weight: 100,
								legends: [
									{
										id: "cPgHZPyV1ss",
										endValue: "-",
										startValue: "94",
										legendDefinitionId: "#008000",
									},
									{
										id: "tDsYUAt8fGj",
										endValue: "94",
										startValue: "79",
										legendDefinitionId: "#FFFF00",
									},
									{
										id: "VqA5f7RNc99",
										endValue: "79",
										startValue: "0",
										legendDefinitionId: "#FF0000",
									},
								],
								highIsGood: true,
								showColors: true,
								effectiveGap: 5,
								displayArrows: true,
							},
						],
					},
				],
			},
		],
	},
	targetOnLevels: false,
	periodSelection: {
		type: "RelativeQuarter",
		periods: [
			{
				id: "LAST_QUARTER",
				name: "Last Quarter",
			},
		],
	},
	additionalLabels: [],
	orgUnitSelection: {
		groups: [],
		levels: [],
		orgUnits: [
			{
				id: "m0frOspS7JY",
			},
		],
		userOrgUnit: false,
		userSubUnit: false,
		userSubX2Unit: false,
	},
	legendDefinitions: [
		{
			id: "#008000",
			name: "Target achieved / on track",
			color: "#008000",
		},
		{
			id: "#FFFF00",
			name: "Progress, but more effort required",
			color: "#FFFF00",
		},
		{
			id: "#FF0000",
			name: "Not on track",
			color: "#FF0000",
		},
		{
			id: "N/A",
			name: "N/A",
			color: "#D3D3D3",
			isDefault: true,
		},
		{
			id: "No data",
			name: "No data",
			color: "#FFFFFF",
			isDefault: true,
		},
	],
	userGroupAccesses: [
		{
			id: "yeLkdx7xMIj",
			type: "userGroup",
			access: "r-----",
			displayName: "NACP Group",
		},
	],
	highlightedIndicators: [],
};

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

const meta: Meta<typeof Scorecard> = {
	title: "Scorecard",
	component: Scorecard,
	decorators: (Story, context) => {
		const form = useForm<ScorecardState>({});
		return (
			<FormProvider {...form}>
				<div
					style={{
						maxWidth: 1400,
						maxHeight: "60vh",
					}}
				>
					<div style={{ display: "flex", gap: 16 }}>
						<RHFCheckboxField
							label={i18n.t("Show data in rows")}
							name="options.showDataInRows"
						/>
					</div>
					<Controller
						render={({ field }) => {
							return (
								<ScorecardContext
									initialState={{
										options: {
											...hmisConfig.options,
											averageRow: true,
											averageColumn: true,
											arrows: true,
											averageDisplayType: "ALL",
											itemNumber: false,
										},
										orgUnitSelection: {
											...hmisConfig.orgUnitSelection,
										},
										periodSelection: {
											...hmisConfig.periodSelection,
										},
									}}
									config={hmisConfig as any}
								>
									<Story
										args={{
											...context.args,
											tableProps: {
												scrollHeight: "800px",
												scrollWidth: "1400px",
												width: "800px",
											},
										}}
									/>
								</ScorecardContext>
							);
						}}
						name={"options"}
					/>
				</div>
			</FormProvider>
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
			periodSelection: {},
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
