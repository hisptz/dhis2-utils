import {Field, InputField} from "@dhis2/ui";
import React, {useCallback, useMemo, useState} from "react";
import {FieldProps, LegendDefinition} from "../../interfaces";
import {uid} from "@hisptz/dhis2-utils";
import {set} from "lodash";
import i18n from "@dhis2/d2-i18n";

export * from "./models";

export interface LegendValue {
    legendDefinitionId: string;
    startValue: number;
    endValue: number;
}

export type LegendMinMaxProps = FieldProps & {
    legendDefinition?: LegendDefinition;
    value?: LegendValue;
    onChange: (value: LegendValue) => void;
    min?: number;
    max?: number;
};

export const LegendMinMax = React.forwardRef(({
                                                  name,
                                                  value,
                                                  onChange,
                                                  legendDefinition,
                                                  min, max,
                                                  error,
                                                  ...props
                                              }: LegendMinMaxProps, ref: React.Ref<any>) => {
    const {id, color, name: legendName} = useMemo(() => legendDefinition ?? {
        id: uid(),
        color: "#FFFFFF",
        name: ""
    }, [legendDefinition]);

    const [rangeError, setRangeError] = useState<string | undefined>();
    const legend = useMemo(() => ({legendDefinitionId: id ?? uid()}), [id]);

    const onValueChange = useCallback((type: "startValue" | "endValue") => ({value: newValue}: { value: string }) => {
        const object = value ?? legend;
        const newNumberValue = parseFloat(newValue);

        if (isNaN(newNumberValue)) {
            set(object, type, undefined);
        } else {
            set(object, type, newNumberValue);
        }
        if (type === "startValue" && newNumberValue > object.endValue) {
            setRangeError(`The min value should not exceed the max value (${object.endValue})`);
        } else if (type === "endValue" && newNumberValue < object.startValue) {
            setRangeError(`The max value should not be less than the min value (${object.endValue})`);
        } else {
            setRangeError(undefined);
        }
        onChange(object);

    }, [legend, value, onChange]);

    if (!id) {
        return null;
    }

    return (
        <Field validationText={error || rangeError} error={Boolean(error) || Boolean(rangeError)} {...props} name={name}
               value={value} label={undefined}>
            <div ref={ref} style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32}}
            >
                <div style={{display: "flex", gap: 16}}>
                    <div
                        className="pr-16"
                        style={{
                            backgroundColor: color,
                            border: `1px solid ${color}`,
                            height: 24,
                            width: 48,
                            marginRight: 4,
                        }}
                    />
                    <label className="pl-8">{legendName}</label>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", gap: 16}}>
                    <InputField
                        value={value?.startValue?.toString()}
                        type="number"
                        min={min}
                        max={`${value?.endValue ?? max ?? ""}`}
                        onChange={onValueChange("startValue")}
                        label={i18n.t("Min")}
                    />
                    <InputField
                        value={value?.endValue?.toString()}
                        type="number"
                        min={`${value?.startValue ?? min ?? ""}`}
                        max={max}
                        onChange={onValueChange("endValue")}
                        label={i18n.t("Max")}
                    />
                </div>
            </div>
        </Field>
    );
});
