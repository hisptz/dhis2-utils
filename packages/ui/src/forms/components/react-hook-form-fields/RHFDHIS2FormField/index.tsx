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
