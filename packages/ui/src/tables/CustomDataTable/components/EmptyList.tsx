import i18n from "@dhis2/d2-i18n";
import React from "react";
import classes from "../CustomDataTable.module.css";

export default function EmptyList({
	message,
}: {
	message?: string | React.ReactElement;
}) {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
			className="column w-100 h-100 center align-items-center"
		>
			<h2 className={classes["info-text"]}>
				{message ?? i18n.t("There are no items")}
			</h2>
		</div>
	);
}
