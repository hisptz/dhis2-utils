import type { OrgUnitSelection } from "../schemas/config";
import type { ItemMeta } from "../hooks/metadata";

export function getOrgUnitsForAnalytics(
	orgUnitSelection: OrgUnitSelection,
): string[] {
	const {
		userOrgUnit,
		orgUnits,
		userSubUnit,
		userSubX2Unit,
		levels,
		groups,
	} = orgUnitSelection ?? {};
	const results = [];

	if (userOrgUnit) {
		results.push("USER_ORGUNIT");
	}
	if (userSubUnit) {
		results.push("USER_ORGUNIT_CHILDREN");
	}
	if (userSubX2Unit) {
		results.push("USER_ORGUNIT_GRANDCHILDREN");
	}

	if (orgUnits) {
		results.push(...orgUnits.map((orgUnit) => orgUnit.id));
	}
	if (groups) {
		results.push(...groups.map((group) => `OU_GROUP-${group}`));
	}
	if (levels) {
		results.push(...levels.map((level) => `LEVEL-${level}`));
	}
	return results;
}

export function getOrgUnitLevel(orgUnit: ItemMeta & { hierarchy: string }) {
	return orgUnit.hierarchy.split("/").filter(Boolean).length;
}
