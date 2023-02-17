import {SingleSelectField, SingleSelectOption} from "@dhis2/ui";
import React, {useMemo} from "react";
import {FieldProps} from "../../interfaces";
import {OptionSet} from "@hisptz/dhis2-utils";


export interface SelectOption {
    label: string;
    value: any
}

export interface CustomSelectFieldProps extends FieldProps {
    filterable?: boolean;
    optionSet: OptionSet;

    [key: string]: any
}


export const CustomSelectField = React.forwardRef(({
                                                       filterable,
                                                       onChange,
                                                       optionSet,
                                                       value,
                                                       error,
                                                       ...props
                                                   }: CustomSelectFieldProps, ref: React.ForwardedRef<any>) => {

    const options = useMemo(() => optionSet?.options?.map(({code, name}) => ({
        label: name ?? '',
        value: code
    })) ?? [], [optionSet]);

    const selectedValue = useMemo(() => {
        if (value) {
            return options.find((option) => option.value === value)?.value ?? "";
        }
        return "";
    }, [options, value]);

    return (
        <SingleSelectField
            ref={ref}
            selected={selectedValue}
            onChange={({selected}: { selected: any }) => onChange(selected)}
            error={!!error}
            validationText={error}
            filterable
            {...props}
        >
            {options?.map(({label, value}: SelectOption) => (
                <SingleSelectOption label={label} value={value} key={value}/>
            ))}
        </SingleSelectField>
    )
})
