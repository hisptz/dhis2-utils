import {PeriodTypeEnum} from "./constants";
import {PeriodPreference} from "./interfaces";
import {PeriodType} from "./models/periodType";
import {Settings} from "luxon";

const year = 2021;

Settings.defaultLocale = 'en-US';
const preference: PeriodPreference = {
    allowFuturePeriods: true
}

const fixedPeriodsTests = [
    {
        id: PeriodTypeEnum.DAILY,
        periodIdTest: /^([0-9]{4})([0-9]{2})([0-9]{2})$/,
        periodNameTest: /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        noOfPeriods: 365,
        description: "Daily period type test",
    },
    {
        id: PeriodTypeEnum.WEEKLY,
        periodIdTest: /^([0-9]{4})()W([0-9]{1,2})$/,
        periodNameTest: /Week ([0-9]+) ([0-9]{4})-([0-9]{2})-([0-9]{2}) - ([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        noOfPeriods: 52,
        description: "Weekly period type test",
    },
    {
        id: PeriodTypeEnum.BIWEEKLY,
        periodIdTest: /^([0-9]{4})BiW([0-9]{1,2})$/,
        periodNameTest: /Bi-Week ([0-9]+) ([0-9]{4})-([0-9]{2})-([0-9]{2}) - ([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        noOfPeriods: Math.ceil(52 / 2),
        description: "Bi-Weekly period type test",
    },
    {
        id: PeriodTypeEnum.MONTHLY,
        periodIdTest: /^([0-9]{4})([0-9]{2})$/,
        periodNameTest: /^([A-Za-z])+ ([0-9]{4})$/,
        noOfPeriods: 12,
        description: "Monthly period type test",
    },
    {
        id: PeriodTypeEnum.BIMONTHLY,
        periodIdTest: /^([0-9]{4})([0-9]{2})B$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 6,
        description: "Bi-Monthly period type test",
    },
    {
        id: PeriodTypeEnum.QUARTERLY,
        periodIdTest: /^([0-9]{4})Q([1234])$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 4,
        description: "Quarterly period type test",
    },
    {
        id: PeriodTypeEnum.SIXMONTHLY,
        periodIdTest: /^([0-9]{4})S([12])$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 2,
        description: "Six-Monthly period type test",
    },
    {
        id: PeriodTypeEnum.SIXMONTHLYAPR,
        periodIdTest: /^([0-9]{4})S([12])$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 2,
        description: "Six-Monthly period type test",
    },
    {
        id: PeriodTypeEnum.YEARLY,
        periodIdTest: /^([0-9]{4})$/,
        periodNameTest: /(\d{4})/,
        noOfPeriods: 10,
        description: "Yearly period type test",
    },
    {
        id: PeriodTypeEnum.FYAPR,
        description: "Financial Year April period type test",
        periodIdTest:/^([0-9]{4})April$/,
        periodNameTest: /([A-za-z]+) (\d{4}) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 10,
    }


]

const fixedPeriodsWithOffsets = [
    {
        id: PeriodTypeEnum.WEEKLYWED,
        weekDayStart: 3,
        description: "Starts on a wednesday",
    },
    {
        id: PeriodTypeEnum.WEEKLYTHU,
        weekDayStart: 4,
        description: "Starts on a thursday",
    },
    {
        id: PeriodTypeEnum.WEEKLYSAT,
        weekDayStart: 6,
        description: "Starts on a saturday",
    },
    {
        id: PeriodTypeEnum.WEEKLYSUN,
        weekDayStart: 7,
        description: "Starts on a sunday",
    }
]


describe("Fixed Period Test", () => {
    fixedPeriodsTests.forEach(test => {
        it(`${test.description}`, () => {
            const periodType = PeriodType.getFromId(test.id, {year, preference});
            const periods = periodType.periods;
            if (!periodType) {
                throw new Error(`Period type ${test.id} not found`);
            }
            const periodIds = periods.map(period => period.id);
            const periodNames = periods.map(period => period.name);
            expect(periodType.periods.length).toBe(test.noOfPeriods);
            periodIds.forEach(periodId => {
                expect(periodId.match(test.periodIdTest)).toBeTruthy();
            });
            periodNames.forEach(periodName => {
                expect(periodName.match(test.periodNameTest)).toBeTruthy();
            });
        });
    });
})

describe("Fixed Weekly Periods With Offsets Test", () => {
    fixedPeriodsWithOffsets.forEach(test => {
        const periodType = PeriodType.getFromId(test.id, {year, preference});
        const periods = periodType.periods;
        periods.forEach(period => {
            // expect(period.startDate.weekday).toBe(test.weekDayStart);
        })
    })
})

