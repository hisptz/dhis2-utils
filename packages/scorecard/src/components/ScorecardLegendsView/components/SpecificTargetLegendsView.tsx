import { filter, groupBy, head, isEmpty } from "lodash";
import {
	Button,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
	Tab,
	TabBar,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useMemo, useState } from "react";
import { OrgUnitSpecificTargetView } from "./OrgUnitSpecificTargetView";
import { PeriodSpecificTargetView } from "./PeriodSpecificTargetView";
import { useBoolean } from "usehooks-ts";
import { OrgUnitLevelSpecificTargetView } from "./OrgUnitLevelSpecificTargetView";
import { getDataSourcesFromGroups } from "../../../utils/dataSources";
import { useScorecardConfig } from "../../ConfigProvider";
import type {
	OrgUnitLevelLegend,
	ScorecardDataSource,
} from "../../../schemas/config";
import { useGetDataSourceLabel } from "../../../hooks";

export function SpecificTargetsLibrary() {
	const config = useScorecardConfig();
	const dataSources = getDataSourcesFromGroups(
		config.dataSelection.dataGroups,
	);
	const { orgUnit, orgUnitLevel, periods } = useMemo(() => {
		const dataSourcesWithSpecificTargets = dataSources.filter(
			(ds) => ds.specificTargetsSet,
		);
		const data = groupBy(
			filter(
				dataSourcesWithSpecificTargets,
				(ds) => !isEmpty(ds.specificTargets),
			),
			(ds) => head(ds.specificTargets)?.type,
		);

		console.log({ data });

		data["orgUnitLevel"] = dataSourcesWithSpecificTargets.filter((ds) =>
			isEmpty(ds.specificTargets),
		);
		return data as {
			periods: Array<ScorecardDataSource> | undefined;
			orgUnit: Array<ScorecardDataSource> | undefined;
			orgUnitLevel: Array<ScorecardDataSource>;
		};
	}, [dataSources]);

	const [activeTab, setActiveTab] = useState<
		"period" | "orgUnit" | "orgUnitLevel"
	>(
		!isEmpty(orgUnit)
			? "orgUnit"
			: !isEmpty("orgUnitLevel")
				? "orgUnitLevel"
				: "period",
	);

	const getDataSourceLabel = useGetDataSourceLabel();
	return (
		<>
			<div className="column gap-16">
				<TabBar>
					{!isEmpty(orgUnit) && (
						<Tab
							selected={activeTab === "orgUnit"}
							onClick={() => setActiveTab("orgUnit")}
						>
							{i18n.t("Organisation Units")}
						</Tab>
					)}
					{!isEmpty(orgUnitLevel) && (
						<Tab
							selected={activeTab === "orgUnitLevel"}
							onClick={() => setActiveTab("orgUnitLevel")}
						>
							{i18n.t("Organisation Unit Level")}
						</Tab>
					)}
					{!isEmpty(periods) && (
						<Tab
							selected={activeTab === "period"}
							onClick={() => setActiveTab("period")}
						>
							{i18n.t("Period")}
						</Tab>
					)}
				</TabBar>
				{activeTab === "orgUnit" && (
					<div>
						<h3>{i18n.t("Organisation Units Specific targets")}</h3>
						<div className="row gap-16">
							{orgUnit?.map((dataSource) => (
								<>
									<OrgUnitSpecificTargetView
										key={`${dataSource.id}-orgUnit-specific-target`}
										specificTarget={
											head(dataSource.specificTargets)!
										}
										label={getDataSourceLabel(dataSource)}
									/>
									<div className="page-break" />
								</>
							))}
						</div>
						<div className="page-break" />
					</div>
				)}
				{activeTab === "period" && (
					<div>
						<h3>{i18n.t("Period Specific targets")}</h3>
						<div className="row gap-16">
							{periods?.map((dataSource) => (
								<>
									<PeriodSpecificTargetView
										key={`${dataSource.id}-orgUnit-specific-target`}
										specificTarget={
											head(dataSource.specificTargets)!
										}
										label={getDataSourceLabel(dataSource)}
									/>
									<div className="page-break" />
								</>
							))}
						</div>
						<div className="page-break" />
					</div>
				)}
				{activeTab === "orgUnitLevel" && (
					<div>
						<h3>{i18n.t("Organisation Unit Level Targets")}</h3>
						<div className="column gap-16">
							{orgUnitLevel.map((dataSource) => (
								<OrgUnitLevelSpecificTargetView
									key={`${dataSource.id}-orgUnit-specific-target`}
									specificTarget={
										dataSource.legends as OrgUnitLevelLegend
									}
									label={getDataSourceLabel(dataSource)}
								/>
							))}
						</div>
						<div className="page-break" />
					</div>
				)}
			</div>
		</>
	);
}

function SpecificTargetLegendsModal({
	hide,
	onClose,
}: {
	hide: boolean;
	onClose: () => void;
}) {
	return (
		<Modal large position="middle" hide={hide} onClose={onClose}>
			<ModalTitle>{i18n.t("Specific targets")}</ModalTitle>
			<ModalContent>
				<SpecificTargetsLibrary />
			</ModalContent>
			<ModalActions>
				<Button onClick={onClose}>{i18n.t("Close")}</Button>
			</ModalActions>
		</Modal>
	);
}

export function SpecificTargetLegendsView() {
	const config = useScorecardConfig();
	const {
		value: hide,
		setTrue: onClose,
		setFalse: onShow,
	} = useBoolean(true);
	const dataSources = getDataSourcesFromGroups(
		config.dataSelection.dataGroups,
	);
	const dataSourcesWithSpecificTargets = dataSources.filter(
		(dataSource) =>
			!isEmpty(dataSource.specificTargets) ||
			!Array.isArray(dataSource.legends),
	);

	if (isEmpty(dataSourcesWithSpecificTargets)) {
		return null;
	}

	return (
		<>
			{!hide && (
				<SpecificTargetLegendsModal hide={hide} onClose={onClose} />
			)}
			<Button className="print-hide" onClick={onShow}>
				{i18n.t("Specific Targets Library")}
			</Button>
		</>
	);
}
