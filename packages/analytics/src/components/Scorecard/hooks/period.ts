import { useScorecardConfig } from "../components/ConfigProvider";

export function usePeriodSelection() {
	const config = useScorecardConfig();

	if (!config) {
		return null;
	}
	const periodSelection = config.periodSelection;
}
