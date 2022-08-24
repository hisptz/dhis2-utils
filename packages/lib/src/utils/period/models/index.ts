import {FIXED_PERIOD_TYPES} from "../constants/fixed";
import {BasePeriodType, FixedPeriodType, RelativePeriodType} from "./periodTypes";
import {PeriodPreference, PeriodTypeCategory} from "../interfaces";
import {RELATIVE_PERIOD_TYPES} from "../constants/relative";
import {BasePeriod, FixedPeriod, RelativePeriod} from "./periods";
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


/**
 * This is the main class in period utility. To use it, create an object through the constructor, then set the year and preference if any
 * */
export class PeriodUtility {
    year: number = new Date().getFullYear();
    preference: PeriodPreference = {
        allowFuturePeriods: false,
    }
    category?: PeriodCategory;

    constructor() {
    }

    /**
     * Gets the all period types within the specified category
     * @returns [@link(BasePeriodType[])]
     * */
    get periodTypes(): BasePeriodType[] {
        return this.category?.periodTypes ?? [];
    }

    /**
     * Instantiates this class with an object containing year, category, and preference. Can be used instead of the respective setters.
     * @param optionObject - an object with year, preference, and category
     *@returns [@link(PeriodUtility)]
     * */
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

    /**
     * Gets the period category from id
     * @param periodId
     * @return [@link(PeriodTypeCategory)]
     *
     * */
    static getPeriodCategoryFromPeriodId(id: string): PeriodTypeCategory {
        if (!isEmpty(id.match(/(\d{4})/))) {
            return PeriodTypeCategory.FIXED;
        } else {
            return PeriodTypeCategory.RELATIVE;
        }
    }

    /**
     * Get a period from its id
     * @param id - period id
     * @return [@link(BasePeriod)]
     *
     * */
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

    /**
     * Sets the period category
     * @param category
     * @return [@link(PeriodUtility)]
     *
     * */
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

    /**
     * Sets the period year
     * @param year
     * @return [@link(PeriodUtility)]
     *
     * */
    setYear(year: number): PeriodUtility {
        this.year = year;
        return this;
    }

    /**
     * Sets the period preferences
     * @param preference
     * @return [@link(PeriodUtility)]
     *
     * */
    setPreference(preference: PeriodPreference): PeriodUtility {
        this.preference = preference;
        return this;
    }

    /**
     * Sets the period category
     * @param periodTypeId
     * @return [@link(BasePeriodType)]
     *
     * */
    getPeriodType(periodTypeId: string): BasePeriodType | undefined {
        return this.periodTypes.find(type => type.id === periodTypeId)
    }
}

export * from "./periods";
export * from "./periodTypes";
