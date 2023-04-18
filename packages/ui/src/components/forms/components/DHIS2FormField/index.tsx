import React from "react";
import {FieldProps} from "../../interfaces";
import {OptionSet} from "@hisptz/dhis2-utils";
import {VALUE_TYPE, VALUE_TYPES} from "../../constants";
import {CustomSelectField} from "../CustomSelectField";
import {NativeField} from "../NativeField";
import {TrueOnlyField} from "../TrueOnlyField";
import {LegendDefinitionField} from "../LegendDefinitionField";
import {LegendMinMax} from "../LegendMinMax";
import {AgeField} from "../AgeField";
import {OrgUnitSelectField} from "../OrgUnitSelectField";
import {FileUploadField} from "../FileUploadField";
import {CustomTextAreaField} from "../CustomTextAreaField";
import {YesNoField} from "../YesNoField";
import {LegendDefinitionsFormField} from "../LegendDefinitions";
import {LegendMinMaxGroup} from "../LegendMinMaxGroup";
import {RichTextEditor} from "../RichTextEditor";
import {PeriodSelectorField, PeriodTypeSelector} from "../PeriodField";


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
        case VALUE_TYPES.URL.name:
        case VALUE_TYPES.EMAIL.name:
        case VALUE_TYPES.TEXT.name:
        case VALUE_TYPES.NUMBER.name:
        case VALUE_TYPES.INTEGER.name:
        case VALUE_TYPES.PHONE_NUMBER.name:
            return NativeField;
        case VALUE_TYPES.LONG_TEXT.name:
            return CustomTextAreaField;
        case VALUE_TYPES.TRUE_ONLY.name:
            return TrueOnlyField;
        case VALUE_TYPES.BOOLEAN.name:
            return YesNoField;
        case VALUE_TYPES.LEGEND_DEFINITION.name:
            return LegendDefinitionField;
        case VALUE_TYPES.LEGEND_DEFINITIONS.name:
            return LegendDefinitionsFormField;
        case VALUE_TYPES.LEGEND_MIN_MAX.name:
            return LegendMinMax;
        case VALUE_TYPES.LEGEND_MIN_MAX_GROUP.name:
            return LegendMinMaxGroup;
        case VALUE_TYPES.ORG_UNIT_FIELD.name:
            return OrgUnitSelectField;
        case VALUE_TYPES.FILE_RESOURCE.name:
            return FileUploadField;
        case VALUE_TYPES.RICH_TEXT.name:
            return RichTextEditor;
        case VALUE_TYPES.PERIOD_TYPE.name:
            return PeriodTypeSelector;
        case VALUE_TYPES.PERIOD.name:
            return PeriodSelectorField;
        default:
            return NativeField;

    }

}

export const DHIS2FormField = React.forwardRef(({valueType, optionSet, ...props}: DHIS2FormFieldProps, ref) => {
    const Field = getField(valueType, optionSet);
    return <Field ref={ref} valueType={valueType} optionSet={optionSet}  {...props} />;
});
