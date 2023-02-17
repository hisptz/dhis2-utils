import React from "react";
import {FieldProps} from "../../interfaces";
import {CustomCheckboxField} from "../CustomCheckboxField";
import i18n from '@dhis2/d2-i18n';
import {SelectOption} from "../CustomSelectField";
import {SingleSelectField, SingleSelectOption} from "@dhis2/ui";

export interface YesNoFieldProps extends FieldProps {
    renderAsCheckbox?: boolean;
}

export function YesNoField({renderAsCheckbox, ...input}: YesNoFieldProps) {

    if (renderAsCheckbox) {

        return <CustomCheckboxField {...input} />
    }

    const {value, error, onChange, ...props} = input;

    const options = [{value: "true", label: i18n.t("Yes")}, {value: "false", label: i18n.t("No")}];

    const selectedValue = value?.toString();

    return (
        <SingleSelectField
            {...props}
            selected={selectedValue}
            onChange={({selected}: { selected: any }) => onChange(selected === "true")}
            error={!!error}
            validationText={error}
            filterable={options.length > 5}
        >
            {options?.map(({label, value}: SelectOption) => (
                <SingleSelectOption label={label} value={value} key={value}/>
            ))}
        </SingleSelectField>
    )
}
