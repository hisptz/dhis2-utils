import { useScorecardConfig } from "../../ConfigProvider";
import { useScorecardState } from "../../StateProvider";
import type { ItemMeta } from "../../../hooks/metadata";
import { useMemo, useState } from "react";
import { getOrgUnitLevel } from "../../../utils/orgUnits";
import type { OrgUnitSelection, ScorecardState } from "../../../schemas/config";
import { Scorecard } from "../../../Scorecard";
import { ScorecardContext } from "../../ScorecardContext";

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

	const [scorecardState, setScorecardState] = useState<ScorecardState>({
		...state!,
		orgUnitSelection,
	});

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
			<ScorecardContext config={config}>
				<Scorecard />
			</ScorecardContext>
		</div>
	);
}
