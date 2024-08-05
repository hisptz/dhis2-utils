import i18n from "@dhis2/d2-i18n";
import {
	DataTable,
	DataTableCell,
	DataTableColumnHeader,
	DataTableRow,
	TableBody,
	TableHead,
} from "@dhis2/ui";
import React from "react";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";
import { dataTypes } from "../../../../../../Utils/Models";
import { useDataItemDetails } from "../../../../../../../DetailsProvider";
import { useScorecardMeta } from "../../../../../../../../../../MetaProvider";
import { useConfig } from "@dhis2/app-runtime";

export default function OtherDetailTable() {
	const { baseUrl } = useConfig();
	const details = useDataItemDetails<{
		style: {
			color: string;
			icon: string;
		};
		optionSetValue: Record<string, unknown>;
		legendSets?: Array<{
			id: string;
			displayName: string;
		}>;
	}>();
	const meta = useScorecardMeta();
	const orgUnitLevels = meta?.orgUnitLevels ?? [];

	return (
		<DataTable>
			<TableHead>
				<DataTableRow>
					<DataTableColumnHeader></DataTableColumnHeader>
					<DataTableColumnHeader>
						{i18n.t("Color")}
					</DataTableColumnHeader>
					<DataTableColumnHeader>
						{i18n.t(" Icon")}
					</DataTableColumnHeader>
					<DataTableColumnHeader>
						{i18n.t("Option set")}
					</DataTableColumnHeader>
					<DataTableColumnHeader>
						{i18n.t("Option set for Comments")}
					</DataTableColumnHeader>
					<DataTableColumnHeader>
						{i18n.t("Legends")}
					</DataTableColumnHeader>
					<DataTableColumnHeader>
						{i18n.t("Aggregation Levels")}
					</DataTableColumnHeader>
				</DataTableRow>
			</TableHead>
			<TableBody>
				<DataTableRow>
					<DataTableCell bordered tag="th">
						{i18n.t("Details")}
					</DataTableCell>
					<DataTableCell
						bordered
						style={{
							background: details?.style?.color,
							width: "inherit",
							height: 50,
						}}
					>
						{typeof details?.style?.color === dataTypes.UNDEFINED
							? i18n.t("no color")
							: ""}
					</DataTableCell>
					<DataTableCell bordered>
						{typeof details?.style?.icon === dataTypes.UNDEFINED ? (
							i18n.t("no icon")
						) : (
							<img
								src={`${baseUrl}/api/icons/${detail?.style?.icon}/icon.svg`}
								alt={"icon"}
							/>
						)}
					</DataTableCell>
					<DataTableCell bordered>
						{JSON.stringify(details?.optionSetValue)}
					</DataTableCell>
					<DataTableCell bordered>
						{details?.commentOptionSet?.displayName ??
							"no comments"}
					</DataTableCell>
					<DataTableCell bordered>
						{details?.legendSets?.length === 0 ? (
							i18n.t("No legends assigned")
						) : (
							<ol>
								{details?.legendSets?.map((legend) => {
									return (
										<li key={legend.id}>
											{legend?.displayName}
										</li>
									);
								})}
							</ol>
						)}
					</DataTableCell>
					<DataTableCell bordered>
						{loading ? (
							<Loader text={""} />
						) : error ? (
							<Error error={error} />
						) : data?.orgUnitLevels?.organisationUnitLevels
								?.length === 0 ? (
							i18n.t("No organization unit level assigned")
						) : (
							<ol>
								{data?.orgUnitLevels?.organisationUnitLevels?.map(
									(lev) => {
										return (
											<li key={lev?.id}>
												{lev?.displayName}
											</li>
										);
									},
								)}
							</ol>
						)}
					</DataTableCell>
				</DataTableRow>
			</TableBody>
		</DataTable>
	);
}
