import type {
	OrgUnitSelection,
	PeriodSelection,
	ScorecardDataSource,
} from "../../../schemas/config";
import {
	Button,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useState } from "react";
import { FurtherAnalysisVisualization } from "../FurtherAnalysisVisualization";
import { FurtherAnalysisDictionary } from "../FurtherAnalysisDictionary";

export interface FurtherAnalysisConfig {
	orgUnitSelection: OrgUnitSelection;
	periodSelection: PeriodSelection;
	dataSources: ScorecardDataSource[];
}

export interface FurtherAnalysisProps {
	hide: boolean;
	onClose: () => void;
	config: FurtherAnalysisConfig;
}

export function FurtherAnalysis({
	hide,
	onClose,
	config,
}: FurtherAnalysisProps) {
	const [activeElement, setActiveElement] = useState<
		"visualization" | "dictionary" | undefined
	>("visualization");

	return (
		<Modal onClose={onClose} hide={hide} large position="middle">
			<ModalTitle>{i18n.t("Further Analysis")}</ModalTitle>
			<ModalContent>
				{/*<SegmentedControl*/}
				{/*	options={[*/}
				{/*		{*/}
				{/*			value: "visualization",*/}
				{/*			label: i18n.t("Visualization"),*/}
				{/*		},*/}
				{/*		{*/}
				{/*			value: "dictionary",*/}
				{/*			label: i18n.t("Dictionary"),*/}
				{/*		},*/}
				{/*	]}*/}
				{/*	selected={activeElement!}*/}
				{/*	onChange={({ value }) =>*/}
				{/*		setActiveElement(*/}
				{/*			value as "visualization" | "dictionary",*/}
				{/*		)*/}
				{/*	}*/}
				{/*/>*/}
				<div
					style={{
						width: "100%",
						height: "100%",
						flexDirection: "column",
						display: "flex",
					}}
				>
					<div
						style={{
							flex: 1,
							width: "100%",
							height: "100%",
						}}
					>
						{activeElement === "dictionary" && (
							<FurtherAnalysisDictionary
								config={config}
							></FurtherAnalysisDictionary>
						)}
						{activeElement === "visualization" && (
							<FurtherAnalysisVisualization config={config} />
						)}
					</div>
				</div>
			</ModalContent>
			<ModalActions>
				<Button onClick={onClose}>{i18n.t("Close")}</Button>
			</ModalActions>
		</Modal>
	);
}
