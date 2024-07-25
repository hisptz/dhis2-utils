import type { ScorecardConfig } from "../schemas/config";

export class ScorecardEngine {
	config: ScorecardConfig;

	constructor(config: ScorecardConfig) {
		this.config = config;
	}
}
