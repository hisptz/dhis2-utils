import { DateTime, DateTimeUnit, DurationLikeObject, Interval } from "luxon";
import { BasePeriod } from "../models/index.js";
import { PeriodTypeCategory, PeriodTypeEnum } from "../constants/index.js";
import type { SupportedCalendar } from "@dhis2/multi-calendar-dates/build/types/types";

export interface RelativePeriodConfig {
	id: string;
	name: string;
	offset?: number;
	span?: number;
}

export interface PeriodTypeInterface {
	/** Period type, one of @link(PeriodTypeEnum) */
	id: PeriodTypeEnum;
	/** Period type name*/
	name: string;
	/** Period type unit (luxon) eg `days`, `months`, `years` e.t.c */
	unit: DateTimeUnit;
	/** A regular expression that can be used to test the id of a Period that falls under this type */
	regex?: RegExp;
	/** Either `FIXED`, `RELATIVE`*/
	type: PeriodTypeCategory;
	/** Ranking of this Period type to other Period types */
	rank?: number;
	/** Used for specific periods whose interval spans over the specified unit,*/
	factor?: number;
	/** Used for specific Period types whose Period calculation has offset from default starting dates of intervals*/
	offset?: {
		/** Unit by which the periods should be offset*/
		unit: keyof DurationLikeObject;
		/** Value by which the specified unit should be offset to */
		value: number;
	};
	/** A generator functions that returns a valid id for the given Period when it is provided with the Period interval
	 * @param [@link(Interval)]
	 * @returns string
	 * */
	idGenerator?: (period: BasePeriod) => string;
	/** A generator functions that returns a valid id for the given Period when it is provided with the Period interval
	 * @param [@link(Interval)]
	 * @returns string
	 * */
	nameGenerator?: (period: BasePeriod) => string;
	/**
	 * For relative periods. Returns a list of Period objects for the Period type
	 *
	 * @return periodObject
	 *
	 * */
	getPeriods?: () => { id: string; name: string }[];
}

/**
 * The interface that defined a Period payload obtained through the get() method in the Period class
 *
 * */
export interface PeriodInterface {
	/** Period id*/
	id: string;
	/** Period name*/
	name: string;
	/** Period start date in JS */
	startDate: Date;
	/** Period end date in JS date*/
	endDate: Date;
	/** Period start date in DateTime (luxon) object*/
	start: DateTime;
	/** Period end date in DateTime (luxon) object*/
	end: DateTime;
	/** Period type */
	type: PeriodTypeEnum;
	/** Period iso (luxon) */
	iso: string;
	/** Period interval (luxon) */
	interval: Interval;
	/** this Period's previous Period*/
	previous?: PeriodInterface;
	/** this Period's next Period*/
	next?: PeriodInterface;
}

export interface PeriodPreference {
	/** allow the Period utility instance to return future dates */
	allowFuturePeriods: boolean;
	calendar?: SupportedCalendar;
	locale?: string;
	yearsCount?: number;
}

export interface DateTimeConfiguration {
	calendar?: CalendarType;
	locale?: string;
}

export type CalendarType =
	| "ethioaa"
	| "ethiopic"
	| "hebrew"
	| "indian"
	| "islamic"
	| "islamicc"
	| "iso8601"
	| "japanese"
	| "persian"
	| "roc";
