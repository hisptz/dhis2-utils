import { EarthEngineLayerConfig } from "../MapLayer/interfaces";
import { FormProvider, UseFormReturn } from "react-hook-form";
import React from "react";
import { StylesConfig } from "./components/StylesConfig.js";
import { Name } from "./components/Name.js";
import { TypeField } from "./components/TypeField.js";
import { AggregationSelector } from "./components/AggregationSelector.js";
import { PeriodSelector } from "./components/PeriodSelector.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 16,
					}}
				>
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
