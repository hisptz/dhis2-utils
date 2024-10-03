import { useScorecardConfig } from "../../ConfigProvider";
import type { ItemMeta } from "../../../hooks/metadata";
import { useMemo } from "react";
import { getOrgUnitLevel } from "../../../utils/orgUnits";
import type { OrgUnitSelection } from "../../../schemas/config";
import { Scorecard } from "../../../Scorecard";
import { ScorecardContext } from "../../ScorecardContext";
import { useScorecardState } from "../../StateProvider";
import { CircularLoader } from "@dhis2/ui";

export function ExpandedScorecardTable({
	orgUnit,
	pending,
}: {
	orgUnit: ItemMeta & { hierarchy: string };
	pending: boolean;
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
				minHeight: 500,
				padding: 32,
			}}
		>
			{pending ? (
				<div
					style={{
						height: "100%",
						width: "100%",
						minHeight: 500,
						padding: 32,
					}}
				>
					<CircularLoader small />
				</div>
			) : (
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
			)}
		</div>
	);
}
