import { DateTime, Interval } from "luxon";
import { PeriodInterface, PeriodTypeInterface } from "../../interfaces/index.js";

/**
 * Abstract Period class to be implemented by Period classes
 * */
export abstract class BasePeriod {
	abstract id: string;
	abstract name: string;
	abstract type: PeriodTypeInterface;
	abstract start: DateTime;
	abstract end: DateTime;
	abstract interval: Interval;

	abstract get(): PeriodInterface | undefined;
}
