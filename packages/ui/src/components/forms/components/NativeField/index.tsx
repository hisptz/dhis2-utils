import {FieldProps} from "../../interfaces";
import {InputField} from '@dhis2/ui'
import React, {useMemo} from "react";
import {VALUE_TYPE} from "../../constants";

export interface NativeFieldProps extends FieldProps {
    type?: "date" | "text" | "number" | "email" | "color" | "url" | "search" | "password" | "file" | "tel" | "time" | "range",
    valueType?: VALUE_TYPE
}


export const NativeField = React.forwardRef(({
                                                 onChange,
                                                 value,
                                                 type,
                                                 valueType,
                                                 name,
                                                 error,
                                                 ...props
                                             }: NativeFieldProps, ref) => {

    const fieldType: string = useMemo(() => {
        if (type) {
            return type;
        }
        switch (valueType) {
            case "INTEGER":
                return "number";
            case "PHONE_NUMBER":
                return "tel";
            default:
                return valueType?.toLowerCase() ?? 'text'

        }
    }, [type, valueType])

    return (
        <InputField
            value={value}
            type={fieldType}
            name={name}
            onChange={({value}: { value: any }) => onChange(value)}
            ref={ref}
            error={!!error}
            validationText={typeof error === "string" ? error : undefined}
            {...props}
        />
    )
})
