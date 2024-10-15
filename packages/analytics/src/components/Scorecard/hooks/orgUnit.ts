import { useScorecardMeta } from "../components";
import { useEffect, useMemo } from "react";
import { isEmpty, last, sortBy } from "lodash";
import type {
	OrganisationUnit,
	OrganisationUnitLevel,
} from "@hisptz/dhis2-utils";
import { useDataQuery } from "@dhis2/app-runtime";
import { useUpdateEffect } from "usehooks-ts";

export function useLowestOrgUnitLevel() {
	const meta = useScorecardMeta();

	return useMemo(() => {
		const sortedOrgUnitLevels = sortBy(meta?.orgUnitLevels ?? [], "level");
		return last(sortedOrgUnitLevels);
	}, [meta?.orgUnitLevels]);
}

const orgUnitQuery: any = {
	ou: {
		resource: `organisationUnits`,
		params: ({ ids }: { ids: string[] }) => {
			return {
				filter: `id:in:[${ids.join(",")}]`,
				fields: ["id", "displayName", "path", "level"],
			};
		},
	},
};

type OrgUnitResponse = {
	ou: {
		organisationUnits: Array<OrganisationUnit>;
	};
};

export function useOrgUnits(initialIds?: string[]) {
	const { refetch, data, loading } = useDataQuery<OrgUnitResponse>(
		orgUnitQuery,
		{
			variables: {
				ids: initialIds,
			},
			lazy: isEmpty(initialIds),
		},
	);

	useUpdateEffect(() => {
		if (initialIds) {
			refetch({ ids: initialIds }).catch(console.error);
		}
	}, [refetch, initialIds]);

	return {
		loading,
		orgUnits: data?.ou?.organisationUnits,
		refetch,
	};
}

const orgUnitLevelQuery = {
	level: {
		resource: "organisationUnitLevels",
		params: ({ ids }: any) => {
			return {
				fields: ["id", "displayName", "level"],
				filter: [`id:in:[${ids.join(",")}]`],
			};
		},
	},
};

export function useOrgUnitLevels(initialIds?: string[] | null) {
	const { refetch, data, loading } = useDataQuery<{
		level: { organisationUnitLevels: OrganisationUnitLevel[] };
	}>(orgUnitLevelQuery, {
		variables: {
			id: initialIds,
		},
		lazy: true,
	});

	useEffect(() => {
		if (!isEmpty(initialIds)) {
			refetch({ ids: initialIds }).catch(console.error);
		}
	}, [refetch, initialIds]);

	return {
		loading,
		levels: data?.level?.organisationUnitLevels,
		refetch,
	};
}
