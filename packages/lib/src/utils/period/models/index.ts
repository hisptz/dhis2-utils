import {FIXED_PERIOD_TYPES} from "../constants";
import {PeriodType} from "./periodType";
import {PeriodPreference} from "../interfaces";


abstract class PeriodCategory {
    year: number;
    preference?: PeriodPreference;

    protected constructor(year: number, preference?: PeriodPreference) {
        this.year = year;
        this.preference = preference;
    }

    abstract get periodTypes(): PeriodType[];

}


export class FixedPeriods extends PeriodCategory {
    get periodTypes(): PeriodType[] {
        return FIXED_PERIOD_TYPES.map(periodTypeConfig => new PeriodType(periodTypeConfig, {
            year: this.year,
            preference: this.preference
        }))
    }
}
