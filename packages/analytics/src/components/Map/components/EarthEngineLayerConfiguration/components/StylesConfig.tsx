import i18n from "@dhis2/d2-i18n";
import { ColorConfig } from "./ColorConfig";
import React from "react";
import { useType } from "../hooks/data";

export function StylesConfig() {
	const config = useType();
	const hasParams = Boolean(config?.params);

	if (!hasParams) {
		return null;
	}

	return (
		<div style={{ minWidth: 200, minHeight: 100 }} className="row gap-16">
			<div className="column">
				<p>
					{i18n.t("Unit")}: {config?.unit}
				</p>
				<ColorConfig />
			</div>
		</div>
	);
}
