import {DateTime, DurationLikeObject, Interval} from "luxon";
import {BasePeriod} from "../models";
import {PeriodTypeEnum} from "../constants";


/**
 * Categories of periods, currently supports
 - Fixed
 - Relative
 * */
export enum PeriodTypeCategory {
    FIXED = 'FIXED',
    RELATIVE = 'RELATIVE',
}


export interface PeriodTypeInterface {
    /** Period type, one of @link(PeriodTypeEnum) */
    id: PeriodTypeEnum;
    /** Period type name*/
    name: string;
    /** Period type unit (luxon) eg `days`, `months`, `years` e.t.c */
    unit: string;
    /** A regular expression that can be used to test the id of a period that falls under this type */
    regex?: RegExp;
    /** Either `FIXED`, `RELATIVE`*/
    type: PeriodTypeCategory;
    /** Ranking of this period type to other period types */
    rank?: number;
    /** Used for specific periods whose interval spans over the specified unit,*/
    factor?: number;
    /** Used for specific period types whose period calculation has offset from default starting dates of intervals*/
    offset?: {
        /** Unit by which the periods should be offset*/
        unit: keyof DurationLikeObject;
        /** Value by which the specified unit should be offset to */
        value: number;
    };
    /** A generator functions that returns a valid id for the given period when it is provided with the period interval
     * @param [@link(Interval)]
     * @returns string
     * */
    idGenerator?: (period: BasePeriod) => string;
    /** A generator functions that returns a valid id for the given period when it is provided with the period interval
     * @param [@link(Interval)]
     * @returns string
     * */
    nameGenerator?: (period: BasePeriod) => string;
    /**
     * For relative periods. Returns a list of period objects for the period type
     *
     * @return periodObject
     *
     * */
    getPeriods?: () => { id: string; name: string }[];
}

/**
 * The interface that defined a period payload obtained through the get() method in the period class
 *
 * */
export interface PeriodInterface {
    /** period id*/
    id: string;
    /** period name*/
    name: string;
    /** period start date in JS */
    startDate: Date;
    /** period end date in JS date*/
    endDate: Date;
    /** period start date in DateTime (luxon) object*/
    start: DateTime;
    /** period end date in DateTime (luxon) object*/
    end: DateTime;
    /** period type */
    type: PeriodTypeEnum;
    /** period iso (luxon) */
    iso: string;
    /** period interval (luxon) */
    interval: Interval;
    /** this period's previous period*/
    previous?: PeriodInterface;
    /** this period's next period*/
    next?: PeriodInterface;
}

export interface PeriodPreference {
    /** allow the period utility instance to return future dates */
    allowFuturePeriods: boolean;
}

