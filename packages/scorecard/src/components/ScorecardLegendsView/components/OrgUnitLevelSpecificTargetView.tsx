import { LegendsView } from "./LegendView";
import type { OrgUnitLevelLegend } from "../../../schemas/config";
import { useScorecardMeta } from "../../MetaProvider";
import { colors } from "@dhis2/ui";

export interface OrgUnitSpecificTargetViewProps {
	specificTarget: OrgUnitLevelLegend;
	label: string;
}

export function OrgUnitLevelSpecificTargetView({
	specificTarget,
	label,
}: OrgUnitSpecificTargetViewProps) {
	const meta = useScorecardMeta();
	const orgUnitLevels = meta?.orgUnitLevels ?? [];

	return (
		<div
			style={{
				borderRadius: 4,
				gap: 8,
				maxWidth: "fit-content",
				display: "flex",
				flexDirection: "column",
				padding: 16,
				fontSize: 14,
			}}
		>
			<div style={{ fontSize: 16 }}>
				<b>{label}</b>
			</div>
			<div
				style={{
					gap: 16,
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
				}}
			>
				{Object.keys(specificTarget).map((key) => {
					const orgUnitLevel = orgUnitLevels.find(
						(level) => level.id === key,
					);
					const legends = specificTarget[key];
					return (
						<div
							style={{
								border: `1px solid ${colors.grey400}`,
								padding: 16,
								borderRadius: 4,
								fontSize: 14,
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
						>
							<b>{orgUnitLevel?.displayName}</b>
							<LegendsView legends={legends} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
