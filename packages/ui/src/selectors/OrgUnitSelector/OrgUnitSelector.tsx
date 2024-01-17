import { CssReset } from "@dhis2/ui";
import React from "react";
import Selector from "./components/Selector";
import { FilterStateProvider } from "./states/filter";
import { OrgUnitSelectorProps } from "./types";

/**
 * `OrgUnitSelector` is a React component used to render an organisation unit component from `@dhis2/ui`
 * with more built-in features.
 *
 * Features include:
 *
 * - Organisation unit level and group selectors
 * - User organisation unit selections
 * - Limit selections of organisation unit to specific organisation unit levels
 * - Filter displayed organisation unit by organisation unit group
 * - Built in search that allows nested searching
 *
 *  All features can be configured by passing props to the component
 *
 * @param {OrgUnitSelectorProps} props - The properties object for configuring the organizational unit selector.
 *
 * Properties:
 * 	 @param {OrgUnitSelection} [props.value] Default value of the selector
 * 	 @param {function(value: OrgUnitSelection): void} [props.onUpdate] Callback when the selector value changes
 * 	 @param {Array<OrganisationUnit>} [props.roots] Organisation units that should be the roots of the selector. Overrides the user assigned roots.
 * 	 @param {Array<number>} [props.limitSelectionToLevels] Allows you to specify which organisation unit level should be selectable. The other organisation units will still be shown in a faint color and won't be selectable
 * 	 @param {Array<string>} [props.filterByGroups] Allows you to only show organisation units within the specified organisation unit groups. This will still show the organisation unit hierarchy.
 * 	 @param {boolean} [props.showLevels] Show the level selector
 * 	 @param {boolean} [props.showGroups] Show the groups selector
 * 	 @param {boolean} [props.searchable] Show the search input
 * 	 @param {boolean} [props.singleSelection] Only allow one value to be selected at a time
 */
export function OrgUnitSelector(props: OrgUnitSelectorProps) {
	return (
		<div style={{ margin: 4 }}>
			<CssReset />
			<FilterStateProvider
				filterByGroups={props.filterByGroups}
				selectedOrgUnits={props.value?.orgUnits}
			>
				<Selector {...props} />
			</FilterStateProvider>
		</div>
	);
}
