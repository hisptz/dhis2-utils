import { find } from "lodash";
import { useContext } from "react";
import { MapLayersContext } from "../../../../../state/index.js";
import { CustomThematicLayer } from "../../../interfaces/index.js";

export default function useThematicLayer(
	layerId: string,
): CustomThematicLayer | undefined {
	const { layers } = useContext(MapLayersContext);

	return find(layers as CustomThematicLayer[], ["id", layerId]);
}
