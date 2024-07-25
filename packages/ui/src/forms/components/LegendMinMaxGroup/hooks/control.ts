import { LegendDefinition } from "../../../interfaces/index.js";
import { useCallback } from "react";
import { LegendValue } from "../../LegendMinMax/index.js";
import { findIndex, set } from "lodash";

export function useControlMinMaxFields({
	legendDefinitions,
	value,
	highIsGood,
	onFieldChange,
}: {
	value?: LegendValue[];
	legendDefinitions: LegendDefinition[];
	highIsGood: boolean;
	onFieldChange: (legends: LegendValue[]) => void;
}) {
	const onChange = useCallback(
		(legend: LegendValue) => {
			const legendIndex = findIndex(value, [
				"legendDefinitionId",
				legend.legendDefinitionId,
			]);
			const updatedList = [...(value ?? [])];
			if (legendIndex === -1) {
				updatedList.push(legend);
			} else {
				set(updatedList, [legendIndex], legend);
			}
			onFieldChange(updatedList);
		},
		[value, onFieldChange, highIsGood, legendDefinitions],
	);

	return {
		onChange,
	};
}
