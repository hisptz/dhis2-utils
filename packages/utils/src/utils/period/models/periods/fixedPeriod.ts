import {
	PeriodInterface,
	type PeriodPreference,
	PeriodTypeInterface,
} from "../../interfaces";
import { DateTime, Interval } from "luxon";
import { BasePeriod } from "./basePeriod";
import { FIXED_PERIOD_TYPES } from "../../constants/fixed";
import { head } from "lodash";
import { FixedPeriodType } from "../periodTypes";
import {
	getAdjacentFixedPeriods,
	type periodTypes,
} from "@dhis2/multi-calendar-dates";

export interface D2FixedPeriod {
	displayName: string;
	iso?: string;
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	periodType: (typeof periodTypes)[number];
}

export class FixedPeriod extends BasePeriod {
	id: string;
	name: string;
	type: PeriodTypeInterface;
	start: DateTime;
	end: DateTime;
	interval: Interval;
	nested: boolean;
	preference?: PeriodPreference;
	config: D2FixedPeriod;

	constructor({
		config,
		nested,
		type,
		preference,
	}: {
		config: D2FixedPeriod;
		type: PeriodTypeInterface;
		nested?: boolean;
		preference?: PeriodPreference;
	}) {
		super();
		this.config = config;
		const { startDate, endDate, id, name } = config;
		const interval = Interval.fromDateTimes(
			DateTime.fromJSDate(new Date(startDate)),
			DateTime.fromJSDate(new Date(endDate)),
		);
		this.preference = preference;
		this.start = interval.start?.startOf("day") ?? DateTime.now();
		this.end = interval.end?.endOf("day") ?? DateTime.now();
		this.type = type;
		this.interval = interval;
		this.id = id ?? this._generateId();
		this.name = name ?? this._generateName();
		this.nested = nested ?? false;
	}

	get(): PeriodInterface | undefined {
		return this._generatePeriod();
	}

	private _generatePeriod(): PeriodInterface | undefined {
		return {
			id: this.id,
			type: this.type.id,
			name: this.name,
			end: this.end,
			endDate: this.end.toJSDate(),
			interval: this.interval,
			iso: this.interval.toISO(),
			next: this._getNextPeriod(),
			previous: this._getPreviousPeriod(),
			start: this.start,
			startDate: this.start.toJSDate(),
		};
	}

	private _getAdjacentPeriod(step: number): PeriodInterface | undefined {
		const previousPeriodObject = getAdjacentFixedPeriods({
			calendar: this.preference?.calendar ?? "gregory",
			period: this.config,
			locale: this.preference?.locale,
			steps: step,
		});
		return new FixedPeriod({
			config: head(previousPeriodObject)!,
			nested: true,
			preference: this.preference,
			type: this.type,
		}).get();
	}

	private _getPreviousPeriod(): PeriodInterface | undefined {
		if (this.nested) {
			return;
		}
		return this._getAdjacentPeriod(-1);
	}

	private _getNextPeriod(): PeriodInterface | undefined {
		if (this.nested) {
			return;
		}
		return this._getAdjacentPeriod(1);
	}

	private _generateId(): string {
		if (this.type.idGenerator) {
			return this.type.idGenerator(this);
		}
		return "";
	}

	private _generateName(): string {
		if (this.type.nameGenerator) {
			return this.type.nameGenerator(this);
		}
		return "";
	}

	static getById(id: string): BasePeriod {
		const periodTypeConfig = [...FIXED_PERIOD_TYPES].find(
			(periodType: PeriodTypeInterface) => {
				if (periodType.regex) {
					return id.match(periodType.regex);
				}
			},
		);
		if (!periodTypeConfig) {
			throw Error("Invalid/Unsupported Period id provided");
		}
		const year = parseInt(head(id.match(/(\d{4})/)) ?? "");
		if (year) {
			const periodType = new FixedPeriodType(periodTypeConfig, {
				year,
				preference: { allowFuturePeriods: true },
			});
			const periods = periodType.periods;

			const period = periods.find((period) => period.id === id);
			if (!period) {
				throw Error("Invalid/Unsupported fixed Period id provided");
			}
			return period;
		}
		throw "Invalid/Unsupported Period id";
	}
}
