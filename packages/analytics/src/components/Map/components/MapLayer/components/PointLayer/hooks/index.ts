import { find } from "lodash";
import { useMapLayers } from "../../../../MapProvider/hooks/index.js";
import { CustomPointLayer } from "../../../interfaces/index.js";

export function usePointLayer() {
	const { layers } = useMapLayers();
	return find(layers, ["type", "point"]) as CustomPointLayer;
}
