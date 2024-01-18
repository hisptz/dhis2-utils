import i18n from "@dhis2/d2-i18n";
import { CssReset, InputField } from "@dhis2/ui";
import { head } from "lodash";
import React, { useCallback, useMemo } from "react";
import { DateRangeValue } from "../../types";
import { DateTime } from "luxon";

/**
 * A component that allows the user to select a date range.
 *
 * @param {Object} options - The options for the DateRange component.
 * @param {DateRangeValue[]} options.value - The current value of the date range.
 * @param {Function} options.onChange - The function to call when the date range changes. Receives an object with an `items` property that contains the new date range value.
 * @param {boolean} [options.allowFuturePeriods=false] - Specifies whether future periods are allowed in the date range.
 *
 * @return {JSX.Element} - The DateRange component.
 */
export default function DateRange({
	value,
	onChange,
	allowFuturePeriods,
}: {
	value?: DateRangeValue[];
	onChange: ({ items }: { items: DateRangeValue[] }) => void;
	allowFuturePeriods?: boolean;
}) {
	const data = useMemo(
		() =>
			head(value as DateRangeValue[]) ?? {
				startDate: "",
				endDate: "",
				type: "RANGE",
			},
		[value],
	);
	const { startDate, endDate } = data;

	const onDateChange = useCallback(
		(key: string) =>
			({ value: dateValue }: { value?: string }) => {
				onChange({
					items: [{ ...data, [key]: dateValue } as DateRangeValue],
				});
			},
		[data],
	);

	const today = DateTime.now().toFormat("yyyy-MM-dd");

	return (
		<div className="column gap-16">
			<CssReset />
			<InputField
				value={startDate}
				onChange={onDateChange("startDate")}
				max={endDate ?? today}
				type="date"
				label={i18n.t("Start Date")}
			/>
			<InputField
				value={endDate}
				onChange={onDateChange("endDate")}
				min={startDate}
				max={!allowFuturePeriods ? today : undefined}
				type="date"
				label={i18n.t("End Date")}
			/>
		</div>
	);
}
