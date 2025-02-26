import { DateTime } from "luxon";
import { trim } from "lodash";

//DO NOT DELETE THESE!!!!
hasValue("");
yearsBetween("", "");
daysBetween("", "");
addDays("", 1);
ceil(2);
floor(2);

function hasValue(value: any) {
	const trimmedValue = trim(value.toString()) ?? "";
	return Boolean(trimmedValue);
}

function yearsBetween(startDate: string, endDate: string) {
	const start = DateTime.fromJSDate(new Date(startDate));
	const end = DateTime.fromJSDate(new Date(endDate));
	const value = Math.floor(end.diff(start, "years").years);
	return isNaN(value) ? "" : `${value}`;
}

function daysBetween(startDate: string, endDate: string) {
	const start = DateTime.fromJSDate(new Date(startDate));
	const end = DateTime.fromJSDate(new Date(endDate));
	const value = Math.floor(end.diff(start, "days").days);
	return isNaN(value) ? "" : `${value}`;
}

function addDays(date: string, days: number): string {
	const dateTime = DateTime.fromJSDate(new Date(date)).startOf("day");
	return dateTime.plus({ day: days }).toJSDate().toString();
}

function ceil(value: number) {
	return `${Math.ceil(value)}`;
}

function floor(value: number) {
	return `${Math.floor(value)}`;
}

export function evaluateFunction(fn: string) {
	try {
		return eval(fn);
	} catch (e) {
		if (fn.includes("-")) {
			return `${fn}`;
		}
		throw "Could not evaluate function: " + fn;
	}
}
