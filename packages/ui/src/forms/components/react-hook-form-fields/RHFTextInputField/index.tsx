import React from "react";
import { Controller } from "react-hook-form";
import { InputField } from "@dhis2/ui";

export function RHFTextInputField({
	name,
	validations,
	...props
}: {
	name: string;
	validations?: Record<string, any>;
	[key: string]: any;
}): React.ReactElement {
	return (
		<Controller
			name={name}
			rules={validations}
			render={({
				field: { value, onChange, ref, onBlur, ...rest },
				fieldState: { error },
			}) => (
				<InputField
					{...rest}
					name={name}
					validationText={error?.message}
					error={!!error}
					{...props}
					onBlur={onBlur}
					ref={ref}
					value={value}
					onChange={({ value }: { value?: string }) =>
						onChange(value)
					}
				/>
			)}
		/>
	);
}
