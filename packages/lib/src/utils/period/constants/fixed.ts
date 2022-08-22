import {PeriodTypeInterface, PeriodTypeTypes} from "../interfaces";
import i18n from '@dhis2/d2-i18n';
import {padStart} from "lodash";

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


export const FIXED_PERIOD_TYPES: PeriodTypeInterface[] = [
    {
        id: PeriodTypeEnum.DAILY,
        name: i18n.t("Daily"),
        type: PeriodTypeTypes.FIXED,
        unit: "day",
        regex: /^([0-9]{4})([0-9]{2})([0-9]{2})$/, // YYYYMMDD
        rank: 1,
        idGenerator: (interval) => `${interval.start.toFormat('yyyyMMdd')}`,
        nameGenerator: (interval) => `${interval.start.toFormat('yyyy-MM-dd')}`,
    },
    {
        id: PeriodTypeEnum.WEEKLY,
        name: i18n.t("Weekly"),
        type: PeriodTypeTypes.FIXED,
        unit: "week",
        regex: /^([0-9]{4})()W([0-9]{1,2})$/, // YYYY"W"[1-53]
        rank: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}W${interval.start.weekNumber}`,
        nameGenerator: (interval) => `${i18n.t("Week")} ${interval.start.weekNumber} ${interval.start.toFormat(`yyyy-MM-dd`)} - ${interval.end.toFormat(`yyyy-MM-dd`)}`,
    },
    {
        id: PeriodTypeEnum.WEEKLYWED,
        name: i18n.t("Weekly (Wednesday)"),
        type: PeriodTypeTypes.FIXED,
        unit: "week",
        regex: /^([0-9]{4})(Wed)W([0-9]{1,2})$/, // YYYY"WedW"[1-53]
        rank: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}WedW${interval.start.weekNumber}`,
        nameGenerator: (interval) => `${i18n.t("Week")} ${interval.start.weekNumber} ${interval.start.toFormat(`yyyy-MM-dd`)} - ${interval.end.toFormat(`yyyy-MM-dd`)}`,
    },
    {
        id: PeriodTypeEnum.WEEKLYTHU,
        name: i18n.t("Weekly (Thursday)"),
        type: PeriodTypeTypes.FIXED,
        unit: "week",
        regex: /^([0-9]{4})(Thu)W([0-9]{1,2})$/, // YYYY"ThuW"[1-53]
        rank: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}ThuW${interval.start.weekNumber}`,
        nameGenerator: (interval) => `${i18n.t("Week")} ${interval.start.weekNumber} ${interval.start.toFormat(`yyyy-MM-dd`)} - ${interval.end.toFormat(`yyyy-MM-dd`)}`,
    },
    {
        id: PeriodTypeEnum.WEEKLYSAT,
        name: i18n.t("Weekly (Saturday)"),
        type: PeriodTypeTypes.FIXED,
        unit: "week",
        regex: /^([0-9]{4})(Sat)W([0-9]{1,2})$/, // YYYY"SatW"[1-53]
        rank: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}SatW${interval.start.weekNumber}`,
        nameGenerator: (interval) => `${i18n.t("Week")} ${interval.start.weekNumber} ${interval.start.toFormat(`yyyy-MM-dd`)} - ${interval.end.toFormat(`yyyy-MM-dd`)}`,
    },
    {
        id: PeriodTypeEnum.WEEKLYSUN,
        name: i18n.t("Weekly (Sunday)"),
        type: PeriodTypeTypes.FIXED,
        unit: "week",
        regex: /^([0-9]{4})(Sun)W([0-9]{1,2})$/, // YYYY"SunW"[1-53]
        rank: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}SunW${interval.start.weekNumber}`,
        nameGenerator: (interval) => `${i18n.t("Week")} ${interval.start.weekNumber} ${interval.start.toFormat(`yyyy-MM-dd`)} - ${interval.end.toFormat(`yyyy-MM-dd`)}`,
    },
    {
        id: PeriodTypeEnum.BIWEEKLY,
        name: i18n.t("Biweekly"),
        type: PeriodTypeTypes.FIXED,
        unit: "week",
        regex: /^([0-9]{4})BiW([0-9]{1,2})$/, // YYYY"BiW"[1-27]
        rank: 3,
        factor: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}BiW${Math.floor(interval.start.weekNumber / 2)}`,
        nameGenerator: (interval) => `${i18n.t("Bi-Week")} ${interval.start.weekNumber} ${interval.start.toFormat(`yyyy-MM-dd`)} - ${interval.end.toFormat(`yyyy-MM-dd`)}`,
    },
    {
        id: PeriodTypeEnum.MONTHLY,
        name: i18n.t("Monthly"),
        type: PeriodTypeTypes.FIXED,
        unit: "month",
        regex: /^([0-9]{4})([0-9]{2})$/, // YYYYMM,
        rank: 4,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}${padStart(interval.start.month.toString(), 2, '0')}`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MMMM yyyy`)}`
    },
    {
        id: PeriodTypeEnum.BIMONTHLY,
        name: i18n.t("Bi-monthly"),
        type: PeriodTypeTypes.FIXED,
        unit: "month",
        regex: /^([0-9]{4})([0-9]{2})B$/, // YYYY0[1-6]"B"
        rank: 5,
        factor: 2,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}${padStart(interval.start.month.toString(), 2, '0')}B`,
        nameGenerator: (interval) => `${interval.start.monthLong} - ${interval.end.monthLong} ${interval.start.toFormat(`yyyy`)}`
    },
    {
        id: PeriodTypeEnum.QUARTERLY,
        name: i18n.t("Quarterly"),
        type: PeriodTypeTypes.FIXED,
        unit: "quarter",
        regex: /^([0-9]{4})Q([1234])$/, // YYYY"Q"[1-4]
        rank: 6,
        idGenerator: (interval) => `${interval.start.toFormat('yyyy')}Q${interval.start.quarter}`,
        nameGenerator: (interval) => `${i18n.t("Quarter")} ${interval.start.quarter} ${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`
    },
    {
        id: PeriodTypeEnum.SIXMONTHLY,
        name: i18n.t("Six-monthly"),
        type: PeriodTypeTypes.FIXED,
        unit: "quarter",
        regex: /^([0-9]{4})S([12])$/, // YYYY"S"[1/2]
        rank: 7,
        factor: 2,
        idGenerator: (interval) => `${interval.start.year}S${Math.floor(interval.start.quarter / 2)}`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`,
    },
    {
        id: PeriodTypeEnum.SIXMONTHLYAPR,
        name: i18n.t("Six-monthly (April)"),
        type: PeriodTypeTypes.FIXED,
        unit: "quarter",
        regex: /^([0-9]{4})AprilS([12])$/, // YYYY"AprilS"[1/2]
        rank: 7,
        factor: 2,
        idGenerator: (interval) => `${interval.start.year}AprilS${Math.floor(interval.start.quarter / 2)}`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`,
    },
    {
        id: PeriodTypeEnum.YEARLY,
        name: i18n.t("Yearly"),
        type: PeriodTypeTypes.FIXED,
        unit: "year",
        regex: /^([0-9]{4})$/, // YYYY
        rank: 8,
        idGenerator: (interval) => `${interval.start.year}`,
        nameGenerator: (interval) => `${interval.start.year}`,
    },
    {
        id: PeriodTypeEnum.FYNOV,
        name: i18n.t("Financial year (November)"),
        type: PeriodTypeTypes.FIXED,
        unit: "year",
        regex: /^([0-9]{4})Nov$/, // YYYY"Nov"
        rank: 8, idGenerator: (interval) => `${interval.start.year}Nov`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`,
    },
    {
        id: PeriodTypeEnum.FYOCT,
        name: i18n.t("Financial year (October)"),
        type: PeriodTypeTypes.FIXED,
        unit: "year",
        regex: /^([0-9]{4})Oct$/, // YYYY"Oct"
        rank: 8,
        idGenerator: (interval) => `${interval.start.year}Oct`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`,
    },
    {
        id: PeriodTypeEnum.FYJUL,
        name: i18n.t("Financial year (July)"),
        type: PeriodTypeTypes.FIXED,
        unit: "year",
        regex: /^([0-9]{4})July$/, // YYYY"July"
        rank: 8,
        idGenerator: (interval) => `${interval.start.year}July`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`,
    },
    {
        id: PeriodTypeEnum.FYAPR,
        name: i18n.t("Financial year (April)"),
        type: PeriodTypeTypes.FIXED,
        unit: "year",
        regex: /^([0-9]{4})April$/, // YYYY"April",
        rank: 8,
        idGenerator: (interval) => `${interval.start.year}April`,
        nameGenerator: (interval) => `${interval.start.toFormat(`MM yyyy`)} - ${interval.end.toFormat(`MM yyyy`)}`,
    }
]
