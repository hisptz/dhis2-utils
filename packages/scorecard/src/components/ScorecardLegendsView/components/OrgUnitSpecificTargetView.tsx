import type { SpecificTarget } from "../../../schemas/config";
import { CircularLoader, colors } from "@dhis2/ui";
import { LegendsView } from "./LegendView";
import { useOrgUnits } from "../../../hooks/orgUnit";

export interface OrgUnitSpecificTargetViewProps {
	specificTarget: SpecificTarget;
	label: string;
}

export function OrgUnitSpecificTargetView({
	specificTarget,
	label,
}: OrgUnitSpecificTargetViewProps) {
	const items = specificTarget.items;
	const { loading, orgUnits } = useOrgUnits(items);

	if (loading) {
		return (
			<div
				style={{ minWidth: 200, minHeight: 200 }}
				className="column align-items-center justify-content-center"
			>
				<CircularLoader extrasmall />
			</div>
		);
	}

	return (
		<div
			style={{
				maxWidth: "fit-content",
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
					display: "flex",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<b>{label}</b>
				<span style={{ color: colors.grey600, fontSize: 12 }}>
					{orgUnits?.map((ou) => ou.displayName)?.join(", ")}
				</span>
			</div>
			<LegendsView legends={specificTarget.legends} />
		</div>
	);
}
