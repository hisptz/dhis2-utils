import { TextAreaField } from "@dhis2/ui";
import React from "react";
import { FieldProps } from "../../interfaces";

export interface CustomTextAreaFieldProps extends FieldProps {}

export function CustomTextAreaField({
	name,
	value,
	onChange,
	error,
	...props
}: CustomTextAreaFieldProps) {
	return (
		<TextAreaField
			value={value}
			name={name}
			onChange={({ value }: { value: any }) => onChange(value)}
			error={!!error}
			validationText={typeof error === "string" ? error : undefined}
			{...props}
		/>
	);
}
