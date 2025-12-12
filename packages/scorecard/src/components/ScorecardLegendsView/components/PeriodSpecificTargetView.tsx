import { colors } from "@dhis2/ui";
import { LegendsView } from "./LegendView";
import { createFixedPeriodFromPeriodId } from "@dhis2/multi-calendar-dates";
import { useCalendar } from "../../../hooks/metadata";
import type { SpecificTarget } from "../../../schemas/config";

export interface OrgUnitSpecificTargetViewProps {
	specificTarget: SpecificTarget;
	label: string;
}

export function PeriodSpecificTargetView({
	specificTarget,
	label,
}: OrgUnitSpecificTargetViewProps) {
	const items = specificTarget.items;
	const calendar = useCalendar();
	const periods = items.map((periodId) =>
		createFixedPeriodFromPeriodId({
			calendar,
			periodId,
		}),
	);

	return (
		<div
			style={{
				maxWidth: 350,
				border: `1px solid ${colors.grey400}`,
				borderRadius: 4,
				display: "flex",
				flexDirection: "column",
				gap: 8,
				padding: 16,
			}}
		>
			<div
				style={{
					gap: 4,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<b>{label}</b>
				<span style={{ color: colors.grey600, fontSize: 12 }}>
					{periods?.map((ou) => ou.displayName)?.join(", ")}
				</span>
			</div>
			<LegendsView legends={specificTarget.legends} />
		</div>
	);
}
