import { EarthEngineLayerConfig } from "../MapLayer/interfaces";
import { FormProvider, UseFormReturn } from "react-hook-form";
import React from "react";
import { StylesConfig } from "./components/StylesConfig";
import { Name } from "./components/Name";
import { TypeField } from "./components/TypeField";
import { AggregationSelector } from "./components/AggregationSelector";
import { PeriodSelector } from "./components/PeriodSelector";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export interface EarthEngineLayerConfigurationProps {
	form: UseFormReturn<EarthEngineLayerConfig>;
	excluded?: string[];

	[key: string]: any;
}

export function EarthEngineLayerConfiguration({
	form,
	excluded,
}: EarthEngineLayerConfigurationProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<FormProvider {...form}>
				<div className="column gap-16">
					<TypeField excluded={excluded} />
					<Name />
					<AggregationSelector />
					<PeriodSelector />
					<StylesConfig />
				</div>
			</FormProvider>
		</QueryClientProvider>
	);
}
