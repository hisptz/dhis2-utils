import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconCross24, InputField } from "@dhis2/ui";
import { DateTime } from "luxon";
import React, { useCallback, useMemo } from "react";
import classes from "./AgeField.module.css";
import { formatDate, getValues } from "./utils/index.js";
import { FieldProps } from "../../interfaces/index.js";

export interface AgeFieldProps extends FieldProps {
	/**
	 * The maximum date the input should be limited to. It should be in the format 'yyyy-MM-dd'
	 * */
	max?: string;
	/**
	 * The callback function called whenever the user changes the date.
	 * @param value - date string with the format 'yyyy-MM-dd'
	 * */
	onChange: (value: string) => void;
	/**
	 * The field value in the format 'yyyy-MM-dd'
	 * */
	value?: string;
}

/**
 * This is an input component that allows user to input the date of birth and then calculates the age.
 *
 * */
export const AgeField = React.forwardRef(
	(
		{ name, value = "", onChange, error, max, ...props }: AgeFieldProps,
		ref: React.Ref<any>,
	) => {
		const { years, months, days } = useMemo(
			() => getValues(value),
			[value],
		);

		const onDateChange = useCallback(
			({ value }: { value?: string }) => {
				if (!value) return;
				onChange(new Date(value).toISOString());
			},
			[onChange],
		);

		const onClear = useCallback(() => {
			onChange("");
		}, [onChange]);

		return (
			<Field
				warning={!!props.warning}
				validationText={
					typeof props.warning === "string"
						? props.warning
						: typeof error === "string"
							? error
							: undefined
				}
				error={Boolean(error)}
				name={name}
			>
				<div className={classes["age-field-container"]}>
					<div className={classes["date-input"]}>
						<InputField
							{...props}
							warning={undefined}
							max={max ?? DateTime.now().toFormat("yyyy-LL-dd")}
							error={Boolean(error)}
							ref={ref}
							value={formatDate(value)}
							label={i18n.t("Date")}
							name={name}
							onChange={onDateChange}
							type={"date"}
						/>
					</div>
					<div
						style={{ width: value ? "40%" : "50%" }}
						className={classes["age-inputs-container"]}
					>
						<InputField
							className={classes["age-input"]}
							value={`${Math.floor(years as number)}`}
							disabled
							label={i18n.t("Years")}
							type="number"
						/>
						<InputField
							className={classes["age-input"]}
							value={`${Math.floor(months as number)}`}
							disabled
							label={i18n.t("Months")}
							type="number"
						/>
						<InputField
							className={classes["age-input"]}
							value={`${Math.floor(days as number)}`}
							disabled
							label={i18n.t("Days")}
							type="number"
						/>
					</div>
					{value && (
						<Button
							className={classes["clear-button"]}
							icon={<IconCross24 />}
							onClick={onClear}
						/>
					)}
				</div>
			</Field>
		);
	},
);
