import type { AnalyticsData } from "./data";
import { asyncify, queue } from "async-es";
import { chunk, maxBy } from "lodash";
import type { QueueObject } from "async";

export type RemoveListener = () => void;
export type DataEngineListener = (data: AnalyticsData[]) => void;
export type OnCompleteDataEngineListener = (completed: boolean) => void;
export type ProgressListeners = (progress: number) => void;

const chunkSize = 5;

export type ScorecardDataEngine = ReturnType<typeof createScorecardDataEngine>;

export function createScorecardDataEngine() {
	return {
		queue: queue(async () => Promise.resolve([])) as QueueObject<{
			periods: string[];
			orgUnits: string[];
			dataItems: string[];
		}>,
		data: [] as AnalyticsData[],
		totalRequests: 0,
		completedRequests: 0,
		isDone: false,
		initialized: false,
		dataListeners: [] as DataEngineListener[],
		onCompleteListeners: [] as OnCompleteDataEngineListener[],
		progressListeners: [] as ProgressListeners[],
		dimensions: {
			orgUnits: [] as string[],
			periods: [] as string[],
			dataItems: [] as string[],
		},
		updateProgress() {
			const progress = this.completedRequests / this.totalRequests;
			for (const listener of this.progressListeners) {
				listener(progress);
			}
		},
		updateTotalRequests(value: number) {
			this.totalRequests = value;
			this.updateProgress();
		},
		updateCompleteRequests(value: number) {
			this.completedRequests = value;
			this.updateProgress();
		},
		addDataListener(listener: DataEngineListener): RemoveListener {
			this.dataListeners.push(listener);
			return () => {
				this.dataListeners.filter((l) => l !== listener);
			};
		},
		addOnCompleteListener(
			listener: OnCompleteDataEngineListener,
		): RemoveListener {
			this.onCompleteListeners.push(listener);
			return () => {
				this.onCompleteListeners.filter((l) => l !== listener);
			};
		},
		addProgressListener(listener: ProgressListeners): RemoveListener {
			this.progressListeners.push(listener);
			return () => {
				this.progressListeners.filter((l) => l !== listener);
			};
		},
		removeListener(listener: DataEngineListener) {
			return this.dataListeners.filter((l) => l !== listener);
		},
		updateData(data: AnalyticsData[]) {
			this.data = [...this.data, ...data];
			for (const listener of this.dataListeners) {
				listener(this.data);
			}
		},
		complete() {
			this.isDone = true;
			for (const listener of this.onCompleteListeners) {
				listener(this.isDone);
			}
		},
		clear() {
			this.data = [];
			this.isDone = false;
			this.initialized = false;
		},
		setupDataFetch() {
			const getTheLongestDimension = () => {
				const dimensions = [
					{
						dimension: "pe",
						length: this.dimensions.periods.length,
					},
					{
						dimension: "dx",
						length: this.dimensions.dataItems.length,
					},
					{
						dimension: "ou",
						length: this.dimensions.orgUnits.length,
					},
				] as const;

				return maxBy(dimensions, "length")!.dimension;
			};
			const getChunkedData = async (maxItem: "dx" | "pe" | "ou") => {
				switch (maxItem) {
					case "dx":
						const dataItemChunks = chunk(
							this.dimensions.dataItems,
							chunkSize,
						);
						this.updateTotalRequests(dataItemChunks.length);
						for (const dataItemChunk of dataItemChunks) {
							this.queue
								.push({
									periods: this.dimensions.periods,
									dataItems: dataItemChunk,
									orgUnits: this.dimensions.orgUnits,
								})
								.then((data) => {
									this.updateData(data as AnalyticsData[]);
								})
								.then((data) => {
									this.updateCompleteRequests(
										this.completedRequests + 1,
									);
									return data;
								});
						}
						break;
					case "pe":
						const periodChunks = chunk(
							this.dimensions.periods,
							chunkSize,
						);
						this.updateTotalRequests(periodChunks.length);
						for (const periodChunk of periodChunks) {
							this.queue
								.push({
									periods: periodChunk,
									dataItems: this.dimensions.dataItems,
									orgUnits: this.dimensions.orgUnits,
								})
								.then((data) => {
									this.updateData(data as AnalyticsData[]);
								})
								.then((data) => {
									this.updateCompleteRequests(
										this.completedRequests + 1,
									);
									return data;
								});
						}
						break;
					case "ou":
						const orgUnitChunks = chunk(
							this.dimensions.orgUnits,
							chunkSize,
						);
						this.updateTotalRequests(orgUnitChunks.length);
						for (const orgUnitChunk of orgUnitChunks) {
							this.queue
								.push({
									periods: this.dimensions.periods,
									dataItems: this.dimensions.dataItems,
									orgUnits: orgUnitChunk,
								})
								.then((data) => {
									this.updateData(data as AnalyticsData[]);
								})
								.then((data) => {
									this.updateCompleteRequests(
										this.completedRequests + 1,
									);
									return data;
								});
						}
						break;
				}
			};
			this.queue.remove(() => true);
			if (
				this.dimensions.periods.length < 5 &&
				this.dimensions.dataItems.length < 5 &&
				this.dimensions.orgUnits.length < 5
			) {
				const { orgUnits, periods, dataItems } = this.dimensions;
				this.updateTotalRequests(1);
				this.updateCompleteRequests(0);
				this.queue
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
				dimensions,
			}: {
				dimensions: {
					dataItems: string[];
					orgUnits: string[];
					periods: string[];
				};
			},
		) {
			this.dimensions = dimensions;
			this.queue = queue(asyncify(fetch));
			this.queue.drain(() => {
				this.complete();
			});
			this.initialized = true;
			this.clear();
			this.setupDataFetch();
		},
	};
}
