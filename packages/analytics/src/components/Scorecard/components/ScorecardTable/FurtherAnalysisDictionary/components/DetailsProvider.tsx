import { createContext, type ReactNode, useContext } from "react";
import type {
	ScorecardDataSource,
	SupportedDataSources,
} from "../../../../schemas/config";
import { useDataQuery } from "@dhis2/app-runtime";
import Loader from "./DictionaryAnalysis/Shared/Componets/Loaders/Loader";
import i18n from "@dhis2/d2-i18n";

function getResourceFromType(type: SupportedDataSources) {
	switch (type) {
		case "dataElement":
			return "dataElements";
		case "indicator":
			return "indicators";
		case "dataSet":
			return "dataSets";
	}
}

function generateQuery(
	type: SupportedDataSources,
	{ fields }: { fields?: string[] },
): any {
	const resource = getResourceFromType(type);
	return {
		details: {
			resource,
			id: ({ id }: { id: string }) => id,
			params: {
				fields: fields ?? ["*"],
			},
		},
	};
}

const DataItemDetailsContext = createContext<{
	details: Record<string, any>;
} | null>(null);

export function useDataItemDetails<T>() {
	const context = useContext(DataItemDetailsContext);
	return context?.details as T;
}

export function DetailsProvider({
	children,
	dataItem,
	fields,
}: {
	dataItem: ScorecardDataSource;
	children: ReactNode;
	fields?: string[];
}) {
	const { loading, data, error } = useDataQuery<{
		details: Record<string, unknown>;
	}>(generateQuery(dataItem.type, { fields }), {
		variables: { id: dataItem.id },
	});

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	if (!data) {
		return <div>{i18n.t("Could not get data")}</div>;
	}

	return (
		<DataItemDetailsContext.Provider value={data}>
			{children}
		</DataItemDetailsContext.Provider>
	);
}
