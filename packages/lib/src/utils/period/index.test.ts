import {PeriodUtility} from "./models";
import {PeriodTypeCategory} from "./interfaces";


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
