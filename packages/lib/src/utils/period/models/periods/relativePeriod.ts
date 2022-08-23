import {PeriodInterface, PeriodTypeInterface} from "../../interfaces";
import {DateTime, Interval} from "luxon";
import {BasePeriod} from "./basePeriod";

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

}
