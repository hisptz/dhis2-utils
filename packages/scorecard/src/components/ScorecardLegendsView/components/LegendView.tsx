import { useScorecardConfig } from "../../ConfigProvider";
import type {
	LegendDefinition,
	ScorecardLegend,
} from "../../../schemas/config";
import { colors } from "@dhis2/ui";

export interface LegendsViewProps {
	legends: ScorecardLegend[];
}

const formatNumber = Intl.NumberFormat("en-GB", {
	notation: "standard",
}).format;

function LegendItem({
	legend,
	legendDefinitions,
}: {
	legend: ScorecardLegend;
	legendDefinitions: LegendDefinition[];
}) {
	const legendDefinition = legendDefinitions.find(
		({ id }) => id === legend.legendDefinitionId,
	);
	if (!legendDefinition) {
		return null;
	}

	return (
		<div
			style={{
				display: "flex",
				gap: 8,
				alignItems: "stretch",
				width: "100%",
			}}
		>
			<div
				style={{
					alignSelf: "stretch",
					backgroundColor: legendDefinition.color,
					width: 8,
					minHeight: "100%",
				}}
			></div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<span>{legendDefinition.name}</span>
				<div
					style={{
						display: "flex",
						gap: 4,
						fontSize: 11,
						color: colors.grey600,
					}}
				>
					<div className="legend-item-label">{`${formatNumber(+legend.startValue)} - ${formatNumber(+legend.endValue)}`}</div>
				</div>
			</div>
		</div>
	);
}

export function LegendsView({ legends }: LegendsViewProps) {
	const config = useScorecardConfig();
	const legendDefinitions = config.legendDefinitions ?? [];

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
				fontSize: 14,
			}}
		>
			{legends.map((legend) => (
				<LegendItem
					key={legend.id}
					legend={legend}
					legendDefinitions={legendDefinitions}
				/>
			))}
		</div>
	);
}

export interface LegendViewProps {
	legend: LegendDefinition;
}

export function LegendView({ legend }: LegendViewProps) {
	const { color, name, id } = legend;
	return (
		<div
			key={id}
			style={{ display: "grid", gap: 8, gridTemplateColumns: "auto 1fr" }}
		>
			<div
				style={{
					width: 60,
					height: 25,
					background: color,
					border: "1px solid rgb(232, 237, 242)",
					padding: 16,
				}}
			/>
			<p style={{ paddingLeft: 8, marginRight: 8 }}>{name}</p>
		</div>
	);
}
