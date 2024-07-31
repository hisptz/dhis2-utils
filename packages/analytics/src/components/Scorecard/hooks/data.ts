import { useScorecardState } from "../components/StateProvider";
import { useMemo } from "react";
import { getDimensions } from "../utils/analytics";
import { useScorecardConfig } from "../components/ConfigProvider";
import { useConfig, useDataQuery } from "@dhis2/app-runtime";
import type { SupportedCalendar } from "@dhis2/multi-calendar-dates/build/types/types";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { uniq } from "lodash";
import { useScorecardMeta } from "../components/MetaProvider";
import { getTableDataFromAnalytics } from "../utils/data";

const query: any = {
	data: {
		resource: "analytics",
		params: ({
			periods,
			orgUnits,
			dataItems,
		}: {
			periods: string[];
			orgUnits: string[];
			dataItems: string[];
		}) => {
			return {
				skipMeta: true,
				dimension: [
					`pe:${periods.join(";")}`,
					`dx:${dataItems.join(";")}`,
					`ou:${orgUnits.join(";")}`,
				],
			};
		},
	},
};

export interface ScorecardDataQueryResponse {
	data: {
		headerWidth: number;
		headers: Array<{
			name: string;
			hidden: boolean;
			meta: boolean;
			column: string;
			valueType: string;
		}>;
		rows: Array<Array<string>>;
		height: number;
		width: number;
	};
}

export function useGetScorecardData() {
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const state = useScorecardState();
	const { systemInfo } = useConfig();
	const calendar =
		(systemInfo as unknown as { calendar?: SupportedCalendar })?.calendar ??
		"iso8601";

	if (!config || !state || !meta) {
		throw new Error(
			"Invalid scorecard setup. Make sure the valid config and state props are passed.",
		);
	}
	const { dataItemsIds, orgUnitsIds, periodsIds } = getDimensions({
		config,
		state,
	});
	//We need to make sure each period has a past period
	const analyticsPeriod = useMemo(() => {
		const pastPeriods = periodsIds
			.map((periodId) => {
				const pe = getAdjacentFixedPeriods({
					calendar,
					steps: -1,
					period: createFixedPeriodFromPeriodId({
						calendar,
						periodId,
					}),
				});
				return pe.map(({ id }) => id);
			})
			.flat();

		return uniq([...periodsIds, ...pastPeriods]);
	}, [periodsIds]);

	const { loading, data: rawData } = useDataQuery<ScorecardDataQueryResponse>(
		query,
		{
			variables: {
				periods: analyticsPeriod,
				dataItems: dataItemsIds,
				orgUnits: orgUnitsIds,
			},
		},
	);

	const data = useMemo(() => {
		if (rawData) {
			return getTableDataFromAnalytics(rawData, {
				meta,
				state,
				config,
			});
		}
		return [];
	}, [rawData, meta]);

	return {
		loading,
		data,
	};
}
