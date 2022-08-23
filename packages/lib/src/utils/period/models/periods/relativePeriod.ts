import {PeriodInterface, PeriodTypeInterface} from "../../interfaces";
import {DateTime, Interval} from "luxon";
import {BasePeriod} from "./basePeriod";
import {FIXED_PERIOD_TYPES} from "../../constants/fixed";
import {RELATIVE_PERIOD_TYPES} from "../../constants/relative";

export class RelativePeriod extends BasePeriod {
    id: string;
    name: string;
    type: PeriodTypeInterface;
    start: DateTime;
    end: DateTime;
    interval: Interval;

    constructor({id, name}: { id: string; name: string }, type: PeriodTypeInterface) {
        super();
        this.id = id;
        this.name = name;
        this.type = type;
        this.start = DateTime.local();
        this.end = DateTime.local();
        this.interval = Interval.fromDateTimes(this.start, this.end);
    }

    get(): PeriodInterface | undefined {
        return {
            id: this.id,
            name: this.name,
            type: this.type.id,
            startDate: this.start,
            endDate: this.end,
            iso: this.interval.toISO(),
            interval: this.interval,
        }
    };

    static getById(id: string): RelativePeriod {
        const periodTypeConfig = [...FIXED_PERIOD_TYPES, ...RELATIVE_PERIOD_TYPES].find((periodType: PeriodTypeInterface) => {

            if (periodType.getPeriods) {
                return periodType.getPeriods().find(periodObject => periodObject.id === id)
            }
        })
        if (!periodTypeConfig) {
            throw Error("Invalid/Unsupported period id provided")
        }

        if (periodTypeConfig.getPeriods) {
            const periods = periodTypeConfig.getPeriods();
            const periodObject = periods.find(period => period.id === id);

            if (!periodObject) {
                throw Error("Invalid/Unsupported relative period id provided")
            }

            return new RelativePeriod(periodObject, periodTypeConfig)
        }

        throw Error("Invalid/Unsupported period id provided")
    }
}
