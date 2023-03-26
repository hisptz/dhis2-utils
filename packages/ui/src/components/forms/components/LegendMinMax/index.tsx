import {Field, InputField} from "@dhis2/ui";
import React, {useCallback, useMemo} from "react";
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
                                                  ...props
                                              }: LegendMinMaxProps, ref: React.Ref<any>) => {
    const {id, color, name: legendName} = useMemo(() => legendDefinition ?? {
        id: uid(),
        color: "#FFFFFF",
        name: ""
    }, [legendDefinition]);

    const legend = useMemo(() => ({legendDefinitionId: id ?? uid()}), [id]);

    const onValueChange = useCallback((type: "startValue" | "endValue") => ({value: newValue}: { value: string }) => {
        const object = value ?? legend;
        set(object, type, parseFloat(newValue));
        if (type === "startValue" && newValue > object.endValue) {
            set(object, "endValue", undefined);
        } else if (type === "endValue" && newValue < object.startValue) {
            set(object, "startValue", undefined);
        }
        onChange(object);

    }, [legend, value, onChange]);

    if (!id) {
        return null;
    }

    return (
        <Field {...props} name={name} value={value} label={undefined}>
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
