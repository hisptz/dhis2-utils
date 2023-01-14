import {PeriodUtility} from "./models";
import {PeriodTypeCategory, PeriodTypeEnum} from "./constants";
import {DateTime} from "luxon";


describe("Instantiate Period utility class for fixed periods", () => {
    const periodUtility = PeriodUtility.fromObject({
        year: 2021,
        preference: {
            allowFuturePeriods: true
        },
        category: PeriodTypeCategory.FIXED
    });
    it("should have 17 fixed periods", () => {
        expect(periodUtility.periodTypes.length).toBe(17)
    })
})
describe("Instantiate Period utility class for relative periods", () => {
    const periodUtility = PeriodUtility.fromObject({
        year: 2021,
        preference: {
            allowFuturePeriods: true
        },
        category: PeriodTypeCategory.RELATIVE
    });
    it("should have 9 relative periods", () => {
        expect(periodUtility.periodTypes.length).toBe(9)
    })
})
describe("Get Period by id", () => {
    const fixedPeriod = PeriodUtility.getPeriodById('2022Q3');
    const relativePeriod = PeriodUtility.getPeriodById('LAST_MONTH');

    expect(fixedPeriod.type.type).toBe(PeriodTypeCategory.FIXED)
    expect(relativePeriod.type.type).toBe(PeriodTypeCategory.RELATIVE)
})


describe("Get periods with allowing future periods", () => {
    const allMonthlyPeriods = PeriodUtility.fromObject({
        year: DateTime.now().year,
        category: PeriodTypeCategory.FIXED,
        preference: {
            allowFuturePeriods: true
        }
    })?.getPeriodType(PeriodTypeEnum.MONTHLY)?.periods ?? [];

    expect(allMonthlyPeriods.length).toBe(12);


    const pastAndPresentMonths = PeriodUtility.fromObject({
        year: DateTime.now().year,
        category: PeriodTypeCategory.FIXED,
        preference: {
            allowFuturePeriods: false
        }
    })?.getPeriodType(PeriodTypeEnum.MONTHLY)?.periods ?? [];

    expect(pastAndPresentMonths.length).toBe(DateTime.now().month);

})
