import {PeriodUtility} from "./models";
import {PeriodTypeCategory} from "./constants";


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
describe("Get Period by id", ()=>{
    const fixedPeriod = PeriodUtility.getPeriodById('20220203');
    const relativePeriod = PeriodUtility.getPeriodById('LAST_MONTH');

    expect(fixedPeriod.type.type).toBe(PeriodTypeCategory.FIXED)
    expect(relativePeriod.type.type).toBe(PeriodTypeCategory.RELATIVE)
})
