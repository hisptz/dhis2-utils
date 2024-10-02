import {
	useScorecardConfig,
	useScorecardMeta,
	useScorecardState,
} from "../components";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDimensionsFromMeta } from "../utils/analytics";
import { useDataQuery } from "@dhis2/app-runtime";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { chunk, uniq } from "lodash";
import { sanitizeAnalyticsData } from "../utils/data";
import { useCalendar } from "./metadata";
import {
	createScorecardDataEngine,
	type ScorecardDataEngine,
} from "../utils/dataEngine";

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
	const [totalRequests, setTotalRequests] = useState<number>(0);
	const [noOfCompleteRequests, setNoOfCompleteRequests] = useState<number>(0);
	const data = useRef<ScorecardDataEngine>(createScorecardDataEngine());
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const state = useScorecardState();
	const calendar = useCalendar();
	if (!config || !state || !meta) {
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

	const { refetch } = useDataQuery<ScorecardDataQueryResponse>(query, {
		variables: {
			periods: analyticsPeriod,
			dataItems: dataItemsIds,
			orgUnits: orgUnitsIds,
		},
		lazy: true,
	});

	const progress = useMemo(() => {
		return noOfCompleteRequests / totalRequests;
	}, [totalRequests, noOfCompleteRequests]);

	const getTableData = (rawAnalyticsData: ScorecardDataQueryResponse) => {
		return sanitizeAnalyticsData(rawAnalyticsData);
	};

	const initializeFetch = async () => {
		//Here is where we need to paginate the requests.
		//First, Are there any dimensions greater than 5? if not then we can just call all the data
		if (
			analyticsPeriod.length <= 5 &&
			dataItemsIds.length <= 5 &&
			orgUnitsIds.length <= 5
		) {
			setTotalRequests(1);
			setNoOfCompleteRequests(0);
			await fetchData({
				periods: analyticsPeriod,
				dataItems: dataItemsIds,
				orgUnits: orgUnitsIds,
			});
			setNoOfCompleteRequests(1);
			data.current.complete();
			return;
		}
		//If not then let's paginate the data items
		const dataItemChunks = chunk(analyticsPeriod, 2);
		setTotalRequests(dataItemChunks.length);
		setNoOfCompleteRequests(0);
		for (const dataItemChunk of dataItemChunks) {
			await fetchData({
				periods: dataItemChunk,
				dataItems: dataItemsIds,
				orgUnits: orgUnitsIds,
			});
			setNoOfCompleteRequests((prev) => prev + 1);
		}
		data.current.complete();
	};

	useEffect(() => {
		initializeFetch();
	}, [meta]);

	const fetchData = async ({
		periods,
		dataItems,
		orgUnits,
	}: {
		periods: string[];
		orgUnits: string[];
		dataItems: string[];
	}) => {
		const rawAnalyticsData = (await refetch({
			periods,
			dataItems,
			orgUnits,
		})) as unknown as ScorecardDataQueryResponse;
		if (!rawAnalyticsData) return [];
		const tableData = getTableData(rawAnalyticsData);
		data.current.updateData(tableData);
	};

	return {
		data: data.current,
		rawData: [],
		progress,
	};
}
