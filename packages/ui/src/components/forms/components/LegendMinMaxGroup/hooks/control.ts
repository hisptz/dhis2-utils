import {LegendDefinition} from "../../../interfaces";
import {useCallback} from "react";
import {LegendValue} from "../../LegendMinMax";
import {findIndex, set} from "lodash";


export function useControlMinMaxFields({
                                           legendDefinitions,
                                           value,
                                           highIsGood,
                                           onFieldChange,
                                       }: { value?: LegendValue[], legendDefinitions: LegendDefinition[], highIsGood: boolean; onFieldChange: (legends: LegendValue[]) => void }) {


    const onChange = useCallback(
        (legend: LegendValue) => {
            const legendIndex = findIndex(value, ["legendDefinitionId", legend.legendDefinitionId]);
            const updatedList = [...(value ?? [])];
            if (legendIndex === -1) {
                updatedList.push(legend);
            } else {
                set(updatedList, [legendIndex], legend);
            }

            console.log(updatedList);
            onFieldChange(updatedList);
        },
        [value, onFieldChange],
    );

    return {
        onChange
    };
}
