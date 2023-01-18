import {SingleSelectField, SingleSelectOption} from "@dhis2/ui";
import React, {useMemo} from "react";
import {FieldProps} from "../../interfaces";


export interface SelectOption {
    label: string;
    value: any
}

export interface CustomSelectFieldProps extends FieldProps {
    filterable?: boolean;
    options: Array<SelectOption>;

    [key: string]: any
}


export const CustomSelectField = React.forwardRef(({
                                                       options,
                                                       filterable,
                                                       onChange,
                                                       value,
                                                       ...props
                                                   }: CustomSelectFieldProps, ref: React.ForwardedRef<any>) => {

    const selectedValue = useMemo(() => {
        if (value) {
            return options.find((option) => option.value === value)?.value ?? "";
        }
        return "";
    }, [options, value]);

    return (
        <SingleSelectField ref={ref} selected={selectedValue}
                           onChange={({selected}: { selected: any }) => onChange(selected)} {...props}>
            {options?.map(({label, value}: SelectOption) => (
                <SingleSelectOption label={label} value={value} key={value}/>
            ))}
        </SingleSelectField>
    )
})
