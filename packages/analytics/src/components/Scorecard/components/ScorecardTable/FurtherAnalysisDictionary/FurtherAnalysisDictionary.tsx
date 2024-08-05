import type { FurtherAnalysisConfig } from "../components/FurtherAnalysisModal";
import DictionaryAnalysis from "./components/DictionaryAnalysis";

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
			<DictionaryAnalysis dataSources={config.dataSources} />
		</div>
	);
}
