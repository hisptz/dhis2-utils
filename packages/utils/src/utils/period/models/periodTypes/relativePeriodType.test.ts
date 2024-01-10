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
		console.log(
			periodType.periods.map((period: RelativePeriod) => ({
				name: period.name,
				start: period.start.toFormat("yyyy-MM-dd"),
				end: period.end.toFormat("yyyy-MM-dd"),
			})),
		);
	});

	it("", () => expect(true).toBe(true));
});
