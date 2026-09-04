import { MultiSelectField, MultiSelectOption } from "@dhis2/ui";
import { type ForwardedRef, forwardRef, useMemo } from "react";
import { FieldProps } from "../../interfaces";
import { OptionSet } from "@hisptz/dhis2-utils";

interface SelectOption {
	label: string;
	value: string;
}

export interface CustomMultiSelectFieldProps extends FieldProps {
	filterable?: boolean;
	optionSet: OptionSet;
	value: string[];

	[key: string]: any;
}

export const CustomMultiSelectField = forwardRef<
	HTMLSelectElement,
	CustomMultiSelectFieldProps
>(
	(
		{ filterable, onChange, optionSet, value, error, warning, ...props },
		ref: ForwardedRef<any>,
	) => {
		const options = useMemo(
			() =>
				optionSet?.options?.map(
					({ code, name }: { code: string; name: string }) => ({
						label: name ?? "",
						value: code,
					}),
				) ?? [],
			[optionSet?.options],
		);

		const selectedValue = useMemo(() => {
			if (value) {
				return (
					options.filter((option: { value: string }) =>
						value.includes(option.value),
					)?.value ?? ""
				);
			}
			return [];
		}, [options, value]);

		const validationText =
			typeof warning === "string"
				? warning
				: typeof error === "string"
					? error
					: undefined;

		return (
			<MultiSelectField
				ref={ref}
				selected={selectedValue}
				onChange={({ selected }: { selected: string[] }) =>
					onChange(selected)
				}
				error={!!error}
				validationText={validationText}
				filterable={options.length > 5}
				warning={Boolean(warning)}
				{...props}
			>
				{options?.map(({ label, value }: SelectOption) => (
					<MultiSelectOption
						label={label}
						value={value}
						key={value}
					/>
				))}
			</MultiSelectField>
		);
	},
);
