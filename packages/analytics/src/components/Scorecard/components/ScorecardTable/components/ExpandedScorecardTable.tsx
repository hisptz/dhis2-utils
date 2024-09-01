import { useScorecardConfig } from "../../ConfigProvider";
import type { ItemMeta } from "../../../hooks/metadata";
import { useMemo } from "react";
import { getOrgUnitLevel } from "../../../utils/orgUnits";
import type { OrgUnitSelection } from "../../../schemas/config";
import { Scorecard } from "../../../Scorecard";
import { ScorecardContext } from "../../ScorecardContext";
import { useScorecardState } from "../../StateProvider";

export function ExpandedScorecardTable({
	orgUnit,
}: {
	orgUnit: ItemMeta & { hierarchy: string };
}) {
	const config = useScorecardConfig();
	const state = useScorecardState();

	const orgUnitSelection: OrgUnitSelection = useMemo(() => {
		const orgUnitId = orgUnit.uid;
		const level = getOrgUnitLevel(orgUnit) + 1;

		return {
			orgUnits: [
				{
					id: orgUnitId,
				},
			],
			levels: [level.toString()],
			groups: [],
		};
	}, [orgUnit]);

	if (!config) {
		return null;
	}

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				minHeight: 400,
				padding: 32,
			}}
		>
			<ScorecardContext
				key={`${orgUnit.uid}-expanded`}
				config={{
					...config,
					orgUnitSelection,
				}}
				initialState={{
					...state,
					orgUnitSelection,
				}}
			>
				<Scorecard
					tableProps={{
						scrollWidth: "100%",
						scrollHeight: "100%",
						width: "auto",
					}}
				/>
			</ScorecardContext>
		</div>
	);
}
