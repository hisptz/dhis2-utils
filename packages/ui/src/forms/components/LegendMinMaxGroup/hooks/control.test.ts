import { describe, expect, test } from "vitest";
import { normalizeValues } from "./control";

const legendDefinitions = [
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
];
const legends = [
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
];

const cases = [
	{
		label: "Changed the least value",
		highIsGood: true,
		legendDefinitions,
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
				startValue: 0,
			},
		],
		input: {
			endValue: 34,
			id: "vJ6n0zUtRrk",
			legendDefinitionId: "#FF0000",
			startValue: 0,
		},
		expected: [
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
				startValue: 0,
			},
		],
	},
	{
		label: "Changed the least max value",
		highIsGood: true,
		legendDefinitions,
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
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
		input: {
			endValue: 40,
			id: "vJ6n0zUtRrk",
			legendDefinitionId: "#FF0000",
			startValue: 0,
		},
		expected: [
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
				startValue: 40,
			},
			{
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
	},
	{
		label: "Changed the middle min value",
		highIsGood: true,
		legendDefinitions,
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
				startValue: 40,
			},
			{
				endValue: 34,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
		input: {
			endValue: 67,
			id: "v6LtGSWMZTO",
			legendDefinitionId: "#FFFF00",
			startValue: 40,
		},
		expected: [
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
				startValue: 40,
			},
			{
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
	},
	{
		label: "Changed the middle max value",
		highIsGood: true,
		legendDefinitions,
		legends: [
			{
				endValue: 100,
				id: "KjB8Vu688Zt",
				legendDefinitionId: "#008000",
				startValue: 67,
			},
			{
				endValue: 70,
				id: "v6LtGSWMZTO",
				legendDefinitionId: "#FFFF00",
				startValue: 40,
			},
			{
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
		input: {
			endValue: 70,
			id: "v6LtGSWMZTO",
			legendDefinitionId: "#FFFF00",
			startValue: 40,
		},
		expected: [
			{
				endValue: 100,
				id: "KjB8Vu688Zt",
				legendDefinitionId: "#008000",
				startValue: 70,
			},
			{
				endValue: 70,
				id: "v6LtGSWMZTO",
				legendDefinitionId: "#FFFF00",
				startValue: 40,
			},
			{
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
	},
	{
		label: "Changed the high min value",
		highIsGood: true,
		legendDefinitions,
		legends: [
			{
				endValue: 100,
				id: "KjB8Vu688Zt",
				legendDefinitionId: "#008000",
				startValue: 70,
			},
			{
				endValue: 70,
				id: "v6LtGSWMZTO",
				legendDefinitionId: "#FFFF00",
				startValue: 40,
			},
			{
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
		input: {
			endValue: 100,
			id: "KjB8Vu688Zt",
			legendDefinitionId: "#008000",
			startValue: 70,
		},
		expected: [
			{
				endValue: 100,
				id: "KjB8Vu688Zt",
				legendDefinitionId: "#008000",
				startValue: 70,
			},
			{
				endValue: 70,
				id: "v6LtGSWMZTO",
				legendDefinitionId: "#FFFF00",
				startValue: 40,
			},
			{
				endValue: 40,
				id: "vJ6n0zUtRrk",
				legendDefinitionId: "#FF0000",
				startValue: 0,
			},
		],
	},
];

describe("normalizeValues", () => {
	cases.forEach(
		({ input, expected, label, legends, legendDefinitions }, i) => {
			test(label, () => {
				expect(normalizeValues(legends, input)).toStrictEqual(expected);
			});
		},
	);
});
