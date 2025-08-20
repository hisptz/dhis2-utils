import { template, templateSettings } from "lodash";
import type { LayerLabelConfig } from "../../../interfaces";

const valueFormatter = Intl.NumberFormat(navigator.language).format;

export function getLabel({
	orgUnit,
	data,
	labelConfig,
}: {
	labelConfig: LayerLabelConfig;
	orgUnit: { name: string };
	data?: number;
}) {
	templateSettings.interpolate = /{([\s\S]+?)}/g;

	return template(labelConfig.labelTemplate.replace(/\n/g, "<br />"))({
		name: orgUnit.name,
		value: data ? valueFormatter(data) : "",
	});
}
