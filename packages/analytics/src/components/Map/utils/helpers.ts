// Get the longest text length from an object property in an array
import L from "leaflet";

export type DHIS2PeriodType =
	| "Daily"
	| "Weekly"
	| "Monthly"
	| "BiMonthly"
	| "Quarterly"
	| "SixMonthly"
	| "Yearly";

export function dateToDHIS2PeriodId(date: Date, periodType: DHIS2PeriodType): string {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	switch (periodType) {
		case "Daily":
			return `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
		case "Weekly": {
			const d = new Date(Date.UTC(year, month - 1, day));
			d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
			const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
			const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
			return `${d.getUTCFullYear()}W${weekNum}`;
		}
		case "Monthly":
			return `${year}${String(month).padStart(2, "0")}`;
		case "BiMonthly":
			return `${year}${String(Math.ceil(month / 2)).padStart(2, "0")}B`;
		case "Quarterly":
			return `${year}Q${Math.ceil(month / 3)}`;
		case "SixMonthly":
			return `${year}S${month <= 6 ? 1 : 2}`;
		case "Yearly":
		default:
			return `${year}`;
	}
}

function advancePeriod(date: Date, periodType: DHIS2PeriodType) {
	switch (periodType) {
		case "Daily": date.setDate(date.getDate() + 1); break;
		case "Weekly": date.setDate(date.getDate() + 7); break;
		case "Monthly": date.setMonth(date.getMonth() + 1); break;
		case "BiMonthly": date.setMonth(date.getMonth() + 2); break;
		case "Quarterly": date.setMonth(date.getMonth() + 3); break;
		case "SixMonthly": date.setMonth(date.getMonth() + 6); break;
		case "Yearly": date.setFullYear(date.getFullYear() + 1); break;
	}
}

export function inferPeriodType(periodId: string): DHIS2PeriodType | null {
	if (/^\d{8}$/.test(periodId)) return "Daily";
	if (/^\d{4}W\d+$/.test(periodId)) return "Weekly";
	if (/^\d{6}$/.test(periodId)) return "Monthly";
	if (/^\d{6}B$/.test(periodId)) return "BiMonthly";
	if (/^\d{4}Q\d$/.test(periodId)) return "Quarterly";
	if (/^\d{4}S\d$/.test(periodId)) return "SixMonthly";
	if (/^\d{4}$/.test(periodId)) return "Yearly";
	return null;
}

export function computeTimelinePeriods(
	range: { start: Date; end: Date },
	periodType: DHIS2PeriodType,
): string[] {
	const result: string[] = [];
	const current = new Date(range.start);
	while (current <= range.end) {
		result.push(dateToDHIS2PeriodId(current, periodType));
		advancePeriod(current, periodType);
	}
	return [...new Set(result)];
}

export const getLongestTextLength = (array: Array<any>, key: string | number) =>
	array.reduce(
		(text, curr) =>
			curr[key] && String(curr[key]).length > text.length
				? String(curr[key])
				: text,
		"",
	).length;

export function getIconUrl(icon: string, { baseUrl }: { baseUrl: string }) {
  return `${baseUrl}/images/orgunitgroup/${icon ?? "01.png"}`;
}

export function getIcon(url: string): L.Icon | undefined {
  return new L.Icon({
    iconUrl: url,
  });
}
