import { useDataEngine } from "@dhis2/app-runtime";
import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks/index.js";
import { CustomGoogleEngineLayer } from "../../../interfaces/index.js";
import { EarthEngineToken } from "../interfaces/index.js";
import { useState } from "react";

const googleEngineKeyQuery = {
	token: {
		resource: "tokens/google",
	},
};

export function useGoogleEngineToken() {
	const engine = useDataEngine();
	const [loading, setLoading] = useState(false);

	const getToken = async () => {
		setLoading(true);
		const token = await engine.query(googleEngineKeyQuery);
		setLoading(false);
		return token;
	};

	return {
		refresh: getToken as unknown as () => Promise<{
			token: EarthEngineToken;
		}>,
		loading,
	};
}

export default function useGoogleEngineLayer(
	layerId: string,
): CustomGoogleEngineLayer | undefined {
	const { layers } = useMapLayers();
	return find(layers as CustomGoogleEngineLayer[], ["id", layerId]);
}
