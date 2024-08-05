import i18n from "@dhis2/d2-i18n";
import {
	DataTable,
	DataTableColumnHeader,
	DataTableRow,
	TableBody,
	TableHead,
} from "@dhis2/ui";
import React from "react";
import IndicatorGroupRow from "./indicatorGroupRow";
import { useDataItemDetails } from "../../../../../DetailsProvider";
import { isEmpty } from "lodash";

export default function IndicatorFacts() {
	const details = useDataItemDetails<{
		indicatorGroups: Array<{
			id: string;
			displayName: string;
			indicators: Array<{
				id: string;
				displayName: string;
			}>;
		}>;
	}>();

	if (isEmpty(details.indicatorGroups)) {
		return (
			<p>
				{i18n.t(
					" There are no indicator facts associated with this indicator",
				)}
			</p>
		);
	}

	let count = 0;
	return (
		<div>
			<h3>{i18n.t("Indicator facts")}</h3>

			<p>{i18n.t("Belongs to the following groups of indicators")}</p>

			<div>
				<DataTable>
					<TableHead>
						<DataTableRow>
							<DataTableColumnHeader>#</DataTableColumnHeader>
							<DataTableColumnHeader>
								{i18n.t("Name")}
							</DataTableColumnHeader>
							<DataTableColumnHeader>
								{i18n.t("Code")}
							</DataTableColumnHeader>
							<DataTableColumnHeader>
								{i18n.t("Indicators")}
							</DataTableColumnHeader>
						</DataTableRow>
					</TableHead>
					<TableBody>
						{details.indicatorGroups?.map((group) => {
							count++;
							return (
								<IndicatorGroupRow
									key={group?.id}
									no={count}
									name={group?.displayName}
									code={group?.id}
									indicators={group?.indicators}
								/>
							);
						})}
					</TableBody>
				</DataTable>
			</div>
		</div>
	);
}
