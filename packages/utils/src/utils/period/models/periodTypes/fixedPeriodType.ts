import { compact } from "lodash";
import { PeriodPreference } from "../../interfaces";
import { BasePeriodType } from "./basePeriodType";
import { FixedPeriod } from "../periods";
import { FIXED_PERIOD_TYPES } from "../../constants/fixed";
import { generateFixedPeriods, periodTypes } from "@dhis2/multi-calendar-dates";
import { DateTime } from "luxon";

export class FixedPeriodType extends BasePeriodType {
	get periods(): FixedPeriod[] {
		return this._generateFixedPeriods();
	}

	static getFromId(
		id: string,
		preference: { year?: number; preference?: PeriodPreference },
	): FixedPeriodType {
		const config = FIXED_PERIOD_TYPES.find(
			(periodType) => periodType.id === id,
		);
		if (!config) {
			throw new Error(`Period type with id ${id} not found`);
		}
		return new FixedPeriodType(config, preference);
	}

	private _generateFixedPeriods(): FixedPeriod[] {
		const periods = generateFixedPeriods({
			year: this.year,
			calendar: this.preference?.calendar ?? "iso8601",
			periodType: this.id as (typeof periodTypes)[number],
			locale: this.preference?.locale,
			yearsCount: this.preference?.yearsCount ?? 10,
		});

		const periodObjects = compact(
			periods.map((periodConfig) => {
				return new FixedPeriod({
					config: periodConfig,
					nested: false,
					preference: this.preference,
					type: this.config,
				});
			}),
		);

		if (this.preference?.allowFuturePeriods) {
			return periodObjects;
		}

		return periodObjects.filter((period) => !isPeriodInFuture(period));
	}
}

export function isPeriodInFuture(period: FixedPeriod) {
	return (
		period.start.diffNow("day").days > 0 &&
		!period.interval.contains(DateTime.now())
	);
}
