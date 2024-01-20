export type CalendarTypes = "ethiopian" | "gregorian";

export type DateRangeValue = { startDate: string; endDate: string; type: "RANGE" };

export type PeriodSelectorProps = {
    singleSelection?: boolean;

    allowFuturePeriods?: boolean;
    excludedPeriodTypes?: Array<string>;
    selectedPeriods?: Array<DateRangeValue | string>;
    onSelect: ({items}: { items: Array<DateRangeValue | string> }) => void;
    excludeRelativePeriods?: boolean;
    excludeFixedPeriods?: boolean;
    enableDateRange?: boolean;
    enablePeriodSelector?: boolean;
    defaultInputType?: "period" | "dateRange";
};
