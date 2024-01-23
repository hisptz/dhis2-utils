import React, { useMemo } from "react";
import { CustomSelectField } from "../../../../forms/index.js";
import i18n from "@dhis2/d2-i18n";
import { MapOrEntries, useMap } from "usehooks-ts";
import { head, isEmpty, uniqBy } from "lodash";
import {
	BasePeriod,
	BasePeriodType,
	PeriodTypeCategory,
	PeriodUtility,
} from "@hisptz/dhis2-utils";

export interface FixedPeriodSelectorProps {
	onSelect: ({ items }: { items: Array<string> }) => void;
	selectedPeriods?: Array<string>;
	allowFuturePeriods?: boolean;
}

/**
 * This is a period selector that allows selection of fixed periods only.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.allowFuturePeriods - Whether to allow future periods. Default is false.
 * @param {Array} props.selectedPeriods - The selected periods.
 * @param {function} props.onSelect - The callback function when a period is selected.
 *
 * @returns {ReactNode} The fixed period selector component.
 */
export function FixedPeriodSelector({
	allowFuturePeriods,
	selectedPeriods,
	onSelect,
}: FixedPeriodSelectorProps) {
	const defaultValue: MapOrEntries<string, string> | undefined =
		useMemo(() => {
			if (isEmpty(selectedPeriods)) {
				return;
			}
			const period = PeriodUtility.getPeriodById(
				head(selectedPeriods) as string,
			);
			return [
				["year", period.start.year.toString()],
				["periodType", period.type.id],
			];
		}, [selectedPeriods]);
	const [value, { set }] = useMap<string, string>(defaultValue);
	const year = useMemo(() => value.get("year"), [value]);
	const periodType = useMemo(() => value.get("periodType"), [value]);

	const periodUtility = useMemo(() => {
		return PeriodUtility.fromObject({
			year: year ? parseInt(year) : new Date().getFullYear(),
			category: PeriodTypeCategory.FIXED,
			preference: {
				allowFuturePeriods: allowFuturePeriods ?? false,
			},
		});
	}, [year]);

	const years = useMemo(() => {
		const currentYear = year
			? parseInt(year) ?? new Date().getFullYear()
			: new Date().getFullYear();
		return uniqBy(
			[
				...Array.from(Array(10).keys())
					.map((index) => ({
						name: `${currentYear - index}`,
						code: `${currentYear - index}`,
					}))
					.reverse(),
				...(allowFuturePeriods
					? Array.from(Array(5).keys()).map((index) => ({
							name: `${currentYear + index}`,
							code: `${currentYear + index}`,
						}))
					: []),
			],
			"code",
		);
	}, [year]);

	const isYearPeriodType = useMemo(() => {
		if (!periodType) {
			return false;
		}
		const periodTypeConfig = periodUtility.getPeriodType(periodType);
		return (periodTypeConfig?.config?.rank ?? 0) > 7;
	}, [periodType]);

	const periodTypes = useMemo(() => {
		return periodUtility.periodTypes.map((periodType: BasePeriodType) => ({
			name: periodType.config.name,
			code: periodType.id,
		}));
	}, [periodUtility]);

	const periods = useMemo(() => {
		if (!periodType) {
			return [];
		}
		const periodTypeConfig = periodUtility.getPeriodType(periodType);
		return periodTypeConfig?.periods?.map((period: BasePeriod) => ({
			name: period.name,
			code: period.id,
		}));
	}, [periodUtility, periodType]);

	console.log({
		years,
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
				width: "100%",
			}}
		>
			<div
				style={{
					display: "grid",
					gap: 8,
					gridTemplateColumns: isYearPeriodType ? "1fr" : "2fr 1fr",
				}}
			>
				<CustomSelectField
					value={periodType}
					onChange={(value: string) => set("periodType", value)}
					name="periodType"
					label={i18n.t("Period Type")}
					optionSet={{
						options: periodTypes,
					}}
				/>
				{!isYearPeriodType && (
					<CustomSelectField
						label={i18n.t("Year")}
						value={year}
						name="year"
						onChange={(value: string) => set("year", value)}
						optionSet={{
							options: years,
						}}
					/>
				)}
			</div>
			<CustomSelectField
				helpText={
					!periodType ? i18n.t("Select period type first") : undefined
				}
				label={i18n.t("Period")}
				value={head(selectedPeriods)}
				optionSet={{ options: periods }}
				name="periods"
				onChange={(value: string) => onSelect({ items: [value] })}
			/>
		</div>
	);
}
