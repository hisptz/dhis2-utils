import {PeriodUtility} from "./models";
import {PeriodTypeCategory} from "./interfaces";
import {PeriodTypeEnum} from "./constants";


describe("Instantiate period utility class for fixed periods", () => {
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
describe("Instantiate period utility class for relative periods", () => {
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

describe("Get period type by id", () => {
    const periodType = new PeriodUtility().setCategory(PeriodTypeCategory.FIXED).setYear(2022).getPeriodType(PeriodTypeEnum.WEEKLYSAT);
})
