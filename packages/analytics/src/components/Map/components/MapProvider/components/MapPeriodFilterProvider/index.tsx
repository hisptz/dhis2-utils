import { useState, type ReactNode } from "react";
import { MapPeriodFilterContext } from "../../../../state/index.js";
import type { DHIS2PeriodType } from "../../../../utils/helpers.js";

export function MapPeriodFilterProvider({
	children,
	initialPeriodType = null,
}: {
	children: ReactNode;
	initialPeriodType?: DHIS2PeriodType | null;
}) {
	const [activePeriod, setActivePeriod] = useState<string | null>(null);
	const [periodType, setPeriodType] = useState<DHIS2PeriodType | null>(initialPeriodType);

	return (
		<MapPeriodFilterContext.Provider value={{ activePeriod, setActivePeriod, periodType, setPeriodType }}>
			{children}
		</MapPeriodFilterContext.Provider>
	);
}
