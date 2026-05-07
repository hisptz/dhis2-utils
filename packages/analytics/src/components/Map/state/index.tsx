import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import { BasePeriod } from "@hisptz/dhis2-utils";
import { createContext } from "react";
import { CustomMapLayer } from "../components/MapLayer/interfaces";
import { MapOrgUnit } from "../interfaces";
import type { DHIS2PeriodType } from "../utils/helpers.js";

export interface MapPeriodFilterState {
 	activePeriod: string | null;
	setActivePeriod: (periodId: string) => void;
 	periodType: DHIS2PeriodType | null;
	setPeriodType: (type: DHIS2PeriodType) => void;
}

export const MapOrgUnitContext = createContext<{
	orgUnitSelection: OrgUnitSelection;
	orgUnits?: MapOrgUnit[];
}>({
	orgUnitSelection: { orgUnits: [] },
	orgUnits: [],
});

export const MapPeriodContext = createContext<
	| {
			periods?: BasePeriod[];
			range?: { start: Date; end: Date };
	  }
	| undefined
>({
	periods: [],
});

export const MapLayersContext = createContext<{
	layers: CustomMapLayer[];
	updateLayer: (id: string, updatedLayer: CustomMapLayer) => void;
}>({
	layers: [],
	updateLayer: () => {},
});

export const MapPeriodFilterContext = createContext<MapPeriodFilterState>({
	activePeriod: null,
	setActivePeriod: () => {},
	periodType: null,
	setPeriodType: () => {},
});
