import type { AnalyticsData } from "./data";

export type DataEngineListener = (data: AnalyticsData[] | "done") => void;

export type ScorecardDataEngine = ReturnType<typeof createScorecardDataEngine>;

export function createScorecardDataEngine() {
	return {
		data: [] as AnalyticsData[],
		isDone: false,
		listeners: [] as DataEngineListener[],
		addListener(listener: DataEngineListener) {
			this.listeners.push(listener);
		},
		removeListener(listener: DataEngineListener) {
			return this.listeners.filter((l) => l !== listener);
		},
		updateData(data: AnalyticsData[]) {
			this.data = [...this.data, ...data];
			for (const listener of this.listeners) {
				listener(this.data);
			}
		},
		complete() {
			for (const listener of this.listeners) {
				this.isDone = true;
				listener("done");
			}
		},
		clear() {
			this.data = [];
			this.isDone = false;
		},
	};
}
