import {PeriodPreference, PeriodInterface, PeriodTypeInterface} from "../interfaces";
import {DateInput, DateTime, Duration, DurationLike, DurationLikeObject, Interval} from "luxon";
import {Period} from "./period";
import {compact} from "lodash";
import {FIXED_PERIOD_TYPES} from "../constants";


export class PeriodType {
    config: PeriodTypeInterface;
    duration: Duration;
    id: string;
    year: number;

    constructor(config: PeriodTypeInterface, {year}: { year?: number, preference?: PeriodPreference }) {
        this.config = config;
        this.id = config.id;
        this.year = year ?? new Date().getFullYear();
        this.duration = Duration.fromObject({
            [config.unit]: config.factor ?? 1,
        });
    }

    private _generatePeriods(): PeriodInterface[] {
        const duration = this.duration;
        const start = DateTime.fromObject({year: this.year}).startOf('year');
        const end = DateTime.fromObject({year: this.year}).endOf('year');
        const intervals = Interval.fromDateTimes(start, end).splitBy(duration);
        return compact(intervals.map(interval => {
            return new Period(interval, {type: this.config}).get()
        }));
    }

    get periods(): PeriodInterface[] {
        return this._generatePeriods();
    }

    static getFromId(id: string, preference: { year?: number, preference?: PeriodPreference }): PeriodType {
        const config = FIXED_PERIOD_TYPES.find(periodType => periodType.id === id);
        if (!config) {
            throw new Error(`Period type with id ${id} not found`);
        }
        return new PeriodType(config, preference);
    }
}
