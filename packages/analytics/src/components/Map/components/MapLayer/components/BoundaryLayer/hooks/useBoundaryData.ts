import { useMapOrganisationUnit } from "../../../../MapProvider/hooks/index.js";

export function useBoundaryData() {
	const { orgUnits } = useMapOrganisationUnit();

	return orgUnits;
}
