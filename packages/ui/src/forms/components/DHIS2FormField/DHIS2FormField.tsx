import React from "react";
import { FieldProps } from "../../interfaces/index.js";
import { OptionSet } from "@hisptz/dhis2-utils";
import { VALUE_TYPE, VALUE_TYPES } from "../../constants/index.js";
import { CustomSelectField } from "../CustomSelectField/index.js";
import { NativeField } from "../NativeField/index.js";
import { TrueOnlyField } from "../TrueOnlyField/index.js";
import { LegendDefinitionField } from "../LegendDefinitionField/index.js";
import { LegendMinMax } from "../LegendMinMax/index.js";
import { AgeField } from "../AgeField/index.js";
import { OrgUnitSelectField } from "../OrgUnitSelectField/index.js";
import { FileUploadField } from "../FileUploadField/index.js";
import { CustomTextAreaField } from "../CustomTextAreaField/index.js";
import { YesNoField } from "../YesNoField/index.js";
import { LegendDefinitionsFormField } from "../LegendDefinitions/index.js";
import { LegendMinMaxGroup } from "../LegendMinMaxGroup/index.js";
import { RichTextEditor } from "../RichTextEditor/index.js";
import { isEmpty } from "lodash";

export interface DHIS2FormFieldProps extends FieldProps {
	optionSet?: OptionSet;
	/**
	 * DHIS2 value type
	 * */
	valueType: VALUE_TYPE;
}

function getField(valueType: VALUE_TYPE, optionSet?: OptionSet) {
	if (!isEmpty(optionSet)) {
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
		default:
			return NativeField;
	}
}

/**
 * This is a component that can be used to render fields based on DHIS2 value types.
 * The component supports most used DHIS2 value types and has standardized how data is passed and obtained by the field.
 *
 * The valueType prop determines what field will be shown.
 * In scenarios where the optionSet is provided, the valueType is ignored and a Select field is rendered instead.
 *
 * Apart from the valueType and optionSet, the component also accepts any prop from `FieldProps`
 * @param {Object} props - The properties of the component.
 *
 * @param {string} props.valueType - The value type of the form field.
 * @param {Object} props.optionSet - The option set of the form field.
 * @param {React.Ref} ref - The ref of the component.
 *
 */
export const DHIS2FormField = React.forwardRef<
	DHIS2FormFieldProps,
	DHIS2FormFieldProps
>(({ valueType, optionSet, ...props }: DHIS2FormFieldProps, ref) => {
	const Field = getField(valueType, optionSet);
	return (
		<Field
			ref={ref}
			valueType={valueType}
			optionSet={optionSet}
			{...props}
		/>
	);
});
