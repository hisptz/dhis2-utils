import i18n from "@dhis2/d2-i18n";
import React from "react";
import { useDataItemDetails } from "../../../../../DetailsProvider";

export default function DataSource() {
	const details = useDataItemDetails<{
		dataSets: Array<{
			id: string;
			displayName: string;
			periodType: string;
			timelyDays: string;
		}>;
	}>();
	return (
		<div>
			<h3>{i18n.t("Data sources (Datasets/Programs)")}</h3>
			<p>{i18n.t("Indicator is captured from the following sources,")}</p>
			<h5>{i18n.t("Datasets")}</h5>

			<ul>
				{details.dataSets.map((dataSet) => {
					const periodType = dataSet?.periodType;
					const timelyDays = dataSet?.timelyDays;

					return (
						<li key={dataSet?.id}>
							<b>{dataSet?.displayName}</b>{" "}
							{i18n.t(
								"submitting {{periodType}} after every {{timelyDays}} days",
								{
									periodType,
									timelyDays,
								},
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
