import { useScorecardConfig, useScorecardMeta } from "../components";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDimensionsFromMeta } from "../utils/analytics";
import { useDataQuery } from "@dhis2/app-runtime";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { chunk, maxBy, uniq } from "lodash";
import { sanitizeAnalyticsData } from "../utils/data";
import { useCalendar } from "./metadata";
import {
	createScorecardDataEngine,
	type ScorecardDataEngine,
} from "../utils/dataEngine";
import { queue } from "async-es";
import { asyncify } from "async";

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

const chunkSize = 5;

export function useGetScorecardData() {
	const [totalRequests, setTotalRequests] = useState<number>(0);
	const [noOfCompleteRequests, setNoOfCompleteRequests] = useState<number>(0);
	const data = useRef<ScorecardDataEngine>(createScorecardDataEngine());
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
		setNoOfCompleteRequests((prev) => prev + 1);
	};
	const dataFetchQueue = useRef(queue(asyncify(fetchData)));
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

	const { refetch, called } = useDataQuery<ScorecardDataQueryResponse>(
		query,
		{
			variables: {
				periods: analyticsPeriod,
				dataItems: dataItemsIds,
				orgUnits: orgUnitsIds,
			},
			lazy: true,
		},
	);

	const progress = useMemo(() => {
		return noOfCompleteRequests / totalRequests;
	}, [totalRequests, noOfCompleteRequests]);

	const getTableData = (rawAnalyticsData: ScorecardDataQueryResponse) => {
		return sanitizeAnalyticsData(rawAnalyticsData);
	};

	const initializeFetch = async () => {
		const getTheLongestDimension = () => {
			const dimensions = [
				{
					dimension: "pe",
					length: analyticsPeriod.length,
				},
				{
					dimension: "dx",
					length: dataItemsIds.length,
				},
				{
					dimension: "ou",
					length: orgUnitsIds.length,
				},
			] as const;

			return maxBy(dimensions, "length")!.dimension;
		};

		const getChunkedData = async (maxItem: "dx" | "pe" | "ou") => {
			switch (maxItem) {
				case "dx":
					const dataItemChunks = chunk(dataItemsIds, chunkSize);
					setTotalRequests(dataItemChunks.length);
					for (const dataItemChunk of dataItemChunks) {
						await dataFetchQueue.current.push({
							periods: analyticsPeriod,
							dataItems: dataItemChunk,
							orgUnits: orgUnitsIds,
						});
					}
					break;
				case "pe":
					const periodChunks = chunk(analyticsPeriod, chunkSize);
					setTotalRequests(periodChunks.length);
					for (const periodChunk of periodChunks) {
						await dataFetchQueue.current.push({
							periods: periodChunk,
							dataItems: dataItemsIds,
							orgUnits: orgUnitsIds,
						});
					}
					break;
				case "ou":
					const orgUnitChunks = chunk(orgUnitsIds, chunkSize);
					setTotalRequests(orgUnitChunks.length);
					for (const orgUnitChunk of orgUnitChunks) {
						await dataFetchQueue.current.push({
							periods: analyticsPeriod,
							dataItems: dataItemsIds,
							orgUnits: orgUnitChunk,
						});
					}
					break;
			}
		};
		//Here is where we need to paginate the requests.
		//First, Are there any dimensions greater than 5? if not then we can just call all the data
		setTotalRequests(0);
		setNoOfCompleteRequests(0);
		dataFetchQueue.current.remove(() => true);
		data.current.clear();
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
		//If not then let's figure out how to paginate one of the
		setNoOfCompleteRequests(0);
		const dimensionWithMaxItems = getTheLongestDimension();
		await getChunkedData(dimensionWithMaxItems);
		data.current.complete();
	};

	useEffect(() => {
		if (!called) {
			initializeFetch();
		}
	}, [called]);

	return {
		data: data.current,
		rawData: [],
		progress,
	};
}
