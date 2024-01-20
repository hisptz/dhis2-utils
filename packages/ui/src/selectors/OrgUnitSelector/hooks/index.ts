import { useDataQuery } from "@dhis2/app-runtime";
import { useContext } from "react";
import { orgUnitLevelAndGroupsQuery, orgUnitRootsQuery } from "../services";
import { FilterState, FilterStateProps } from "../states/filter";
import { isEmpty } from "lodash";
import { OrganisationUnit } from "../types";

export function useOrgUnitsRoot(defaultRoots?: OrganisationUnit[]): {
	roots?: Array<OrganisationUnit>;
	loading: boolean;
	error: any;
} {
	const { loading, error, data } = useDataQuery(orgUnitRootsQuery, {
		lazy: !isEmpty(defaultRoots),
	});

	return {
		roots: defaultRoots ?? (data?.orgUnitRoots as any)?.organisationUnits,
		loading,
		error,
	};
}

export function useOrgUnitLevelsAndGroups(): {
	levels: Array<any>;
	groups: Array<any>;
	loading: boolean;
	error: any;
} {
	const { loading, error, data } = useDataQuery(orgUnitLevelAndGroupsQuery);

	return {
		levels: (data?.orgUnitLevels as any)?.organisationUnitLevels,
		groups: (data?.orgUnitGroups as any)?.organisationUnitGroups,
		error,
		loading,
	};
}

export function useFilterOrgUnits(): FilterStateProps {
	return useContext(FilterState);
}
