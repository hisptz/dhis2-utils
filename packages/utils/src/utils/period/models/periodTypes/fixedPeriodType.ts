import { compact, filter } from "lodash";
import { DateTime, Interval } from "luxon";
import { PeriodPreference } from "../../interfaces/index.js";
import { FIXED_PERIOD_TYPES } from "../../constants/fixed.js";
import { BasePeriodType } from "./basePeriodType.js";
import { FixedPeriod } from "../periods/index.js";

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
		const duration = this.duration;
		const config = this.config;
		let startDate = this.start;
		let endDate = this.end;
		if ([2, 3].includes(config.rank ?? -1)) {
			//The code below offsets the start date to start on the start of a week (default: Monday), only applied to weekly periods
			startDate = startDate.plus({ day: 7 - startDate.weekday + 1 });
		}
		if (config.offset) {
			const unit = this.config.offset?.unit ?? this.config.unit;
			startDate = startDate.plus({ [unit]: config.offset.value });
			endDate = endDate.plus({ [unit]: config.offset.value });
		}

		//Filter out intervals falling out of the respective year and are in future if allow future periods is set to false
		const intervals = filter(
			Interval.fromDateTimes(startDate, endDate).splitBy(duration),
			(interval: Interval) => {
				const isFuture =
					(interval?.end?.diffNow("days")?.days ?? 0) > 0 &&
					!interval?.contains(DateTime.now());
				return (
					Interval.fromDateTimes(this.start, endDate).engulfs(
						interval,
					) &&
					(this.preference?.allowFuturePeriods || !isFuture)
				);
			},
		);
		return compact(
			intervals.map((interval) => {
				return new FixedPeriod(interval, { type: this.config });
			}),
		);
	}
}

function isPeriodInFuture(period: FixedPeriod) {
	return (
		period.end.diffNow("days").days < 0 ||
		period.interval.contains(DateTime.now())
	);
}
