import type { FurtherAnalysisConfig } from "../components/FurtherAnalysisModal";
import i18n from "@dhis2/d2-i18n";

export interface FurtherAnalysisVisualizationProps {
	config: FurtherAnalysisConfig;
}

export function FurtherAnalysisDictionary({
	config,
}: FurtherAnalysisVisualizationProps) {
	return (
		<div
			style={{
				width: "100%",
				padding: 32,
				minHeight: 500,
				maxHeight: "80dvh",
			}}
		>
			{i18n.t("To be implemented")}
		</div>
	);
}
