import type { AnalyticsData } from "./data";
import { asyncify, queue } from "async-es";
import { chunk, compact, flattenDeep, isEmpty, map, maxBy, uniq } from "lodash";
import type { QueueObject } from "async";

export type RemoveListener = () => void;
export type DataEngineListener = () => void;
export type OnCompleteDataEngineListener = () => void;
export type ProgressListeners = (progress: number) => void;

const chunkSize = 5;

export type ScorecardDataEngine = ReturnType<typeof createScorecardDataEngine>;

export function createScorecardDataEngine() {
	const data = new Map<string, AnalyticsData>();
	const mappedData = new Map<string, AnalyticsData[]>();
	const generalListeners = new Set<DataEngineListener>();
	const progressListeners = new Set<ProgressListeners>();
	const onCompleteListeners = new Set<OnCompleteDataEngineListener>();
	let dataQueryQueue = queue(async () => Promise.resolve([])) as QueueObject<{
		periods: string[];
		orgUnits: string[];
		dataItems: string[];
	}>;
	const keyListeners = new Map<string, Set<DataEngineListener>>();

	let totalRequests = 0;
	let completedRequests = 0;
	let isDone = false;
	let initialized = false;
	let dimensions: {
		orgUnits: string[];
		periods: string[];
		dataItems: string[];
	} = {
		orgUnits: [] as string[],
		periods: [] as string[],
		dataItems: [] as string[],
	};

	function getSnapshot(config: { dx: string[]; pe: string[]; ou: string[] }) {
		return function () {
			const keys = flattenDeep(
				config.dx.map((dx) =>
					config.ou.map((ou) =>
						config.pe.map((pe) => `${ou}-${dx}-${pe}`),
					),
				),
			);
			const dataKey = keys.join("-");
			if (mappedData.get(dataKey)) {
				return mappedData.get(dataKey);
			}
			const datum = compact(keys.map((key) => data.get(key)));
			if (!isEmpty(datum)) {
				mappedData.set(dataKey, datum);
			}
			return mappedData.get(dataKey);
		};
	}

	function getIsCompleteSnapshot() {
		return isDone;
	}

	function complete() {
		isDone = true;
		for (const listener of onCompleteListeners) {
			listener();
		}
	}

	return {
		queue: dataQueryQueue,
		getSnapshot,
		getIsCompleteSnapshot,
		data,
		isDone: getIsCompleteSnapshot(),
		initialized,
		dataListeners: [] as DataEngineListener[],
		onCompleteListeners,
		progressListeners,
		dimensions,
		updateProgress() {
			const progress = completedRequests / totalRequests;
			for (const listener of this.progressListeners) {
				listener(progress);
			}
		},
		updateTotalRequests(value: number) {
			totalRequests = value;
			this.updateProgress();
		},
		updateCompleteRequests(value: number) {
			completedRequests = value;
			this.updateProgress();
		},
		addDataListener(
			key: string,
			listener: DataEngineListener,
		): RemoveListener {
			keyListeners.get(key)?.add(listener);
			return () => {
				keyListeners.get(key)?.delete(listener);
			};
		},
		addGeneralListener(listener: DataEngineListener): RemoveListener {
			generalListeners.add(listener);
			return () => {
				generalListeners.delete(listener);
			};
		},
		addOnCompleteListener(
			listener: OnCompleteDataEngineListener,
		): RemoveListener {
			onCompleteListeners.add(listener);
			return () => {
				onCompleteListeners.delete(listener);
			};
		},
		addProgressListener(listener: ProgressListeners): RemoveListener {
			progressListeners.add(listener);
			return () => {
				progressListeners.delete(listener);
			};
		},
		removeListener(key: string, listener: DataEngineListener) {
			return keyListeners.get(key)?.delete(listener);
		},
		updateData(downloadedData: AnalyticsData[]) {
			for (const dataItem of downloadedData) {
				const { ou, dx, pe } = dataItem;
				data.set(`${ou}-${dx}-${pe}`, dataItem);
			}
			for (const listener of generalListeners) {
				listener();
			}
		},
		clear() {
			data.clear();
			mappedData.clear();
			isDone = false;
			initialized = false;
		},
		setupDataFetch() {
			const getTheLongestDimension = () => {
				const updatedDimensions = [
					{
						dimension: "pe",
						length: dimensions.periods.length,
					},
					{
						dimension: "dx",
						length: dimensions.dataItems.length,
					},
					{
						dimension: "ou",
						length: dimensions.orgUnits.length,
					},
				] as const;

				return maxBy(updatedDimensions, "length")!.dimension;
			};
			const getChunkedData = async (maxItem: "dx" | "pe" | "ou") => {
				switch (maxItem) {
					case "dx":
						const dataItemChunks = chunk(
							dimensions.dataItems,
							chunkSize,
						);
						this.updateTotalRequests(dataItemChunks.length);
						for (const dataItemChunk of dataItemChunks) {
							dataQueryQueue
								.push({
									periods: dimensions.periods,
									dataItems: dataItemChunk,
									orgUnits: dimensions.orgUnits,
								})
								.then((data) => {
									this.updateData(data as AnalyticsData[]);
								})
								.then((data) => {
									this.updateCompleteRequests(
										completedRequests + 1,
									);
									return data;
								});
						}
						break;
					case "pe":
						const periodChunks = chunk(
							dimensions.periods,
							chunkSize,
						);
						this.updateTotalRequests(periodChunks.length);
						for (const periodChunk of periodChunks) {
							dataQueryQueue
								.push({
									periods: periodChunk,
									dataItems: dimensions.dataItems,
									orgUnits: dimensions.orgUnits,
								})
								.then((data) => {
									this.updateData(data as AnalyticsData[]);
								})
								.then((data) => {
									this.updateCompleteRequests(
										completedRequests + 1,
									);
									return data;
								});
						}
						break;
					case "ou":
						const orgUnitChunks = chunk(
							dimensions.orgUnits,
							chunkSize,
						);
						this.updateTotalRequests(orgUnitChunks.length);
						for (const orgUnitChunk of orgUnitChunks) {
							dataQueryQueue
								.push({
									periods: dimensions.periods,
									dataItems: dimensions.dataItems,
									orgUnits: orgUnitChunk,
								})
								.then((data) => {
									this.updateData(data as AnalyticsData[]);
								})
								.then((data) => {
									this.updateCompleteRequests(
										completedRequests + 1,
									);
									return data;
								});
						}
						break;
				}
			};
			dataQueryQueue.remove(() => true);
			if (
				dimensions.periods.length < 5 &&
				dimensions.dataItems.length < 5 &&
				dimensions.orgUnits.length < 5
			) {
				const { orgUnits, periods, dataItems } = dimensions;
				this.updateTotalRequests(1);
				this.updateCompleteRequests(0);
				dataQueryQueue
					.push({
						periods,
						orgUnits,
						dataItems,
					})
					.then((data) => {
						this.updateData(data as AnalyticsData[]);
						this.updateCompleteRequests(1);
					});
				return;
			}
			const dimensionWithMaxItems = getTheLongestDimension();
			getChunkedData(dimensionWithMaxItems);
		},
		initialize(
			fetch: (dimensions: {
				periods: string[];
				orgUnits: string[];
				dataItems: string[];
			}) => Promise<AnalyticsData[]>,
			{
				dimensions: appliedDimensions,
			}: {
				dimensions: {
					dataItems: string[];
					orgUnits: string[];
					periods: string[];
				};
			},
		) {
			this.clear();
			dimensions = appliedDimensions;
			dataQueryQueue = queue(asyncify(fetch));
			dataQueryQueue.drain(() => {
				complete();
			});
			initialized = true;
			this.setupDataFetch();
		},
	};
}
