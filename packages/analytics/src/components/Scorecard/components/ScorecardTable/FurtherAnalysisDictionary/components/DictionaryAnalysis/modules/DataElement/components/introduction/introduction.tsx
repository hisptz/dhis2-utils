import i18n from "@dhis2/d2-i18n";
import React from "react";
import { useDataItemDetails } from "../../../../../DetailsProvider";

export default function Introduction() {
	const details = useDataItemDetails<{
		displayName: string;
		id: string;
		shortName: string;
		code: string;
		displayFormName?: string;
		href: string;
		description: string;
	}>();

	const shortName = details?.shortName;
	const code = details?.code;
	const displayFormName = details?.displayFormName;

	return (
		<div>
			<h2>{details.displayName}</h2>
			<h3> {i18n.t("Introduction")} </h3>

			<p>
				<b>{details.displayName}</b>{" "}
				{i18n.t("can be described as {{variables}}.", {
					variables: details.description,
				})}
				<br />
				{i18n.t(
					"It’s labelled in short as {{shortName}} and has a code of {{code}}. In data entry form, it’s named “{{displayFormName}}”",
					{
						shortName,
						code,
						displayFormName,
					},
				)}
				<br />
				{i18n.t("Identified by:")}{" "}
				<i>
					{" "}
					<a
						style={{ textDecoration: "none" }}
						href={details.href + ".json"}
						target={"_blank"}
						rel="noreferrer"
					>
						{details.id}
					</a>{" "}
				</i>
			</p>
		</div>
	);
}
