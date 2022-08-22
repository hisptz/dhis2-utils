import {DateInput, DateTime, Duration, Interval} from "luxon";
import {PeriodInterface, PeriodTypeInterface} from "../interfaces";
import {PeriodType} from "./periodType";


export class Period {
    id: string;
    name: string;
    type: PeriodTypeInterface;
    start: DateTime;
    end: DateTime;
    interval: Interval;

    get(): PeriodInterface | undefined {
        return this._generatePeriod();
    }

    private _generatePeriod(): PeriodInterface | undefined {
        return {
            id: this.id,
            type: this.type.id,
            name: this.name,
            endDate: this.end,
            interval: this.interval,
            iso: this.interval.toISO(),
            next: undefined,
            previous: undefined,
            startDate: this.start,

        }
    }

    private _getPreviousPeriod(): PeriodInterface | undefined {
        return;
    }

    private _getNextPeriod(): PeriodInterface | undefined {
        return;
    }

    private _generateId(): string {
        return this.type.idGenerator(this);
    }

    private _generateName(): string {
        return this.type.nameGenerator(this);
    }

    constructor(interval: Interval, {type}: { type: PeriodTypeInterface }) {
        this.start = interval.start.startOf('day');
        this.end = interval.end.endOf('day').minus({days: 1});
        this.type = type;
        this.interval = interval;
        this.id = this._generateId();
        this.name = this._generateName();
    }
}
