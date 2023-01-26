import React, {useMemo} from "react";
import {CustomSelectField} from "../../../../forms";
import {PeriodTypeCategory, PeriodUtility} from "@hisptz/dhis2-utils";
import i18n from '@dhis2/d2-i18n';
import {MapOrEntries, useMap} from "usehooks-ts";
import {head, isEmpty, uniqBy} from "lodash";

export interface FixedPeriodSelectorProps {
    onSelect: ({items}: { items: Array<string> }) => void;
    selectedPeriods?: Array<string>;
    allowFuturePeriods?: boolean
}

export function FixedPeriodSelector({allowFuturePeriods, selectedPeriods, onSelect}: FixedPeriodSelectorProps) {
    const defaultValue: MapOrEntries<string, string> | undefined = useMemo(() => {
        if (isEmpty(selectedPeriods)) {
            return;
        }
        const period = PeriodUtility.getPeriodById(head(selectedPeriods) as string);
        return [
            ['year', period.start.year.toString()],
            ['periodType', period.type.id]
        ]
    }, [selectedPeriods]);
    const [value, {set}] = useMap<string, string>(defaultValue);
    const year = useMemo(() => value.get("year"), [value]);
    const periodType = useMemo(() => value.get("periodType"), [value]);

    const periodUtility = useMemo(() => {
        return PeriodUtility.fromObject({
            year: year ? parseInt(year) : new Date().getFullYear(),
            category: PeriodTypeCategory.FIXED,
            preference: {
                allowFuturePeriods: allowFuturePeriods ?? false
            }
        })
    }, [year]);

    const years = useMemo(() => {
        const currentYear = year ? parseInt(year) ?? new Date().getFullYear() : new Date().getFullYear();
        return uniqBy([...Array.from(Array(10).keys()).map((index) => ({
            label: `${currentYear - index}`,
            value: `${currentYear - index}`
        })).reverse(), ...(allowFuturePeriods ? (Array.from(Array(5).keys()).map((index) => ({
            label: `${currentYear + index}`,
            value: `${currentYear + index}`
        }))) : [])], 'value')
    }, [year]);

    const isYearPeriodType = useMemo(() => {
        if (!periodType) {
            return false;
        }
        const periodTypeConfig = periodUtility.getPeriodType(periodType);
        return (periodTypeConfig?.config?.rank ?? 0) > 7
    }, [periodType]);


    const periodTypes = useMemo(() => {
        return periodUtility.periodTypes.map((periodType) => ({
            label: periodType.config.name,
            value: periodType.id
        }))
    }, [periodUtility]);

    const periods = useMemo(() => {
        if (!periodType) {
            return [];
        }
        const periodTypeConfig = periodUtility.getPeriodType(periodType);
        return periodTypeConfig?.periods?.map((period) => ({label: period.name, value: period.id}))
    }, [periodUtility, periodType]);

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 8, width: "100%"}}>
            <div style={{display: "grid", gap: 8, gridTemplateColumns: isYearPeriodType ? "1fr" : "2fr 1fr"}}>
                <CustomSelectField
                    value={periodType}
                    onChange={(value: string) => set("periodType", value)}
                    name="periodType"
                    label={i18n.t("Period Type")}
                    options={periodTypes}
                />
                {
                    !isYearPeriodType && (
                        <CustomSelectField label={i18n.t("Year")} value={year} options={years} name="year"
                                           onChange={(value: string) => set("year", value)}/>)
                }

            </div>
            <CustomSelectField helpText={!periodType ? (i18n.t("Select period type first")) : undefined}
                               label={i18n.t("Period")} value={head(selectedPeriods)} options={periods} name="periods"
                               onChange={(value: string) => onSelect({items: [value]})}/>
        </div>
    )
}
