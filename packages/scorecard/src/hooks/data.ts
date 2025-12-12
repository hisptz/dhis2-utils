import { useScorecardConfig, useScorecardMeta } from "../components";
import { useCallback, useEffect, useMemo } from "react";
import { getDimensionsFromMeta } from "../utils/analytics";
import { FetchError, useAlert, useDataEngine } from "@dhis2/app-runtime";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { uniq } from "lodash";
import { useCalendar } from "./metadata";
import type { ScorecardDataEngine } from "../utils/dataEngine";
import i18n from "@dhis2/d2-i18n";
import { sanitizeAnalyticsData } from "../utils/data";

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

export function useGetScorecardData(dataEngine: ScorecardDataEngine) {
	const engine = useDataEngine();
	const { show, hide: hideAlert } = useAlert(
		({ message }) => message,
		({ type, actions }) => ({ ...type, actions, duration: 3000 }),
	);
	const getTableData = (rawAnalyticsData: ScorecardDataQueryResponse) => {
		return sanitizeAnalyticsData(rawAnalyticsData);
	};
	const fetchData = useCallback(
		async ({
			periods,
			dataItems,
			orgUnits,
		}: {
			periods: string[];
			orgUnits: string[];
			dataItems: string[];
		}) => {
			try {
				const rawAnalyticsData = (await engine.query(query, {
					variables: {
						periods,
						dataItems,
						orgUnits,
					},
				})) as unknown as ScorecardDataQueryResponse;
				if (!rawAnalyticsData) return [];
				return getTableData(rawAnalyticsData);
			} catch (error) {
				if (error instanceof Error || error instanceof FetchError) {
					show({
						message: `${i18n.t("Error getting scorecard data")}: ${
							error.message
						}`,
						type: { critical: true },
					});
				} else {
					console.error(error);
				}
				return [];
			}
		},
		[engine, show, hideAlert],
	);
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const calendar = useCalendar();
	if (!config || !meta) {
		throw new Error(
			"Invalid scorecard setup. Make sure the valid config and state props are passed.",
		);
	}
	const { dataItemsIds, orgUnitsIds, periodsIds } = useMemo(
		() =>
			getDimensionsFromMeta({
				meta,
			}),
		[meta],
	);

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
	useEffect(() => {
		dataEngine.initialize(fetchData, {
			dimensions: {
				dataItems: dataItemsIds,
				periods: analyticsPeriod,
				orgUnits: orgUnitsIds,
			},
		});
	}, [dataEngine, dataItemsIds, analyticsPeriod, orgUnitsIds]);

	return {};
}
