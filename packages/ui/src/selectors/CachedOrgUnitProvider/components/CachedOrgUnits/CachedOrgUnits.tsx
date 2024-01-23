import { CustomDataProvider, useDataEngine } from "@dhis2/app-runtime";
import React from "react";
import { db } from "../../services/db.js";
import { getData, getOrgUnits } from "./services/index.js";

export function CachedOrgUnits({ children }: { children: React.ReactNode }) {
	const engine = useDataEngine();

	if (!db) {
		throw new Error(
			"Database not instantiated. Make sure this component is wrapped in an <CachedOrgUnitProvider /> component",
		);
	}
	if (!db.isCachingComplete()) {
		return <>{children}</>;
	}

	return (
		<CustomDataProvider
			data={{
				organisationUnits: (type, query, options) => {
					return getOrgUnits(db.organisationUnits, query, {
						engine,
					}) as any;
				},
				organisationUnitGroups: (type, query, options) => {
					return getData(db.organisationUnitGroups, query, {
						engine,
					}) as any;
				},
				organisationUnitLevels: (type, query, options) => {
					return getData(db.organisationUnitLevels, query, {
						engine,
					}) as any;
				},
			}}
		>
			{children}
		</CustomDataProvider>
	);
}

export function CustomOrgUnitProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <CachedOrgUnits>{children}</CachedOrgUnits>;
}
