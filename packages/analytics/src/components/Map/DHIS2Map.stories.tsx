import { Meta, StoryObj } from "@storybook/react";
import { DHIS2Map } from "./DHIS2Map";

import { COLOR_SCALES } from "./constants/colors.js";

const meta: Meta<typeof DHIS2Map> = {
	title: "DHIS2 Map",
	component: DHIS2Map,
};
export default meta;

type Story = StoryObj<typeof DHIS2Map>;
export const BaseMap: Story = {
	name: "Base map",
};
BaseMap.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: true,
	},
};

export const Controls: Story = {
	name: "Controls",
};
Controls.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: true,
	},
	controls: [
		{
			type: "print",
			position: "topleft",
			options: {
				hidden: false,
				hideControlContainer: true,
				sizeModes: ["A4Landscape", "A4Portrait", "Current"],
			},
		},
	],
};

export const BoundaryLayer: Story = {
	name: "Boundary layer",
};
BoundaryLayer.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: true,
	},
	boundaryLayer: {
		enabled: true,
		onLayerClick: (e, data) => {
			console.log(e, data);
		},
	},
};

export const BoundaryLayerWithLevels: Story = {
	name: "Boundary layer with levels",
};
BoundaryLayerWithLevels.args = {
	orgUnitSelection: {
		orgUnits: [
			{
				id: "ImspTQPwCqd",
				displayName: "Sierra Leone",
				name: "Sierra Leone",
				path: "/ImspTQPwCqd",
				children: [],
			},
		],
		levels: ["2"],
	},
	boundaryLayer: {
		enabled: true,
	},
};

export const ChoroplethThematicLayer: Story = {};
ChoroplethThematicLayer.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: false,
	},
	boundaryLayer: {
		enabled: true,
	},
	thematicLayers: [
		{
			type: "choropleth",
			id: "choropleth",
			enabled: true,
			dataItem: {
				id: "Uvn6LCg7dVU",
				displayName: "ANC 1 Coverage",
				type: "indicator",
				legendConfig: {
					colorClass: COLOR_SCALES[0],
					scale: 5,
				},
			},
			labelConfig: {
				labels: true,
				labelTemplate: "{name}\n{value}",
				labelFontWeight: "bold",
			},
			control: {
				enabled: true,
				position: "topright",
			},
		},
	],
	showPeriodTitle: true,
	periodSelection: {
		periods: ["LAST_QUARTER"],
	},
	legends: {
		enabled: true,
		position: "topright",
		collapsible: true,
	},
};

export const BubbleThematicLayer: Story = {};
BubbleThematicLayer.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: false,
	},
	boundaryLayer: {
		enabled: true,
	},
	thematicLayers: [
		{
			type: "bubble",
			id: "bubble",
			enabled: true,

			dataItem: {
				id: "Uvn6LCg7dVU",
				displayName: "ANC 1 Coverage",
				type: "indicator",
				legendConfig: {
					colorClass: COLOR_SCALES[0],
					scale: 5,
				},
			},
			control: {
				enabled: true,
				position: "topright",
			},
			radius: {
				min: 0,
				max: 40,
			},
		},
	],
	legends: {
		enabled: true,
		position: "topright",
		collapsible: true,
	},
	periodSelection: {
		periods: ["2023"],
	},
	controls: [
		{
			type: "fullscreen",
			position: "topleft",
		},
	],
};

