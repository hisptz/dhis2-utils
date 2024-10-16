import { compact, flattenDeep } from "lodash";
import type {
	ScorecardDataGroup,
	ScorecardDataHolder,
} from "../schemas/config";

export function getHoldersFromGroups(
	dataGroups: ScorecardDataGroup[],
): ScorecardDataHolder[] {
	return flattenDeep(dataGroups?.map(({ dataHolders }) => dataHolders) ?? []);
}

export function getDataSourcesFromGroups(dataGroups: ScorecardDataGroup[]) {
	const dataHolders = compact(getHoldersFromGroups(dataGroups));
	return flattenDeep(dataHolders?.map(({ dataSources }) => dataSources));
}
