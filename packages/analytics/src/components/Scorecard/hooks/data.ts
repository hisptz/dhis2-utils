import { useScorecardConfig, useScorecardMeta } from "../components";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDimensionsFromMeta } from "../utils/analytics";
import { FetchError, useAlert, useDataEngine } from "@dhis2/app-runtime";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import { chunk, maxBy, uniq } from "lodash";
import { sanitizeAnalyticsData } from "../utils/data";
import { useCalendar } from "./metadata";
import { queue } from "async-es";
import { asyncify, type QueueObject } from "async";
import type { ScorecardDataEngine } from "../utils/dataEngine";
import i18n from "@dhis2/d2-i18n";

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

export function useGetScorecardData(dataEngine: ScorecardDataEngine) {
	const [totalRequests, setTotalRequests] = useState<number>(0);
	const engine = useDataEngine();
	const [noOfCompleteRequests, setNoOfCompleteRequests] = useState<number>(0);
	const { show, hide: hideAlert } = useAlert(
		({ message }) => message,
		({ type, actions }) => ({ ...type, actions, duration: 3000 }),
	);
	const fetchData = async ({
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
			const tableData = getTableData(rawAnalyticsData);
			dataEngine.updateData(tableData);
			setNoOfCompleteRequests((prev) => prev + 1);
		} catch (error) {
			if (error instanceof Error || error instanceof FetchError) {
				setTotalRequests(0);
				setNoOfCompleteRequests(0);
				dataFetchQueue.current.remove(() => true);
				show({
					message: `${i18n.t("Error getting scorecard data")}: ${
						error.message
					}`,
					type: { critical: true },
					actions: [
						{
							label: i18n.t("Retry"),
							onClick: () => {
								hideAlert();
								initializeFetch();
							},
						},
					],
				});
			} else {
				console.error(error);
			}
		}
	};
	const dataFetchQueue = useRef<QueueObject<any>>(queue(asyncify(fetchData)));
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
						dataFetchQueue.current.push({
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
						dataFetchQueue.current.push({
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
						dataFetchQueue.current.push({
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
		dataFetchQueue.current.drain(() => {
			dataEngine.complete();
		});

		dataEngine.clear();
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
			dataEngine.complete();
			return;
		}
		//If not then let's figure out how to paginate one of the
		setNoOfCompleteRequests(0);
		const dimensionWithMaxItems = getTheLongestDimension();
		await getChunkedData(dimensionWithMaxItems);
	};

	useEffect(() => {
		initializeFetch();
	}, []);

	return {
		rawData: [],
		progress,
	};
}
