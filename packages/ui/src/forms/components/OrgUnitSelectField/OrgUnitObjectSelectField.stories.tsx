import { type ArgTypes, Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { OrgUnitSelection } from "../../../selectors/OrgUnitSelector";
import { OrgUnitObjectSelectField } from "./OrgUnitObjectSelectField";

const meta: Meta<typeof OrgUnitObjectSelectField> = {
	component: OrgUnitObjectSelectField,
	title: "Form/Fields/Organisation Unit Object Field",
};

export default meta;

type Story = StoryObj<typeof OrgUnitObjectSelectField>;

function render(props: Story["args"]) {
	const [orgUnitSelection, setOrgUnitSelection] = useState<OrgUnitSelection>({
		groups: [],
		levels: [],
		orgUnits: [],
		userOrgUnit: false,
		userSubUnit: false,
		userSubX2Unit: false,
	});

	return (
		<OrgUnitObjectSelectField
			name="orgUnit"
			onChange={setOrgUnitSelection}
			value={orgUnitSelection}
			{...props}
		/>
	);
}

const argTypes: ArgTypes<typeof OrgUnitObjectSelectField> = {
	searchable: {
		type: "boolean",
	},
	singleSelection: {
		type: "boolean",
	},
};

/**
 * The Organisation unit object input shows the `OrgUnitTree` component with a pre-defined root.
 * The root is obtained by getting the organisation units assigned to the current user.
 * */
export const Default: Story = {
	name: "Default",
	args: {},
	argTypes,
	render,
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
	argTypes,
	render,
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
	argTypes,
	render,
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
	argTypes,
	render,
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
	argTypes,
	render,
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
	argTypes,
	render,
};
