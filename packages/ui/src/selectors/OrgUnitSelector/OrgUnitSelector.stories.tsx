import { OrgUnitSelector } from "./OrgUnitSelector";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof OrgUnitSelector> = {
	component: OrgUnitSelector,
	title: "Selectors/Org Unit Selector",
};

export default meta;

type Story = StoryObj<typeof OrgUnitSelector>;

/**
 * The Organisation unit selector shows the `OrgUnitTree` component with a pre-defined root.
 * The root is obtained by getting the organisation units assigned to the current user.
 *
 * */
export const Default: Story = {
	name: "Default",
	args: {},
};

/**
 * When `showGroups` and `showLevels` are set to `true`,
 * the selector will show the level and group selector at the bottom of the `OrgUnitTree`.
 * If a user selects level(s) or group(s), they will be returned as `levels`
 * and `groups` in the `OrgUnitSelection` object, the param to the `onSelect` function.
 * */
export const WithLevelsAndGroups: Story = {
	name: "With level and group selectors",
	args: {
		showGroups: true,
		showLevels: true,
	},
};

/**
 * You can display the user selection options by setting `showUserOptions` to `true`.
 * The input values will be returned as `userOrgUnit`,`userSubUnit`, and `userSubX2Unit`
 * values in the `OrgUnitSelection` object, the param to the `onSelect` function.
 * */
export const WithUserOptions: Story = {
	name: "With user options",
	args: {
		showUserOptions: true,
	},
};

/**
 * Setting `searchable` to `true` will display a search input on top of the `OrgUnitTree`.
 * The search input allows you to search any organisation unit at any level within the tree.
 * If the searched organisation unit is a nested child, the parent will be expanded to show the searched organisation unit.
 * */
export const WithSearch: Story = {
	name: "With search",
	args: {
		searchable: true,
	},
};

/**
 * This component also allows you to limit the selection of organisation units to a certain level.
 * `limitSelectionToLevels` property accepts an array of level numbers which will determine what organisation unit levels will be selectable.
 * All organisation units that do not fall in the selected levels will not respond to clicks and will have a sightly less color than those which are selectable
 *
 * */
export const LimitSelectionToLevels: Story = {
	name: "Limiting selection to levels",
	args: {
		limitSelectionToLevels: [4],
	},
};

/**
 * The components also allow filtering by organisation unit groups.
 * You can specify organisation units from certain groups
 * only to be shown by listing the ids of the groups in the `filterByGroups`
 * prop.
 * All parents with matching children will be shown to preserve the tree from the specified root.
 * */
export const FilterByOrgUnitGroup: Story = {
	name: "Filter by organisation group",
	args: {
		filterByGroups: ["RXL3lPSK8oG"],
		limitSelectionToLevels: [4],
	},
};
