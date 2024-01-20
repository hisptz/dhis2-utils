import { PeriodTypeCategory, PeriodTypeEnum } from "../../constants";
import { PeriodUtility, RelativePeriod } from "../index";
import { forEach } from "lodash";

const dailyPeriodTypeTest = [
	{
		id: PeriodTypeEnum.DAILY,
	},
];

describe("Test relative periods", () => {
	const relativePeriodTypes = PeriodUtility.fromObject({
		year: new Date().getFullYear(),
		category: PeriodTypeCategory.RELATIVE,
	}).periodTypes;

	forEach(relativePeriodTypes, (periodType) => {
		it("Should be good", () => {
			periodType.periods.map((period: RelativePeriod) => {
				expect(period.id).not.toBeUndefined();
				expect(period.start).not.toBeUndefined();
				expect(period.end).not.toBeUndefined();
			});
		});
	});
});
