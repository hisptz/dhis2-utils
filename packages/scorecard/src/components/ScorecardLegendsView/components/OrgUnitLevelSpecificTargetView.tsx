import i18n from "@dhis2/d2-i18n";
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
				<b>{i18n.t("Data Source")}: </b>
				{label}
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
								border: `1px solid ${colors.grey600}`,
								padding: 16,
								borderRadius: 4,
								fontSize: 14,
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 4,
								}}
							>
								<div>
									<b>{i18n.t("Organisation Unit Level")}: </b>
									{orgUnitLevel?.displayName}
								</div>
							</div>
							<LegendsView legends={legends} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
