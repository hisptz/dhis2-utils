import {PeriodPreference, PeriodTypeInterface} from "../../interfaces";
import {DateTime, Duration} from "luxon";
import {BasePeriod} from "../periods/basePeriod";


export class BasePeriodType {
    config: PeriodTypeInterface;
    duration: Duration;
    id: string;
    year: number;
    start: DateTime;
    end: DateTime;
    preference?: PeriodPreference;

    constructor(config: PeriodTypeInterface, {
        year,
        start,
        end, preference
    }: { year?: number, preference?: PeriodPreference, start?: DateTime, end?: DateTime }) {
        this.config = config;
        this.id = config.id;
        this.year = year ?? new Date().getFullYear();
        this.duration = Duration.fromObject({
            [config.unit]: config.factor ?? 1,
        });
        this.start = start ?? DateTime.fromObject({
            year: this.year - ((config.rank ?? -1) >= 8 ? 9 : 0),
        }).startOf('year');
        this.end = end ?? DateTime.fromObject({year: this.year}).endOf('year');
        this.preference = preference;

    }

    get periods(): BasePeriod[] {
        return [];
    }
}


