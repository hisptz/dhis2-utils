import {PeriodInterface, PeriodTypeInterface, RelativePeriodConfig} from "../../interfaces";
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

    constructor({id, name, offset = 0, span}: RelativePeriodConfig, type: PeriodTypeInterface) {
        super();
        const startDate = DateTime.local().startOf(type.unit).minus({[type.unit]: offset}).minus({[type.unit]: span}).minus({[type.unit]: type.factor});
        const endDate = DateTime.local().endOf(type.unit).minus({[type.unit]: offset});
        const interval = Interval.fromDateTimes(startDate, endDate);

        this.id = id;
        this.name = name;
        this.type = type;
        this.start = startDate;
        this.end = endDate;
        this.interval = interval;
    }

    static getById(id: string): RelativePeriod {
        const periodTypeConfig = [...FIXED_PERIOD_TYPES, ...RELATIVE_PERIOD_TYPES].find((periodType: PeriodTypeInterface) => {

            if (periodType.getPeriods) {
                return periodType.getPeriods().find(periodObject => periodObject.id === id);
            }
        });
        if (!periodTypeConfig) {
            throw Error("Invalid/Unsupported Period id provided");
        }

        if (periodTypeConfig.getPeriods) {
            const periods = periodTypeConfig.getPeriods();
            const periodObject = periods.find(period => period.id === id);

            if (!periodObject) {
                throw Error("Invalid/Unsupported relative Period id provided");
            }

            return new RelativePeriod(periodObject, periodTypeConfig);
        }

        throw Error("Invalid/Unsupported Period id provided");
    }

    get(): PeriodInterface | undefined {
        return {
            id: this.id,
            name: this.name,
            type: this.type.id,
            startDate: this.start.toJSDate(),
            endDate: this.end.toJSDate(),
            start: this.start,
            end: this.end,
            iso: this.interval.toISO(),
            interval: this.interval,
        };
    };
}
