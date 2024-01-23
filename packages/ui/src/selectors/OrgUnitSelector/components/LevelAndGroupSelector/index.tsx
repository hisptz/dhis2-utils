import i18n from "@dhis2/d2-i18n";
import { MultiSelectField, MultiSelectOption } from "@dhis2/ui";
import { intersectionWith } from "lodash";
import React from "react";
import { useOrgUnitLevelsAndGroups } from "../../hooks/index.js";
import { onGroupSelect, onLevelSelect } from "../../utils/index.js";
import { OrgUnitSelection } from "../../types/index.js";

export function LevelAndGroupSelector({
	showLevels,
	showGroups,
	value,
	onUpdate,
	disableSelections,
}: {
	showLevels?: boolean;
	showGroups?: boolean;
	value: OrgUnitSelection | undefined;
	onUpdate: ((value: OrgUnitSelection) => void) | undefined;
	disableSelections?: boolean;
}) {
	const {
		groups,
		levels,
		error: levelsAndGroupsError,
		loading: levelsAndGroupsLoading,
	} = useOrgUnitLevelsAndGroups();

	const sanitizedSelectedLevels = intersectionWith(
		value?.levels,
		levels,
		(levelId, level) => levelId === level.id,
	);
	const sanitizedSelectedGroups = intersectionWith(
		value?.groups,
		groups,
		(groupId, group) => groupId === group.id,
	);

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: 16,
				paddingTop: 16,
			}}
		>
			{showLevels && (
				<div data-test="levels-selector" className="column w-100">
					<MultiSelectField
						disabled={disableSelections || levelsAndGroupsLoading}
						clearable
						loading={levelsAndGroupsLoading}
						error={levelsAndGroupsError}
						validationText={levelsAndGroupsError?.message}
						onChange={onLevelSelect({ onUpdate, value })}
						selected={
							levelsAndGroupsLoading
								? []
								: sanitizedSelectedLevels ?? []
						}
						clearText={i18n.t("Clear")}
						label={i18n.t("Select Level(s)")}
					>
						{levels?.map(({ displayName, id }: any) => (
							<MultiSelectOption
								dataTest={`${displayName}-option`}
								label={displayName}
								value={id}
								key={id}
							/>
						))}
					</MultiSelectField>
				</div>
			)}
			{showGroups && (
				<div data-test="groups-selector">
					<MultiSelectField
						disabled={disableSelections || levelsAndGroupsLoading}
						clearable
						loading={levelsAndGroupsLoading}
						error={levelsAndGroupsError}
						validationText={levelsAndGroupsError?.message}
						onChange={onGroupSelect({ onUpdate, value })}
						selected={
							levelsAndGroupsLoading
								? []
								: sanitizedSelectedGroups ?? []
						}
						dataTest={"select-facility-group"}
						clearText={i18n.t("Clear")}
						label={i18n.t("Select Group(s)")}
					>
						{groups?.map(({ displayName, id }) => (
							<MultiSelectOption
								dataTest={`${displayName}-option`}
								label={displayName}
								value={id}
								key={id}
							/>
						))}
					</MultiSelectField>
				</div>
			)}
		</div>
	);
}
