import { type ReactElement } from "react";
import { Controller } from "react-hook-form";
import { Field, Radio } from "@dhis2/ui";

export function RHFRadioField({
	name,
	radioValue,
	validations,
	...props
}: {
	name: string;
	validations?: Record<string, any>;
	radioValue: string;
	[key: string]: any;
}): ReactElement {
	return (
		<Controller
			name={name}
			rules={validations}
			render={({
				field: { value, onBlur, onChange, name, ref, ...rest },
				fieldState: { error },
			}) => (
				<Field
					validationText={error?.message as string}
					error={!!error}
					{...props}
				>
					<Radio
						{...rest}
						value={radioValue}
						name={name}
						checked={value === radioValue}
						ref={ref}
						onBlur={onBlur}
						onChange={({ checked }: { checked: boolean }) =>
							checked && onChange(radioValue)
						}
					/>
				</Field>
			)}
		/>
	);
}
