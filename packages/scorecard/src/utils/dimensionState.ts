import type { OrgUnitSelection, PeriodSelection } from "../schemas/config";
import {
	useScorecardDimensionStateEngine,
	useScorecardMeta,
} from "../components";
import { useEffect, useState } from "react";

export type DimensionState = {
	orgUnitSelection: OrgUnitSelection;
	periodSelection: PeriodSelection;
};
export type OrgUnitListener = {
	type: "orgUnit";
	listener: (orgUnitSelection: OrgUnitSelection) => void;
};
export type PeriodListener = {
	type: "period";
	listener: (periodSelection: PeriodSelection) => void;
};
export type AllDimensionListener = {
	type: "all";
	listener: (dimensionState: DimensionState) => void;
};
export type DimensionListener =
	| OrgUnitListener
	| PeriodListener
	| AllDimensionListener;

export type DimensionStateEngine = ReturnType<
	typeof createDimensionStateEngine
>;

export function createDimensionStateEngine({
	orgUnitSelection,
	periodSelection,
}: DimensionState) {
	return {
		orgUnitSelection,
		periodSelection,
		listeners: [] as DimensionListener[],
		addListener(listener: DimensionListener) {
			this.listeners.push(listener);
			return () => {
				this.listeners = this.listeners.filter(
					(l: DimensionListener) => l !== listener,
				);
			};
		},
		removeListener(listener: DimensionListener) {
			this.listeners = this.listeners.filter(
				(l: DimensionListener) => l !== listener,
			);
		},
		update({ orgUnitSelection, periodSelection }: DimensionState) {
			this.orgUnitSelection = orgUnitSelection;
			this.periodSelection = periodSelection;
			for (const listener of this.listeners) {
				if (listener.type === "orgUnit") {
					listener.listener(orgUnitSelection);
				}
				if (listener.type === "period") {
					listener.listener(periodSelection);
				}
				if (listener.type === "all") {
					listener.listener({
						orgUnitSelection,
						periodSelection,
					});
				}
			}
		},
		updatePeriodSelection(periodSelection: PeriodSelection) {
			this.periodSelection = periodSelection;
			for (const listener of this.listeners) {
				if (listener.type === "period") {
					listener.listener(periodSelection);
				}
				if (listener.type === "all") {
					listener.listener({
						orgUnitSelection: this.orgUnitSelection,
						periodSelection,
					});
				}
			}
		},
		updateOrgUnitSelection(orgUnitSelection: OrgUnitSelection) {
			this.orgUnitSelection = orgUnitSelection;
			for (const listener of this.listeners) {
				if (listener.type === "orgUnit") {
					listener.listener(orgUnitSelection);
				}
				if (listener.type === "all") {
					listener.listener({
						orgUnitSelection: orgUnitSelection,
						periodSelection: this.periodSelection,
					});
				}
			}
		},
	};
}

export function useUpdateDimensionState(type: "orgUnit" | "period" | "all") {
	const dimensionEngine = useScorecardDimensionStateEngine();
	return (value: OrgUnitSelection | PeriodSelection | DimensionState) => {
		switch (type) {
			case "orgUnit":
				dimensionEngine.updateOrgUnitSelection(
					value as OrgUnitSelection,
				);
				break;
			case "period":
				dimensionEngine.updatePeriodSelection(value as PeriodSelection);
				break;
			case "all":
				dimensionEngine.update(value as DimensionState);
		}
	};
}

export function usePeriodSelectionValue() {
	const dimensionEngine = useScorecardDimensionStateEngine();
	const [periodSelection, setPeriodSelection] = useState<PeriodSelection>(
		dimensionEngine.periodSelection,
	);

	useEffect(() => {
		const unsubscribe = dimensionEngine.addListener({
			type: "period",
			listener: (periodSelection) => {
				setPeriodSelection(periodSelection);
			},
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return periodSelection;
}

export function useHasOnePeriod() {
	const scorecardMeta = useScorecardMeta();
	const periodSelection = usePeriodSelectionValue();
	if (scorecardMeta) {
		return scorecardMeta.periods.length === 1;
	}
	return periodSelection.periods.length === 1;
}

export function useOrgUnitSelectionValue() {
	const dimensionEngine = useScorecardDimensionStateEngine();
	const [orgUnitSelection, setOrgUnitSelection] = useState<OrgUnitSelection>(
		dimensionEngine.orgUnitSelection,
	);

	useEffect(() => {
		const unsubscribe = dimensionEngine.addListener({
			type: "orgUnit",
			listener: (periodSelection) => {
				setOrgUnitSelection(periodSelection);
			},
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return orgUnitSelection;
}
