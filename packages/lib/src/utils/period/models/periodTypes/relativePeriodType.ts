import {BasePeriod, RelativePeriod} from "../periods";
import {compact} from "lodash";
import {PeriodPreference, PeriodTypeInterface} from "../../interfaces";
import {RELATIVE_PERIOD_TYPES} from "../../constants/relative";
import {BasePeriodType} from "./basePeriodType";

export class RelativePeriodType extends BasePeriodType {

    constructor(config: PeriodTypeInterface, preference: PeriodPreference) {

        const updateOptions = {
            preference,
            year: new Date().getFullYear(),
        }
        super(config, updateOptions);
    }

    get periods(): BasePeriod[] {
        return this._getRelativePeriods();
    }

    static getFromId(id: string, preference: PeriodPreference): BasePeriodType {
        const config = RELATIVE_PERIOD_TYPES.find(periodType => periodType.id === id);
        if (!config) {
            throw new Error(`Period type with id ${id} not found`);
        }
        return new RelativePeriodType(config, preference);
    }

    private _getRelativePeriods(): BasePeriod[] {
        if (this.config.getPeriods) {
            return compact(this.config.getPeriods().map(period => new RelativePeriod(period, this.config)));
        }
        return [];
    }

}
