import { describe, expect, it } from "vitest";

import { PeriodTypeCategory, PeriodTypeEnum } from "./constants";
import { DateTime } from "luxon";
import { PeriodUtility } from "./models";

describe("Instantiate Period utility class for fixed periods", () => {
	const periodUtility = PeriodUtility.fromObject({
		year: 2021,
		preference: {
			allowFuturePeriods: true,
		},
		category: PeriodTypeCategory.FIXED,
	});
	it("should have 17 fixed period types ", () => {
		expect(periodUtility.periodTypes.length).toBe(17);
	});
	it("should have 12 fixed periods for monthly periods", () => {
		const monthlyPeriodType = periodUtility.getPeriodType("MONTHLY");
		expect(monthlyPeriodType.periods.length).toBe(12);
	});
	it("should have periods in the year 2021", () => {
		const monthlyPeriodType = periodUtility.getPeriodType("MONTHLY");
		for (const period of monthlyPeriodType.periods) {
			expect(period.start.year).toBe(2021);
		}
	});
});

describe("Instantiate Period utility class for relative periods", () => {
	const periodUtility = PeriodUtility.fromObject({
		year: 2021,
		preference: {
			allowFuturePeriods: true,
		},
		category: PeriodTypeCategory.RELATIVE,
	});
	it("should have 9 relative periods", () => {
		expect(periodUtility.periodTypes.length).toBe(9);
	});
});

describe("Get Period by id", () => {
	it("Should return a valida period id", () => {
		const fixedPeriod = PeriodUtility.getPeriodById("2022Q3");
		const relativePeriod = PeriodUtility.getPeriodById("LAST_MONTH");

		expect(fixedPeriod.type.type).toBe(PeriodTypeCategory.FIXED);
		expect(relativePeriod.type.type).toBe(PeriodTypeCategory.RELATIVE);
	});
});

describe("Get periods with allowing future periods", () => {
	it("Should return future periods", () => {
		const utility = PeriodUtility.fromObject({
			year: DateTime.now().year,
			category: PeriodTypeCategory.FIXED,
			preference: {
				allowFuturePeriods: true,
			},
		});
		const monthlyPeriodType = utility.getPeriodType(PeriodTypeEnum.MONTHLY);
		const allMonthlyPeriods = monthlyPeriodType.periods;

		expect(allMonthlyPeriods.length).toBe(12);

		const pastAndPresentMonths =
			PeriodUtility.fromObject({
				year: DateTime.now().year,
				category: PeriodTypeCategory.FIXED,
				preference: {
					allowFuturePeriods: false,
				},
			})?.getPeriodType(PeriodTypeEnum.MONTHLY)?.periods ?? [];

		expect(pastAndPresentMonths.length).toBe(DateTime.now().month);
	});
});
