import { ArrowLegendsView } from "./components/ArrowLegendView";
import { SpecificTargetLegendsView } from "./components/SpecificTargetLegendsView";
import { LegendView } from "./components/LegendView";
import { useScorecardConfig } from "../ConfigProvider";
import { memo } from "react";

export const ScorecardLegendsView = memo(function ScorecardLegendsView() {
	const config = useScorecardConfig();
	const legendDefinitions = config!.legendDefinitions;

	return (
		<div
			style={{
				gap: 16,
				padding: "0 16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div
				style={{
					display: "grid",
					gap: 8,
					gridTemplateColumns: `repeat(${legendDefinitions.length}, auto)`,
				}}
			>
				{legendDefinitions.map((item) => (
					<LegendView legend={item} key={item.id} />
				))}
			</div>
			<div>
				<div
					style={{
						gap: 16,
						justifySelf: "flex-end",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<ArrowLegendsView />
					<SpecificTargetLegendsView />
				</div>
			</div>
		</div>
	);
});
