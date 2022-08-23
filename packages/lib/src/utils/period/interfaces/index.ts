import {DateTime, DurationLikeObject, Interval} from "luxon";
import {BasePeriod} from "../models/periods/basePeriod";

export enum PeriodTypeCategory {
    FIXED = 'FIXED',
    RELATIVE = 'RELATIVE',
}

export interface PeriodTypeInterface {
    id: string;
    name: string;
    unit: string;
    regex?: RegExp;
    type: PeriodTypeCategory;
    rank?: number;
    factor?: number;
    offset?: {
        unit: keyof DurationLikeObject;
        value: number;
    };
    idGenerator?: (period: BasePeriod) => string;
    nameGenerator?: (period: BasePeriod) => string;
    getPeriods?: () => { id: string; name: string }[];
}

export interface PeriodInterface {
    id: string;
    name: string;
    startDate: DateTime;
    endDate: DateTime;
    type: string;
    iso: string;
    interval: Interval;
    previous?: PeriodInterface;
    next?: PeriodInterface;
}

export interface PeriodPreference {
    allowFuturePeriods: boolean;
}

