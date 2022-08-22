import {PeriodTypeEnum} from "./constants";
import {PeriodPreference} from "./interfaces";
import {PeriodType} from "./models/periodType";
import {DateTime, Settings} from "luxon";

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
        noOfPeriods: DateTime.fromObject({year}).weeksInWeekYear,
        description: "Weekly period type test",
    },
    {
        id: PeriodTypeEnum.BIWEEKLY,
        periodIdTest: /^([0-9]{4})BiW([0-9]{1,2})$/,
        periodNameTest: /Bi-Week ([0-9]+) ([0-9]{4})-([0-9]{2})-([0-9]{2}) - ([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        noOfPeriods: Math.ceil(DateTime.fromObject({year}).weeksInWeekYear / 2),
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
    }

]


describe("Fixed Period Test", () => {
    fixedPeriodsTests.forEach(test => {
        it(`${test.description}`, () => {
            const periodType = PeriodType.getFromId(test.id, {year, preference});
            if (!periodType) {
                throw new Error(`Period type ${test.id} not found`);
            }
            const periodIds = periodType.periods.map(period => period.id);
            const periodNames = periodType.periods.map(period => period.name);
            console.log(periodType.periods)

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

