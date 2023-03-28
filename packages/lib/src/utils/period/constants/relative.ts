import i18n from "@dhis2/d2-i18n";
import {PeriodTypeCategory, PeriodTypeEnum} from "./index";
import {PeriodTypeInterface, RelativePeriodConfig} from "../interfaces";

const getDaysPeriodType = (): RelativePeriodConfig[] => [
    {id: "TODAY", name: i18n.t("Today")},
    {id: "YESTERDAY", name: i18n.t("Yesterday"), offset: 1},
    {id: "LAST_3_DAYS", name: i18n.t("Last 3 days"), span: 3},
    {id: "LAST_7_DAYS", name: i18n.t("Last 7 days"), span: 7},
    {id: "LAST_14_DAYS", name: i18n.t("Last 14 days"), span: 14},
    {id: "LAST_30_DAYS", name: i18n.t("Last 30 days"), span: 30},
    {id: "LAST_60_DAYS", name: i18n.t("Last 60 days"), span: 60},
    {id: "LAST_90_DAYS", name: i18n.t("Last 90 days"), span: 90},
    {id: "LAST_180_DAYS", name: i18n.t("Last 180 days"), span: 180},
];

const getWeeksPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_WEEK", name: i18n.t("This week")},
    {id: "LAST_WEEK", name: i18n.t("Last week"), offset: 1},
    {id: "LAST_4_WEEKS", name: i18n.t("Last 4 weeks"), span: 4},
    {id: "LAST_12_WEEKS", name: i18n.t("Last 12 weeks"), span: 12},
    {id: "LAST_52_WEEKS", name: i18n.t("Last 52 weeks"), span: 52},
    // {id: PeriodTypeEnum.WEEKS_THIS_YEAR, name: i18n.t("Weeks this year")},
];

const getBiWeeksPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_BIWEEK", name: i18n.t("This bi-week")},
    {id: "LAST_BIWEEK", name: i18n.t("Last bi-week"), offset: 1},
    {id: "LAST_4_BIWEEKS", name: i18n.t("Last 4 bi-weeks"), span: 4},
];

const getMonthsPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_MONTH", name: i18n.t("This month")},
    {id: "LAST_MONTH", name: i18n.t("Last month"), offset: 1},
    {id: "LAST_3_MONTHS", name: i18n.t("Last 3 months"), span: 3},
    {id: "LAST_6_MONTHS", name: i18n.t("Last 6 months"), span: 6},
    {id: "LAST_12_MONTHS", name: i18n.t("Last 12 months"), span: 12},
    // {
    //     id: "MONTHS_THIS_YEAR",
    //     name: i18n.t("Months this year"),
    // },
];

const getBiMonthsPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_BIMONTH", name: i18n.t("This bi-month")},
    {id: "LAST_BIMONTH", name: i18n.t("Last bi-month"), offset: 1},
    {
        id: "LAST_6_BIMONTHS",
        name: i18n.t("Last 6 bi-months"),
        span: 6
    },
    // {
    //     id: "BIMONTHS_THIS_YEAR",
    //     name: i18n.t("Bi-months this year"),
    // },
];

const getQuartersPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_QUARTER", name: i18n.t("This quarter")},
    {id: "LAST_QUARTER", name: i18n.t("Last quarter"), offset: 1},
    {id: "LAST_4_QUARTERS", name: i18n.t("Last 4 quarters"), span: 4},
    {
        id: "QUARTERS_THIS_YEAR",
        name: i18n.t("Quarters this year"),
        span: 4
    },
];

const getSixMonthsPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_SIX_MONTH", name: i18n.t("This six-month")},
    {id: "LAST_SIX_MONTH", name: i18n.t("Last six-month"), offset: 1},
    {
        id: "LAST_2_SIXMONTHS",
        name: i18n.t("Last 2 six-month"),
    },
];

const getFinancialYearsPeriodType = (): RelativePeriodConfig[] => [
    {
        id: "THIS_FINANCIAL_YEAR",
        name: i18n.t("This financial year"),
    },
    {
        id: "LAST_FINANCIAL_YEAR",
        name: i18n.t("Last financial year"),
        offset: 1
    },
    {
        id: "LAST_5_FINANCIAL_YEARS",
        name: i18n.t("Last 5 financial years"),
        offset: 5
    },
];

const getYearsPeriodType = (): RelativePeriodConfig[] => [
    {id: "THIS_YEAR", name: i18n.t("This year")},
    {id: "LAST_YEAR", name: i18n.t("Last year"), offset: 1},
    {id: "LAST_5_YEARS", name: i18n.t("Last 5 years"), offset: 5},
    {id: "LAST_10_YEARS", name: i18n.t("Last 10 years"), offset: 10},
];

export const RELATIVE_PERIOD_TYPES: PeriodTypeInterface[] = [
    {
        id: PeriodTypeEnum.DAILY,
        getPeriods: () => getDaysPeriodType(),
        name: i18n.t("Days"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "day"
    },
    {
        id: PeriodTypeEnum.WEEKLY,
        getPeriods: () => getWeeksPeriodType(),
        name: i18n.t("Weeks"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "week",
    },
    {
        id: PeriodTypeEnum.BIWEEKLY,
        getPeriods: () => getBiWeeksPeriodType(),
        type: PeriodTypeCategory.RELATIVE,
        name: i18n.t("Bi-weeks"),
        unit: "week",
        factor: 2
    },
    {
        id: PeriodTypeEnum.MONTHLY,
        getPeriods: () => getMonthsPeriodType(),
        name: i18n.t("Months"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "month",
    },
    {
        id: PeriodTypeEnum.BIMONTHLY,
        getPeriods: () => getBiMonthsPeriodType(),
        name: i18n.t("Bi-months"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "month",
        factor: 2
    },
    {
        id: PeriodTypeEnum.QUARTERLY,
        getPeriods: () => getQuartersPeriodType(),
        name: i18n.t("Quarters"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "quarter",
    },
    {
        id: PeriodTypeEnum.SIXMONTHLY,
        getPeriods: () => getSixMonthsPeriodType(),
        name: i18n.t("Six-months"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "quarter",
        factor: 2
    },
    {
        id: PeriodTypeEnum.FINANCIAL,
        getPeriods: () => getFinancialYearsPeriodType(),
        name: i18n.t("Financial Years"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "year"
    },
    {
        id: PeriodTypeEnum.YEARLY,
        getPeriods: () => getYearsPeriodType(),
        name: i18n.t("Years"),
        type: PeriodTypeCategory.RELATIVE,
        unit: "year"
    },
];
