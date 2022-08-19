export interface Period {
    startDate?: string;
    endDate?: string;
    name?: string;
    id?: string;
    iso?: string;
}

export interface PeriodConfig {
    offset?: string;
    filterFuturePeriods?: boolean;
    reversePeriods?: boolean;
}

export interface WeekObject {
    startDay: number;
    shortName: string;
}

export type PeriodFilterFn = (period: Period[]) => Period[];
