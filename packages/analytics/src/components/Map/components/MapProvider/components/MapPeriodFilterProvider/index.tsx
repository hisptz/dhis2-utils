import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapPeriodFilterContext } from "../../../../state/index.js";
import type { DHIS2PeriodType } from "../../../../utils/helpers.js";

export function MapPeriodFilterProvider({
	children,
	initialActivePeriod = null,
	initialPeriodType = null,
}: {
	children: ReactNode;
	initialActivePeriod?: string | null;
	initialPeriodType?: DHIS2PeriodType | null;
}) {
	const [activePeriod, setActivePeriod] = useState<string | null>(initialActivePeriod);
	const [periodType, setPeriodType] = useState<DHIS2PeriodType | null>(initialPeriodType);
	const initialized = useRef(false);
	useEffect(() => {
		if (!initialized.current && initialActivePeriod !== null) {
			initialized.current = true;
			setActivePeriod(initialActivePeriod);
		}
	}, [initialActivePeriod]);

	return (
		<MapPeriodFilterContext.Provider value={{ activePeriod, setActivePeriod, periodType, setPeriodType }}>
			{children}
		</MapPeriodFilterContext.Provider>
	);
}
