import { EarthEngineOptions } from "../../MapLayer/components/GoogleEngineLayer/interfaces";
import { useGoogleEngineToken } from "../../MapLayer/components/GoogleEngineLayer/hooks";
import { EarthEngine } from "../../MapLayer/components/GoogleEngineLayer/services/engine";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { find } from "lodash";
import { EARTH_ENGINE_LAYERS } from "../../MapLayer/components/GoogleEngineLayer/constants";

export function useDatasetInfo(
	shouldRun: boolean,
	config?: EarthEngineOptions,
) {
	const { refresh } = useGoogleEngineToken();

	async function getInfo() {
		if (config) {
			const tokenData = await refresh();
			await EarthEngine.setToken(tokenData.token, refresh);
			const engine = new EarthEngine({
				options: config,
			});
			return engine.getPeriod();
		}
	}

	const { data, error, isLoading } = useQuery([config], getInfo);

	const periods = useMemo(() => {
		const features = (data as any)?.features;
		return features?.map((feature: any) => {
			return new Date(
				feature?.properties["system:time_start"],
			)?.getFullYear();
		});
	}, [data]);

	return {
		loading: isLoading,
		error: error as any,
		periods,
	};
}

export function useType() {
	const type = useWatch({
		name: "type",
	});
	return find(EARTH_ENGINE_LAYERS, ["id", type]);
}