export const AllThematicLayers: Story = {};
AllThematicLayers.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: true,
	},
	boundaryLayer: {
		enabled: true,
	},
	thematicLayers: [
		{
			type: "choropleth",
			id: "ReUHfIn0pTQ",
			enabled: true,
			onLayerClick: (e, data) => {
				console.log(e, data);
			},
			dataItem: {
				id: "ReUHfIn0pTQ",
				displayName: "ANC 1-3 Dropout Rate",
				type: "indicator",
				legendSet: "fqs276KXCXi",
			},
			control: {
				enabled: true,
				position: "topright",
			},
		},
		{
			type: "bubble",
			id: "Uvn6LCg7dVU",
			enabled: true,
			dataItem: {
				id: "Uvn6LCg7dVU",
				displayName: "ANC 1 Coverage",
				type: "indicator",
				legendConfig: {
					colorClass: COLOR_SCALES[0],
					scale: 5,
				},
			},
			control: {
				enabled: true,
				position: "topright",
			},
		},
	],
	legends: {
		enabled: true,
		position: "topright",
		collapsible: true,
	},
	periodSelection: {
		periods: ["2023"],
	},
	controls: [
		{
			type: "scale",
			position: "bottomleft",
			options: {
				imperial: false,
				metric: true,
			},
		},
		{
			type: "fullscreen",
			position: "bottomleft",
		},
	],
};

export const ChoroplethThematicLayerWithLevels: Story = {};
ChoroplethThematicLayerWithLevels.args = {
	orgUnitSelection: {
		orgUnits: [
			{
				id: "ImspTQPwCqd",
				displayName: "Sierra Leone",
				name: "Sierra Leone",
				path: "/ImspTQPwCqd",
				children: [],
			},
		],
		levels: ["3"],
	},
	boundaryLayer: {
		enabled: true,
	},
	thematicLayers: [
		{
			type: "choropleth",
			id: "choropleth",
			enabled: true,
			dataItem: {
				id: "Uvn6LCg7dVU",
				displayName: "ANC 1 Coverage",
				type: "indicator",
				legendSet: "fqs276KXCXi",
			},
			control: {
				enabled: true,
				position: "topright",
			},
		},
	],
	legends: {
		enabled: true,
		position: "topright",
		collapsible: true,
	},
	periodSelection: {
		periods: ["2025"],
	},
	controls: [
		{
			type: "print",
			position: "topleft",
			options: {
				hidden: false,
				hideControlContainer: true,
				sizeModes: ["A4Landscape", "A4Portrait", "Current"],
			},
		},
	],
};

export const PointLayer: Story = {};
PointLayer.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: false,
	},
	thematicLayers: [
		{
			type: "choropleth",
			id: "choropleth",
			enabled: true,
			dataItem: {
				id: "Uvn6LCg7dVU",
				displayName: "ANC 1 Coverage",
				type: "indicator",
			},
			control: {
				enabled: true,
				position: "topright",
			},
		},
	],
	periodSelection: {
		periods: ["2023"],
	},
	pointLayer: {
		enabled: true,
		label: "Facilities",
		level: "m9lBJogzE95",
		style: {
			icon: "hospital_negative",
		},
		onLayerClick: (e, data) => {
			console.log(e, data);
		},
	},
};

export const GoogleEarthEngineLayers: Story = {};
GoogleEarthEngineLayers.args = {
	orgUnitSelection: {
		orgUnits: [],
		userOrgUnit: true,
		userSubUnit: true,
		userSubX2Unit: false,
	},
	thematicLayers: [],
	periodSelection: {
		periods: [],
	},
	earthEngineLayers: [
		{
			name: "Population",
			type: "population",
			id: "population",
			enabled: false,
			params: {
				min: 0,
				max: 10,
				palette:
					"#f7fbff,#deebf7,#c6dbef,#9ecae1,#6baed6,#4292c6,#2171b5,#08519c,#08306b",
			},
			aggregations: ["sum", "mean"],
			filters: {
				period: "2020",
			},
		},
		{
			name: "Footprints",
			type: "footprints",
			id: "footprints",
			aggregations: ["count"],
			enabled: false,
		},
		{
			name: "Land Cover",
			type: "landCover",
			id: "landCover",
			enabled: true,
			aggregations: ["percentage"],
		},
	],
	pointLayer: {
		enabled: false,
		label: "Facilities",
		level: "m9lBJogzE95",
		style: {
			groupSet: "J5jldMd8OHv",
		},
	},
};
