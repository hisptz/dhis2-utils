import {DateTime, DurationLikeObject, Interval} from "luxon";
import {Period} from "../models/period";

export enum PeriodTypeTypes {
    FIXED = 'FIXED',
    RELATIVE = 'RELATIVE',
}

export interface PeriodTypeInterface {
    id: string;
    name: string;
    unit: string;
    regex: RegExp;
    type: PeriodTypeTypes;
    rank: number;
    factor?: number;
    offset?: {
        unit: keyof DurationLikeObject;
        value: number;
    };
    idGenerator: (period: Period) => string;
    nameGenerator: (period: Period) => string;
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

