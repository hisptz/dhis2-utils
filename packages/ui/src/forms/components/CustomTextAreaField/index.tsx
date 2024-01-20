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
			{...props}
			warning={!!props.warning}
			value={value}
			name={name}
			onChange={({ value }: { value?: any }) => onChange(value)}
			error={!!error}
			validationText={
				typeof props.warning === "string"
					? props.warning
					: typeof error === "string"
						? error
						: undefined
			}
		/>
	);
}
