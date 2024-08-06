import i18n from "@dhis2/d2-i18n";
import React from "react";
import classes from "./introduction.module.css";
import { useDataItemDetails } from "../../../../../DetailsProvider";

export default function Introduction() {
	const details = useDataItemDetails<{
		name: string;
		id: string;
		displayName: string;
		numerator: string;
		numeratorDescription: string;
		denominator: string;
		denominatorDescription: string;
		indicatorType: {
			displayName: string;
		};
		displayDescription: string;
	}>();

	return (
		<div>
			<h2 id={"test-indicator-details"}>{details?.name} </h2>
			<h3>{i18n.t("Introduction")}</h3>
			<p>
				<b id={"test-indicator-details"}>{details?.name} </b>
				{i18n.t("is a")}
				<b> {details?.indicatorType?.displayName} </b>
				{i18n.t("indicator, measured by")}
				<b id={"test-indicator-details"}>
					{" "}
					{details?.numeratorDescription}{" "}
				</b>
				{i18n.t("to")}
				<b id={"test-indicator-details"}>
					{" "}
					{details?.denominatorDescription}{" "}
				</b>
			</p>
			<p id={"test-indicator-details"}>
				{i18n.t("Its described as {{variable}}", {
					variable: details?.displayDescription,
				})}
			</p>
			<p>
				<span>
					<i onClick={() => {}}>
						{i18n.t("Identified by:")}{" "}
						<span
							id={"test-indicator-details"}
							className={classes.identifylink}
						>
							{" "}
							{details?.id}{" "}
						</span>{" "}
					</i>
				</span>
			</p>
		</div>
	);
}
