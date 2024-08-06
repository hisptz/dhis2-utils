import { useScorecardState } from "../components/StateProvider";
import { useMemo } from "react";
import { getDimensions } from "../utils/analytics";
import { useScorecardConfig } from "../components/ConfigProvider";
import { useDataQuery } from "@dhis2/app-runtime";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { isEmpty, uniq } from "lodash";
import { useScorecardMeta } from "../components/MetaProvider";
import {
	getTableDataFromAnalytics,
	sanitizeAnalyticsData,
} from "../utils/data";
import { useCalendar } from "./metadata";

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
	const calendar = useCalendar();
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

	const { loading, data: rawAnalyticsData } =
		useDataQuery<ScorecardDataQueryResponse>(query, {
			variables: {
				periods: analyticsPeriod,
				dataItems: dataItemsIds,
				orgUnits: orgUnitsIds,
			},
		});

	const rawData = useMemo(() => {
		if (!rawAnalyticsData) return [];
		return sanitizeAnalyticsData(rawAnalyticsData);
	}, [rawAnalyticsData]);

	const data = useMemo(() => {
		if (rawAnalyticsData) {
			const data = getTableDataFromAnalytics(rawAnalyticsData, {
				meta,
				state,
				config,
			});
			if (!!state.options.emptyRows) {
				return data;
			} else {
				return data.filter(({ dataValues }) => !isEmpty(dataValues));
			}
		}
		return [];
	}, [rawAnalyticsData, meta]);

	return {
		loading,
		data,
		rawData,
	};
}
