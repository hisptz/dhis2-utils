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
import { Visualization } from "../../../../Visualization";
import { getOrgUnitsForAnalytics } from "../../../utils/orgUnits";

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
	const orgUnits = getOrgUnitsForAnalytics(config.orgUnitSelection);
	const periods = config.periodSelection.periods.map(({ id }) => id);
	const dataItems = config.dataSources.map(({ id }) => id);

	return (
		<Modal onClose={onClose} hide={hide} large position="middle">
			<ModalTitle>{i18n.t("Further Analysis")}</ModalTitle>
			<ModalContent>
				<div
					style={{
						width: "100%",
						height: 400,
						padding: 32,
						minHeight: 500,
						maxHeight: "80dvh",
					}}
				>
					<Visualization
						height={400}
						layout={{
							columns: ["dx"],
							filters: ["pe"],
							rows: ["ou"],
						}}
						showToolbar
						showOrgUnitSelector
						showPeriodSelector
						defaultVisualizationType={"chart"}
						dimensions={{
							ou: orgUnits,
							pe: periods,
							dx: dataItems,
						}}
						config={{
							chart: {
								type: "column",
								layout: {
									filter: ["pe"],
									category: ["ou"],
									series: ["dx"],
								},
							},
							pivotTable: {},
						}}
					/>
				</div>
			</ModalContent>
			<ModalActions>
				<Button onClick={onClose}>{i18n.t("Close")}</Button>
			</ModalActions>
		</Modal>
	);
}
