import React from "react"
import {FieldProps} from "../../interfaces";
import {OptionSet} from "@hisptz/dhis2-utils";
import {VALUE_TYPE, VALUE_TYPES} from "../../constants";
import {CustomSelectField} from "../CustomSelectField";
import {TextAreaField} from "@dhis2/ui";
import {NativeField} from "../NativeField";
import {TrueOnlyField} from "../TrueOnlyField";
import {CustomCheckboxField} from "../CustomCheckboxField";
import {LegendDefinitionField} from "../LegendDefinitionField";
import {LegendMinMax} from "../LegendMinMax";
import {AgeField} from "../AgeField";


export interface DHIS2FormFieldProps extends FieldProps {
    optionSet?: OptionSet,
    valueType: VALUE_TYPE
}

function getField(valueType: VALUE_TYPE, optionSet?: OptionSet) {
    if (optionSet) {
        return CustomSelectField;
    }
    switch (valueType) {
        case VALUE_TYPES.AGE.name:
            return AgeField;
        case VALUE_TYPES.DATE.name:
        case VALUE_TYPES.TEXT.name:
        case VALUE_TYPES.NUMBER.name:
        case VALUE_TYPES.INTEGER.name:
        case VALUE_TYPES.PHONE_NUMBER.name:
            return NativeField;
        case VALUE_TYPES.LONG_TEXT.name:
            return TextAreaField;
        case VALUE_TYPES.TRUE_ONLY.name:
            return TrueOnlyField;
        case VALUE_TYPES.BOOLEAN.name:
            return CustomCheckboxField;
        case VALUE_TYPES.LEGEND_DEFINITION.name:
            return LegendDefinitionField;
        case VALUE_TYPES.LEGEND_MIN_MAX.name:
            return LegendMinMax;
        case VALUE_TYPES.FILE.name:
            return NativeField
        default:
            return NativeField;

    }

}

export const DHIS2FormField = React.forwardRef(({valueType, optionSet, ...props}: DHIS2FormFieldProps, ref) => {
    const Field = getField(valueType, optionSet);
    return <Field ref={ref} {...props} />
})