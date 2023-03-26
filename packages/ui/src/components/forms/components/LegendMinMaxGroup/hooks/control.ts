import {LegendDefinition} from "../../../interfaces";
import {useCallback} from "react";
import {LegendValue} from "../../LegendMinMax";
import {findIndex, set} from "lodash";

function normalizeValues(legends: LegendValue[], value: LegendValue, {
    highIsGood,
    legendDefinitions
}: { highIsGood: boolean; legendDefinitions: LegendDefinition[] }) {
    const updatedLegends = [...legends];
    const index = findIndex(updatedLegends, ["legendDefinitionId", value.legendDefinitionId]);
    const nextIndex = index + 1;
    const prevIndex = index - 1;


    if (highIsGood) {
        if (nextIndex >= updatedLegends.length) {
            const legendDefinitionId = legendDefinitions[nextIndex]?.id;
            if (legendDefinitionId) {
                set(updatedLegends, [nextIndex], {legendDefinitionId, endValue: value.startValue});
            }
        } else {
            set(updatedLegends, [nextIndex], {...(updatedLegends[nextIndex]), endValue: value.startValue});
        }
        if (prevIndex >= 0) {
            set(updatedLegends, [prevIndex], {...(updatedLegends[prevIndex]), startValue: value.endValue});
        }
    } else {
        if (nextIndex >= updatedLegends.length) {
            const legendDefinitionId = legendDefinitions[nextIndex]?.id;
            if (legendDefinitionId) {
                set(updatedLegends, [nextIndex], {legendDefinitionId, startValue: value.endValue});
            }
        } else {
            set(updatedLegends, [nextIndex], {...(updatedLegends[nextIndex]), startValue: value.endValue});
        }

        if (prevIndex >= 0) {
            set(updatedLegends, [prevIndex], {...(updatedLegends[prevIndex]), endValue: value.startValue});
        }

    }

    return updatedLegends;
}

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
            onFieldChange(normalizeValues(updatedList, legend, {highIsGood, legendDefinitions}));
        },
        [value, onFieldChange, highIsGood, legendDefinitions],
    );

    return {
        onChange
    };
}
