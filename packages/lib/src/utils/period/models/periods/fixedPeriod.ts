import {PeriodInterface, PeriodTypeInterface} from "../../interfaces";
import {DateTime, Interval} from "luxon";
import {BasePeriod} from "./basePeriod";
import {FIXED_PERIOD_TYPES} from "../../constants/fixed";
import {head} from "lodash";
import {FixedPeriodType} from "../periodTypes";

export class FixedPeriod extends BasePeriod {
    id: string;
    name: string;
    type: PeriodTypeInterface;
    start: DateTime;
    end: DateTime;
    interval: Interval;
    nested: boolean;

    constructor(interval: Interval, {type, nested}: { type: PeriodTypeInterface; nested?: boolean }) {
        super();
        this.start = interval.start.startOf('day');
        this.end = interval.end.endOf('day').minus({days: 1});
        this.type = type;
        this.interval = interval;
        this.id = this._generateId();
        this.name = this._generateName();
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

        }
    }

    private _getPreviousPeriod(): PeriodInterface | undefined {
        if (this.nested) {
            return;
        }
        const newInterval = Interval.before(this.interval.start, this.interval.toDuration().minus({day: 4}));
        return new FixedPeriod(newInterval, {type: this.type, nested: true}).get();
    }

    private _getNextPeriod(): PeriodInterface | undefined {
        if (this.nested) {
            return;
        }
        const newInterval = Interval.after(this.interval.end, this.interval.toDuration().minus({day: 4}));
        return new FixedPeriod(newInterval, {type: this.type, nested: true}).get();
    }

    private _generateId(): string {
        if (this.type.idGenerator) {
            return this.type.idGenerator(this);
        }
        return '';
    }

    private _generateName(): string {
        if (this.type.nameGenerator) {
            return this.type.nameGenerator(this);
        }
        return '';
    }

    static getById(id: string): BasePeriod {
        const periodTypeConfig = [...FIXED_PERIOD_TYPES].find((periodType: PeriodTypeInterface) => {
            if (periodType.regex) {
                return id.match(periodType.regex);
            }
        })
        if (!periodTypeConfig) {
            throw Error("Invalid/Unsupported Period id provided")
        }
        const year = parseInt(head(id.match(/(\d{4})/)) ?? '')
        if (year) {
            const periodType = new FixedPeriodType(periodTypeConfig, {year, preference: {allowFuturePeriods: true}})
            const periods = periodType.periods;

            const period = periods.find(period => period.id === id);
            if (!period) {
                throw Error("Invalid/Unsupported fixed Period id provided")
            }
            return period;
        }
        throw "Invalid/Unsupported Period id"
    }
}
