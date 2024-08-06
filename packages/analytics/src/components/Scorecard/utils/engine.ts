import type {
	ScorecardConfig,
	ScorecardState,
	ScorecardTableData,
} from "../schemas/config";
import type { ScorecardMeta } from "../components/MetaProvider";

export class ScorecardEngine {
	config: ScorecardConfig;
	state: ScorecardState;
	meta: ScorecardMeta;

	constructor({
		config,
		meta,
		state,
	}: {
		config: ScorecardConfig;
		state: ScorecardState;
		meta: ScorecardMeta;
	}) {
		this.config = config;
		this.meta = meta;
		this.state = state;
	}

	getRows(): ScorecardTableData[] {
		return [];
	}
}
