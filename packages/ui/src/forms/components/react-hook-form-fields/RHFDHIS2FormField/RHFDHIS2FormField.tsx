import { Controller } from "react-hook-form";
import React from "react";
import { DHIS2FormField } from "../../DHIS2FormField";
import { RHFFieldProps } from "../../../interfaces";
import { OptionSet } from "@hisptz/dhis2-utils";
import { VALUE_TYPE } from "../../../constants";

export interface RHFDHIS2FormFieldProps extends RHFFieldProps {
	optionSet?: OptionSet;
	valueType: VALUE_TYPE;
}

/**
 * This is a React hook form field wrapper for the `DHIS2FormField`.
 * It enables the React hook form library to control the field by just specifying the field name
 *
 *
 * This component must be used inside a `FormProvider` from `react-hook-form`.
 *
 * @param {Object} RHFDHIS2FormFieldProps - The props for the RHFDHIS2FormField component.
 * @param {string} RHFDHIS2FormFieldProps.valueType - The type of value being held by the form field.
 * @param {Object} RHFDHIS2FormFieldProps.optionSet - The option set for the form field.
 * @param {string} RHFDHIS2FormFieldProps.name - The name of the form field.
 * @param {Object} RHFDHIS2FormFieldProps.validations - The validation rules for the form field.
 * @param {Object} props - Additional props for the component.
 * @returns {React.Component} - The RHFDHIS2FormField component.
 */
export const RHFDHIS2FormField = ({
	valueType,
	optionSet,
	name,
	validations,
	...props
}: RHFDHIS2FormFieldProps) => {
	return (
		<Controller
			rules={validations}
			render={({ field, fieldState }) => {
				return (
					<DHIS2FormField
						{...field}
						value={field.value}
						optionSet={optionSet}
						error={fieldState.error?.message}
						valueType={valueType}
						name={name}
						onChange={field.onChange}
						{...props}
					/>
				);
			}}
			name={name}
		/>
	);
};
