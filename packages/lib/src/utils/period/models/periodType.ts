import {PeriodInterface, PeriodPreference, PeriodTypeInterface} from "../interfaces";
import {DateTime, Duration, Interval} from "luxon";
import {Period} from "./period";
import {compact, filter} from "lodash";
import {FIXED_PERIOD_TYPES} from "../constants";


export class PeriodType {
    config: PeriodTypeInterface;
    duration: Duration;
    id: string;
    year: number;
    start: DateTime;
    end: DateTime;

    constructor(config: PeriodTypeInterface, {
        year,
        start,
        end
    }: { year?: number, preference?: PeriodPreference, start?: DateTime, end?: DateTime }) {
        this.config = config;
        this.id = config.id;
        this.year = year ?? new Date().getFullYear();
        this.duration = Duration.fromObject({
            [config.unit]: config.factor ?? 1,
        });
        this.start = start ?? DateTime.fromObject({
            year: this.year - (config.rank >= 8 ? 9 : 0),
        }).startOf('year');
        this.end = end ?? DateTime.fromObject({year: this.year}).endOf('year');
    }

    private _generatePeriods(): PeriodInterface[] {
        const duration = this.duration;
        const config = this.config;
        let startDate = this.start;
        let endDate = this.end;
        if ([2, 3].includes(config.rank)) {
            startDate = startDate.startOf('week');
        }
        if (config.offset) {
            const unit = this.config.offset?.unit ?? this.config.unit;
            startDate = startDate.plus({[unit]: config.offset.value});
            endDate = endDate.plus({[unit]: config.offset.value});
        }
        const intervals = filter(Interval.fromDateTimes(startDate, endDate).splitBy(duration), (interval: Interval) => {
            return Interval.fromDateTimes(this.start, endDate).engulfs(interval);
        });
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
