import {PeriodPreference} from "../../interfaces";
import {DateTime, Settings} from "luxon";
import {PeriodTypeEnum} from "../../constants";
import {FixedPeriodType} from "./fixedPeriodType";
import {FixedPeriod} from "../periods/fixedPeriod";

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
        description: "Daily Period type test",
    },
    {
        id: PeriodTypeEnum.WEEKLY,
        periodIdTest: /^([0-9]{4})()W([0-9]{1,2})$/,
        periodNameTest: /Week ([0-9]+) ([0-9]{4})-([0-9]{2})-([0-9]{2}) - ([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        noOfPeriods: 52,
        description: "Weekly Period type test",
    },
    {
        id: PeriodTypeEnum.BIWEEKLY,
        periodIdTest: /^([0-9]{4})BiW([0-9]{1,2})$/,
        periodNameTest: /Bi-Week ([0-9]+) ([0-9]{4})-([0-9]{2})-([0-9]{2}) - ([0-9]{4})-([0-9]{2})-([0-9]{2})/,
        noOfPeriods: Math.ceil(52 / 2),
        description: "Bi-Weekly Period type test",
    },
    {
        id: PeriodTypeEnum.MONTHLY,
        periodIdTest: /^([0-9]{4})([0-9]{2})$/,
        periodNameTest: /^([A-Za-z])+ ([0-9]{4})$/,
        noOfPeriods: 12,
        description: "Monthly Period type test",
    },
    {
        id: PeriodTypeEnum.BIMONTHLY,
        periodIdTest: /^([0-9]{4})([0-9]{2})B$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 6,
        description: "Bi-Monthly Period type test",
    },
    {
        id: PeriodTypeEnum.QUARTERLY,
        periodIdTest: /^([0-9]{4})Q([1234])$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 4,
        description: "Quarterly Period type test",
    },
    {
        id: PeriodTypeEnum.SIXMONTHLY,
        periodIdTest: /^([0-9]{4})S([12])$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 2,
        description: "Six-Monthly Period type test",
    },
    {
        id: PeriodTypeEnum.SIXMONTHLYAPR,
        periodIdTest: /^([0-9]{4})AprilS([12])$/,
        periodNameTest: /([A-za-z]+) - ([A-za-z]+) (\d{4})/,
        noOfPeriods: 2,
        description: "Six-Monthly Period type test",
    },
    {
        id: PeriodTypeEnum.YEARLY,
        periodIdTest: /^([0-9]{4})$/,
        periodNameTest: /(\d{4})/,
        noOfPeriods: 10,
        description: "Yearly Period type test",
    },
    {
        id: PeriodTypeEnum.FYAPR,
        description: "Financial Year April Period type test",
        periodIdTest: /^([0-9]{4})April$/,
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

const periodIdTest = [
    {
        test: "20220203",
        value: {
            id: "20220203",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 3,
                month: 2
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 3,
                month: 2
            }).endOf('day')
        }
    },
    {
        test: "2022W1",
        value: {
            id: "2022W1",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 3,
                month: 1
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 9,
                month: 1
            }).endOf('day')
        }
    },
    {
        test: "2022WedW1",
        value: {
            id: "2022WedW1",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 5,
                month: 1
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 11,
                month: 1
            }).endOf('day')
        }
    },
    {
        test: "2022ThuW1",
        value: {
            id: "2022ThuW1",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 6,
                month: 1
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 12,
                month: 1
            }).endOf('day')
        }
    },
    {
        test: "2022SatW1",
        value: {
            id: "2022SatW1",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 8,
                month: 1
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 14,
                month: 1
            }).endOf('day')
        }
    },
    {
        test: "2022SunW1",
        value: {
            id: "2022SunW1",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 9,
                month: 1
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 15,
                month: 1
            }).endOf('day')
        }
    },
    {
        test: "2022BiW1",
        value: {
            id: "2022BiW1",
            startDate: DateTime.fromObject({
                year: 2022,
                day: 3,
                month: 1
            }).startOf('day'),
            endDate: DateTime.fromObject({
                year: 2022,
                day: 16,
                month: 1
            }).endOf('day')
        }
    },
]


describe("Fixed Period Test", () => {
    fixedPeriodsTests.forEach(test => {
        it(`${test.description}`, () => {
            const periodType = FixedPeriodType.getFromId(test.id, {year, preference});
            const periods = periodType.periods;
            if (!periodType) {
                throw new Error(`Period type ${test.id} not found`);
            }
            const periodIds = periods.map(period => period.id);
            const periodNames = periods.map(period => period.name);
            expect(periodType.periods.length).toBe(test.noOfPeriods);
            periodIds.forEach(periodId => {
                expect((periodId.match(test.periodIdTest)?.length ?? 0) > 1).toBe(true);
            });
            periodNames.forEach(periodName => {
                expect((periodName.match(test.periodNameTest)?.length ?? 0) > 1).toBe(true);
            });
        });
    });
})

describe("Fixed Weekly Periods With Offsets Test", () => {
    fixedPeriodsWithOffsets.forEach(test => {
        const periodType = FixedPeriodType.getFromId(test.id, {year, preference});
        const periods = periodType.periods;
        periods.forEach(period => {
            expect(period.start.weekday).toBe(test.weekDayStart);
        })
    })
})

describe("Get Period by id tests", () => {
    periodIdTest.forEach((test) => {
        it(`should return period with id ${test.value.id}`, () => {
            const period = FixedPeriod.getById(test.test);
            expect(period.id).toBe(test.value.id);
            expect(period.start.toMillis()).toBe(test.value.startDate.toMillis())
            expect(period.end.toMillis()).toBe(test.value.endDate.toMillis())
        })
    })
})
