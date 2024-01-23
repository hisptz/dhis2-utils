import i18n from "@dhis2/d2-i18n";
import { SegmentedControl } from "@dhis2/ui";
import { head, isEmpty } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import DateRange from "./components/DateRange/DateRange.js";
import PeriodSelect from "./components/PeriodSelect/PeriodSelect.js";
import { DateRangeValue, PeriodSelectorProps } from "./types/index.js";

export * from "./components/PeriodSelect/PeriodSelect.js";
export * from "./components/FixedPeriodSelector/FixedPeriodSelector.js";
export * from "./types/index.js";

/**
 * The `PeriodSelector` components combines the `PeriodSelect` and `DateRange` selectors into one component with SegmentedControl to select which selector is active at a time.
 * This is useful in use cases where both date range or periods are relevant for the selection.
 *
 * @param {object} props - The properties object.
 * @param {string[]} [props.excludedPeriodTypes] - The period types to exclude from the selection.
 * @param {string[]} [props.selectedPeriods] - The initially selected periods.
 * @param {function} props.onSelect - The callback function called when a period or date range is selected.
 * @param {boolean} [props.excludeFixedPeriods] - Whether to exclude fixed periods from the selection.
 * @param {boolean} [props.excludeRelativePeriods] - Whether to exclude relative periods from the selection.
 * @param {boolean} [props.singleSelection] - Whether to allow only one selection at a time.
 * @param {boolean} [props.enableDateRange] - Whether to enable the date range selector.
 * @param {string} [props.defaultInputType] - The default input type when selected periods are empty.
 * @param {boolean} [props.enablePeriodSelector] - Whether to enable the period selector.
 * @param {boolean} [props.allowFuturePeriods] - Whether to allow future periods to be selected.
 */
export function PeriodSelector({
	excludedPeriodTypes,
	selectedPeriods,
	onSelect,
	excludeFixedPeriods,
	excludeRelativePeriods,
	singleSelection,
	enableDateRange,
	defaultInputType,
	enablePeriodSelector,
	allowFuturePeriods,
}: PeriodSelectorProps) {
	const initialInputType = useMemo(() => {
		if (!isEmpty(selectedPeriods)) {
			const period: any = head(selectedPeriods ?? []);
			if (period?.type === "RANGE") {
				if (enableDateRange) {
					return "dateRange";
				} else {
					throw Error(
						"Date range periods must be enabled by passing the prop `enableDateRange`",
					);
				}
			} else {
				if (enablePeriodSelector) {
					return "period";
				} else {
					throw Error(
						"Fixed or relative periods must be enabled by passing the prop `enablePeriodSelector`",
					);
				}
			}
		} else {
			if (defaultInputType) {
				return defaultInputType;
			}
			if (enablePeriodSelector) {
				return "period";
			}
			if (enableDateRange) {
				return "dateRange";
			}
			return "period";
		}
	}, [enablePeriodSelector, enableDateRange, defaultInputType]);
	const [inputType, setInputType] = useState<string>(initialInputType);

	const onInputTypeChange = useCallback(
		({ value }: { value: string }) => {
			onSelect({ items: [] });
			setInputType(value);
		},
		[onSelect],
	);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			{enableDateRange && enablePeriodSelector && (
				<SegmentedControl
					selected={inputType}
					onChange={onInputTypeChange}
					options={[
						{
							label: i18n.t("Period"),
							value: "period",
						},
						{
							label: i18n.t("Date Range"),
							value: "dateRange",
						},
					]}
				/>
			)}
			{inputType === "period" && (
				<PeriodSelect
					allowFuturePeriods={allowFuturePeriods}
					singleSelection={singleSelection}
					excludedPeriodTypes={excludedPeriodTypes ?? []}
					onSelect={
						onSelect as unknown as (selected: {
							items: string[];
						}) => void
					}
					selectedPeriods={selectedPeriods as string[]}
					excludeFixedPeriods={excludeFixedPeriods}
					excludeRelativePeriods={excludeRelativePeriods}
				/>
			)}
			{inputType === "dateRange" && (
				<DateRange
					allowFuturePeriods={allowFuturePeriods}
					value={selectedPeriods as DateRangeValue[]}
					onChange={
						onSelect as unknown as (selected: {
							items: DateRangeValue[];
						}) => void
					}
				/>
			)}
		</div>
	);
}
