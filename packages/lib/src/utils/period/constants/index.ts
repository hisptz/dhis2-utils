/**
 * This contains list of currently supported Period types
 * */
export enum PeriodTypeEnum {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    WEEKLYWED = 'WEEKLYWED',
    WEEKLYTHU = 'WEEKLYTHU',
    WEEKLYSAT = 'WEEKLYSAT',
    WEEKLYSUN = 'WEEKLYSUN',
    WEEKS_THIS_YEAR = 'WEEKS_THIS_YEAR',
    BIWEEKLY = 'BIWEEKLY',
    MONTHLY = 'MONTHLY',
    BIMONTHLY = 'BIMONTHLY',
    QUARTERLY = 'QUARTERLY',
    SIXMONTHLY = 'SIXMONTHLY',
    SIXMONTHLYAPR = 'SIXMONTHLYAPR',
    YEARLY = 'YEARLY',
    FINANCIAL = 'FINANCIAL',
    FYNOV = 'FYNOV',
    FYOCT = 'FYOCT',
    FYJUL = 'FYJUL',
    FYAPR = 'FYAPR',
}

/**
 * Categories of periods, currently supports
 - Fixed
 - Relative
 * */
export enum PeriodTypeCategory {
    FIXED = 'FIXED',
    RELATIVE = 'RELATIVE',
}

