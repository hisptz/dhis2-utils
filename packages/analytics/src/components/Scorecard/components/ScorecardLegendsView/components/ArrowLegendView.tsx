import { IconArrowDown24, IconArrowUp24 } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useScorecardViewOptionValue } from "../../../state/scorecardState";

export function ArrowLegendsView(props: any) {
	const showArrows = useScorecardViewOptionValue("arrows");

	if (!showArrows) {
		return null;
	}

	return (
		<div
			style={{ gap: 16, display: "grid", gridTemplateColumns: "1fr 1fr" }}
		>
			<div style={{ gap: 8, display: "flex", alignItems: "center" }}>
				<IconArrowUp24 />
				{i18n.t("Increased from last period")}
			</div>
			<div style={{ gap: 8, display: "flex", alignItems: "center" }}>
				<IconArrowDown24 />
				{i18n.t("Decreased from last period")}
			</div>
		</div>
	);
}
