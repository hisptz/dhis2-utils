import {FieldProps} from "../../interfaces";
import {InputField} from '@dhis2/ui'
import React from "react";

export interface NativeFieldProps extends FieldProps {
    type?: "date" | "text" | "number" | "email" | "color" | "url" | "search" | "password" | "file" | "tel" | "time" | "range"
}


export const NativeField = React.forwardRef(({onChange, value, type, name, error, ...props}: NativeFieldProps, ref) => {

    return (
        <InputField
            value={value}
            type={type}
            name={name}
            onChange={({value}: { value: any }) => onChange(value)}
            ref={ref}
            error={!!error}
            validationText={typeof error === "string" ? error : undefined}
            {...props}
        />
    )
})
