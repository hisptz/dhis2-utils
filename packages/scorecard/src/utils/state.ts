import type { ScorecardConfig, ScorecardState } from "../schemas/config";

export function getInitialStateFromConfig(
	config: ScorecardConfig,
	options?: { nested: boolean },
): ScorecardState {
	return {
		periodSelection: config.periodSelection,
		orgUnitSelection: config.orgUnitSelection,
		options: config.options,
		nested: options?.nested ?? false,
		hasOnePeriod: config.periodSelection.periods.length === 1,
	};
}
