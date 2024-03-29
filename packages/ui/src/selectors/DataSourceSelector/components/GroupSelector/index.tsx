import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { find, isEmpty } from "lodash";
import React, { useMemo } from "react";
import { GroupSelectorProps } from "../../types/index.js";
import useDataGroups from "./hooks/useDataGroups.js";

export default function GroupSelector({
	selectedDataType,
	onSelect,
	selectedGroup,
}: GroupSelectorProps) {
	const { loading, groups, error } = useDataGroups(selectedDataType);
	const disabled = useMemo(
		() =>
			isEmpty(selectedDataType) ||
			(isEmpty(selectedDataType.groupResource) &&
				selectedDataType.type !== "customFunction"),
		[selectedDataType.groupResource, groups, loading],
	);

	if (isEmpty(groups)) {
		return null;
	}

	return (
		<div className="pb-8 w-100">
			<SingleSelectField
				clearable
				selected={selectedGroup?.id}
				onChange={({ selected: newValue }: { selected: string }) => {
					const selectedGroup = find(groups, ["id", newValue]);
					onSelect(selectedGroup);
				}}
				error={error}
				validationText={error?.message}
				loading={loading}
				disabled={disabled}
				label={
					selectedDataType.groupResource === "programs"
						? "Select Program"
						: "Select Group"
				}
			>
				{groups?.map(
					({
						displayName,
						id,
					}: {
						displayName: string;
						id: string;
					}) => {
						return (
							<SingleSelectOption
								key={id}
								value={id}
								label={displayName}
							/>
						);
					},
				)}
			</SingleSelectField>
		</div>
	);
}
