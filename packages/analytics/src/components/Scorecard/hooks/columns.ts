import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useScorecardConfig, useScorecardMeta } from "../components";
import { useMemo } from "react";
import {
	type ScorecardState,
	type ScorecardTableCellConfig,
	type ScorecardTableData,
} from "../schemas/config";
import {
	getAverageColumn,
	getDataColumnHeaders,
	getOrgUnitColumnHeaders,
} from "../utils/columns";
import { LabelCell } from "../components/ScorecardTable/components/TableHeader/components/LabelCell";
import { NumberCell } from "../components/ScorecardTable/components/TableHeader/components/NumberCell";
import { MetaHeaderCell } from "../components/ScorecardTable/components/TableHeader/components/MetaHeaderCell";
import { useCalendar } from "./metadata";
import { MetaFooterCell } from "../components/ScorecardTable/components/MetaFooterCell";
import { getOrgUnitLevel } from "../utils/orgUnits";
import { useLowestOrgUnitLevel } from "./orgUnit";
import { useScorecardData } from "../components/DataProvider";
import { useScorecardStateSelectorValue } from "../state/scorecardState";
import { ExpandCell } from "../components/ScorecardTable/components/TableHeader/components/ExpandCell";

const columnHelper = createColumnHelper<ScorecardTableData>();

export function useMetaColumns() {
	const showDataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);

	const disableExpanding = useScorecardStateSelectorValue<boolean>([
		"options",
		"disableExpanding",
	]);

	const lowestLevel = useLowestOrgUnitLevel();

	return useMemo(() => {
		const metaColumns: ColumnDef<ScorecardTableData, any>[] = [
			columnHelper.accessor(
				(rowData) => {
					if (disableExpanding) {
						return false;
					}

					if (showDataInRows) {
						return false;
					}

					if (!lowestLevel) {
						return false;
					}

					const orgUnit = rowData.orgUnit;
					if (!orgUnit) {
						return false;
					}
					const ouLevel = getOrgUnitLevel(orgUnit);

					return ouLevel !== lowestLevel.level;
				},
				{
					id: "expand",
					header: () => null,
					meta: {
						isMeta: true,
						fixed: true,
						label: "",
					},
					enableHiding: true,
					enableColumnFilter: false,
					cell: ExpandCell,
					size: 48,
					footer: () => null,
				},
			),
			columnHelper.accessor(
				(_, index) => {
					return index + 1;
				},
				{
					id: "count",
					header: () => null,
					meta: {
						isMeta: true,
						fixed: true,
						label: "",
					},
					enableHiding: true,
					enableColumnFilter: false,
					cell: NumberCell,
					size: 48,
					footer: () => null,
				},
			),
		];

		if (showDataInRows) {
			metaColumns.push(
				columnHelper.accessor(
					(rowData) => {
						return rowData;
					},
					{
						header: () => null,
						id: "dataItems",
						meta: {
							filterable: true,
						},
						enableColumnFilter: true,
						cell: LabelCell,
						size: 300,
						footer: MetaFooterCell,
					},
				),
			);
		} else {
			metaColumns.push(
				columnHelper.accessor(
					(rowData) => {
						return rowData;
					},
					{
						header: () => null,
						id: "orgUnits",
						enableColumnFilter: true,
						meta: {
							isMeta: true,
							fixed: true,
						},
						cell: LabelCell,
						size: 300,
						footer: MetaFooterCell,
					},
				),
			);
		}

		return metaColumns;
	}, [showDataInRows, disableExpanding]);
}

export function useTableColumns(): ColumnDef<
	ScorecardTableData,
	ScorecardTableCellConfig
>[] {
	const config = useScorecardConfig();
	const { data: dataEngine } = useScorecardData();
	const meta = useScorecardMeta();
	const metaColumns = useMetaColumns();
	const calendar = useCalendar();
	const showDataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);
	const periodSelection =
		useScorecardStateSelectorValue<ScorecardState["periodSelection"]>(
			"periodSelection",
		);

	const orgUnitSelection =
		useScorecardStateSelectorValue<ScorecardState["orgUnitSelection"]>(
			"orgUnitSelection",
		);

	if (!config || !meta) {
		return [];
	}
	return useMemo(() => {
		const columns: ColumnDef<ScorecardTableData, any>[] = [
			columnHelper.group({
				id: "metaHeader",
				columns: metaColumns,
				header: MetaHeaderCell,
				footer: () => null,
			}),
		];

		if (showDataInRows) {
			columns.push(
				...getOrgUnitColumnHeaders({
					meta,
					calendar,
					dataEngine,
				}),
			);
		} else {
			columns.push(
				...getDataColumnHeaders({
					meta,
					config,
					calendar,
					dataEngine,
				}),
			);
		}

		columns.push(
			getAverageColumn({
				meta,
				config,
			}),
		);

		return columns;
	}, [showDataInRows, periodSelection, orgUnitSelection]);
}
