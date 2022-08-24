import {BasePeriod} from "../periods/basePeriod";
import {compact, filter} from "lodash";
import {Interval} from "luxon";
import {PeriodPreference} from "../../interfaces";
import {FIXED_PERIOD_TYPES} from "../../constants/fixed";
import {BasePeriodType} from "./basePeriodType";
import {FixedPeriod} from "../periods/fixedPeriod";

export class FixedPeriodType extends BasePeriodType {

    get periods(): BasePeriod[] {
        return this._generateFixedPeriods();
    }

    static getFromId(id: string, preference: { year?: number, preference?: PeriodPreference }): FixedPeriodType {
        const config = FIXED_PERIOD_TYPES.find(periodType => periodType.id === id);
        if (!config) {
            throw new Error(`Period type with id ${id} not found`);
        }
        return new FixedPeriodType(config, preference);
    }

    private _generateFixedPeriods(): BasePeriod[] {
        const duration = this.duration;
        const config = this.config;
        let startDate = this.start;
        let endDate = this.end;
        if ([2, 3].includes(config.rank ?? -1)) {
            //The code below offsets the start date to start on the start of a week (default: Monday), only applied to weekly periods
            startDate = startDate.plus({day: (7 - startDate.weekday) + 1});
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
            return new FixedPeriod(interval, {type: this.config})
        }));
    }


}
