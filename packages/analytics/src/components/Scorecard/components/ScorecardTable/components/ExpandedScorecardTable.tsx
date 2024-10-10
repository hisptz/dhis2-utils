import { useScorecardConfig } from "../../ConfigProvider";
import type { ItemMeta } from "../../../hooks/metadata";
import { useMemo } from "react";
import { getOrgUnitLevel } from "../../../utils/orgUnits";
import type { OrgUnitSelection, ScorecardState } from "../../../schemas/config";
import { ScorecardContext } from "../../ScorecardContext";
import { CircularLoader } from "@dhis2/ui";
import { useScorecardStateValue } from "../../../state/scorecardState";
import { TableStateProvider } from "../../TableStateProvider";
import { ScorecardTable } from "../ScorecardTable";
import { ScorecardDataProvider } from "../../DataProvider";
import { ScorecardStateProvider } from "../../StateProvider";

export function ExpandedScorecardTable({
	orgUnit,
	pending,
}: {
	orgUnit: ItemMeta & { hierarchy: string };
	pending: boolean;
}) {
	const config = useScorecardConfig();
	const state = useScorecardStateValue();

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
				<ScorecardStateProvider
					config={{
						...config,
						orgUnitSelection,
					}}
					initialState={
						{
							...state,
							orgUnitSelection,
						} as ScorecardState
					}
				>
					<ScorecardContext
						key={`${orgUnit.uid}-expanded`}
						config={{
							...config,
							orgUnitSelection,
						}}
					>
						<ScorecardDataProvider>
							<TableStateProvider>
								<ScorecardTable
									scrollHeight="100%"
									scrollWidth="100%"
									width="auto"
								/>
							</TableStateProvider>
						</ScorecardDataProvider>
					</ScorecardContext>
				</ScorecardStateProvider>
			)}
		</div>
	);
}
