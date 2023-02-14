import {FieldProps} from "../../interfaces";
import React from "react";
import {CheckboxField} from "@dhis2/ui";


export interface CustomCheckboxFieldProps extends FieldProps {
    trueOnly?: boolean;
}


export const CustomCheckboxField = React.forwardRef(({
                                                                                                                    value,
                                                                                                                    onChange,
                                                                                                                    name,
                                                                                                                    error,
                                                                                                                    trueOnly,
                                                                                                                    ...props
                                                                                                                }: CustomCheckboxFieldProps, ref: React.ForwardedRef<any>) => {

    return (
        <CheckboxField
            name={name}
            error={!!error}
            validationText={typeof error === "string" ? error : undefined}
            ref={ref}
            checked={Boolean(value)}
            onChange={({checked}: { checked: boolean }) => {
                if (trueOnly) {
                    onChange(checked ? checked : undefined);
                } else {
                    onChange(checked);
                }
            }}
            {...props}
        />
    )
})

