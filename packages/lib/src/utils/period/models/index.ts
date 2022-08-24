import {FIXED_PERIOD_TYPES} from "../constants/fixed";
import {BasePeriodType} from "./periodTypes/basePeriodType";
import {PeriodPreference, PeriodTypeCategory} from "../interfaces";
import {RELATIVE_PERIOD_TYPES} from "../constants/relative";
import {FixedPeriodType} from "./periodTypes/fixedPeriodType";
import {RelativePeriodType} from "./periodTypes/relativePeriodType";
import {BasePeriod} from "./periods/basePeriod";
import {FixedPeriod} from "./periods/fixedPeriod";
import {RelativePeriod} from "./periods/relativePeriod";
import {isEmpty} from "lodash";


abstract class PeriodCategory {
    year: number;
    preference?: PeriodPreference = {allowFuturePeriods: false};

    constructor(year: number, preference?: PeriodPreference) {
        this.year = year;
        this.preference = preference;
    }

    abstract get periodTypes(): BasePeriodType[];

}

export class FixedPeriods extends PeriodCategory {
    get periodTypes(): BasePeriodType[] {
        return FIXED_PERIOD_TYPES.map(periodTypeConfig => new FixedPeriodType(periodTypeConfig, {
            year: this.year,
            preference: this.preference
        }))
    }
}
export class RelativePeriods extends PeriodCategory {
    get periodTypes(): BasePeriodType[] {
        return RELATIVE_PERIOD_TYPES.map(periodTypeConfig => new RelativePeriodType(periodTypeConfig, this.preference ?? {allowFuturePeriods: false}))
    }
}

export class PeriodUtility {
    year: number = new Date().getFullYear();
    preference: PeriodPreference = {
        allowFuturePeriods: false,
    }
    category?: PeriodCategory;

    constructor() {
    }

    get periodTypes(): BasePeriodType[] {
        return this.category?.periodTypes ?? [];
    }

    static fromObject({
                          year,
                          preference,
                          category
                      }: { year: number, preference?: PeriodPreference; category: PeriodTypeCategory }): PeriodUtility {
        const utility = new PeriodUtility();
        utility.setYear(year);
        utility.setCategory(category);
        if (preference) {
            utility.setPreference(preference);
        }
        return utility;
    }

    setCategory(category: PeriodTypeCategory): PeriodUtility {
        switch (category) {
            case PeriodTypeCategory.FIXED:
                this.category = new FixedPeriods(this.year, this.preference);
                break;
            case PeriodTypeCategory.RELATIVE:
                this.category = new RelativePeriods(this.year, this.preference);
        }
        return this;
    }

    setYear(year: number): PeriodUtility {
        this.year = year;
        return this;
    }

    setPreference(preference: PeriodPreference): PeriodUtility {
        this.preference = preference;
        return this;
    }

    getPeriodType(periodTypeId: string): BasePeriodType | undefined {
        return this.periodTypes.find(type => type.id === periodTypeId)
    }

    static getPeriodCategoryFromPeriodId(id: string): PeriodTypeCategory {
        if (!isEmpty(id.match(/(\d{4})/))) {
            return PeriodTypeCategory.FIXED;
        } else {
            return PeriodTypeCategory.RELATIVE;
        }
    }

    static getPeriodById(id: string): BasePeriod {
        const periodCategory = this.getPeriodCategoryFromPeriodId(id);
        switch (periodCategory) {
            case PeriodTypeCategory.FIXED:
                return FixedPeriod.getById(id);
            case PeriodTypeCategory.RELATIVE:
                return RelativePeriod.getById(id);
            default:
                throw "Invalid/Unsupported period id"
        }

    }
}


export * from "./periods";
export * from "./periodTypes";
