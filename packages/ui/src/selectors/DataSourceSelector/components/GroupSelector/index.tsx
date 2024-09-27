import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { find, isEmpty } from "lodash";
import React, { useMemo } from "react";
import { GroupSelectorProps } from "../../types";
import useDataGroups from "./hooks/useDataGroups.js";
import { useSelectedDataSource } from "../ConfigProvider";

export default function GroupSelector({
	onSelect,
	selectedGroup,
}: GroupSelectorProps) {
	const selectedDataType = useSelectedDataSource();
	const { loading, groups, error } = useDataGroups(selectedDataType);
	const disabled = useMemo(
		() =>
			isEmpty(selectedDataType) ||
			(isEmpty(selectedDataType.groupResource) &&
				selectedDataType.type !== "customFunction") ||
			!selectedDataType.groupResource,
		[selectedDataType.groupResource, groups, loading],
	);

	return (
		<div className="pb-8 w-100">
			<SingleSelectField
				clearable
				selected={
					groups?.find(({ id }) => id === selectedGroup?.id)?.id
				}
				onChange={({ selected: newValue }: { selected: string }) => {
					const selectedGroup = find(groups, ["id", newValue]);
					onSelect(selectedGroup);
				}}
				error={!!error}
				validationText={error?.message}
				loading={loading}
				disabled={disabled}
				label={
					selectedDataType.groupResource === "programs"
						? "Select Program"
						: "Select Group"
				}
			>
				{groups?.map(({ displayName, id }) => {
					return (
						<SingleSelectOption
							key={id}
							value={id}
							label={displayName ?? ""}
						/>
					);
				})}
			</SingleSelectField>
		</div>
	);
}
