import type {
	LegendDefinition,
	OrgUnitLevelLegend,
	ScorecardConfig,
	ScorecardDataSource,
	ScorecardLegend,
	SpecificTarget,
} from "../schemas/config";
import { find, head, isEmpty } from "lodash";
import type { ItemMeta } from "../hooks/metadata";

function findLegend({
	max,
	legendDefinitions,
	value,
	legends,
}: {
	max: number;
	legendDefinitions: LegendDefinition[];
	legends: ScorecardLegend[];
	value?: number;
}): LegendDefinition | undefined {
	if (!value) {
		return find(legendDefinitions, { id: "No Data" });
	}
	const numericValue = value;
	if (numericValue > max) {
		return find(legendDefinitions, { id: "N/A" });
	}
	if (isNaN(numericValue)) {
		return find(legendDefinitions, { id: "No Data" });
	}

	const { legendDefinitionId } =
		find(legends, (legend) => {
			if (legend) {
				const { startValue, endValue } = legend;
				if (+endValue === max) {
					return (
						+startValue <= numericValue && +endValue >= numericValue
					);
				}
				return +startValue <= numericValue && +endValue > numericValue;
			}
			return false;
		}) ?? {};

	return find(legendDefinitions, ["id", legendDefinitionId]);
}

function getSpecificTargetLegends(specificTarget: SpecificTarget, id: string) {
	if (specificTarget.items.includes(id)) {
		return specificTarget.legends;
	}
}

function getLegendByOrgUnitLevel({
	orgUnit,
	orgUnitLevels,
	legends,
}: {
	orgUnit: ItemMeta & { hierarchy: string };
	legends: Record<string, ScorecardLegend[]>;
	orgUnitLevels: Array<{
		id: string;
		level: number;
	}>;
}): ScorecardLegend[] {
	const orgUnitLevel = orgUnitLevels.find(({ id, level }) => {
		const ouLevel = orgUnit.hierarchy.split("/").filter(Boolean).length;
		return level === ouLevel;
	});

	if (!orgUnitLevel) {
		throw new Error("Invalid orgUnitId");
	}

	return legends[orgUnitLevel.id];
}

export function getLegend({
	dataSource,
	config,
	value,
	periodId,
	orgUnit,
	orgUnitLevels,
}: {
	dataSource: ScorecardDataSource;
	value?: number;
	config: ScorecardConfig;
	periodId?: string;
	orgUnit?: ItemMeta & { hierarchy: string };
	orgUnitLevels?: Array<{
		id: string;
		level: number;
	}>;
}) {
	let legends: ScorecardLegend[] = [];

	if (periodId && orgUnit && orgUnitLevels) {
		if (!Array.isArray(dataSource.legends)) {
			legends = getLegendByOrgUnitLevel({
				orgUnit,
				orgUnitLevels,
				legends: dataSource.legends as OrgUnitLevelLegend,
			});
		} else {
			const specificTargets = dataSource.specificTargets;
			if (!isEmpty(specificTargets)) {
				const specificTarget = head(specificTargets)!;
				switch (specificTarget.type) {
					case "period":
						const targetLegends = getSpecificTargetLegends(
							specificTarget,
							periodId,
						);
						legends = targetLegends ?? dataSource.legends;
						break;
					case "orgUnit":
						const targetOrgUnitLegends = getSpecificTargetLegends(
							specificTarget,
							orgUnit.uid,
						);
						legends = targetOrgUnitLegends ?? dataSource.legends;
						break;
					default:
						legends = dataSource.legends;
				}
			} else {
				legends = dataSource.legends;
			}
		}
	} else {
		if (Array.isArray(dataSource.legends)) {
			legends = dataSource.legends;
		}
	}

	return findLegend({
		legends,
		value: value,
		max: dataSource.weight,
		legendDefinitions: config.legendDefinitions,
	});
}

export function getTextColorFromBackgroundColor(background: string): string {
	// Remove the hash at the start if it's there
	background = background.replace(/^#/, "");

	// Convert hex to RGB
	let r = parseInt(background.substring(0, 2), 16);
	let g = parseInt(background.substring(2, 4), 16);
	let b = parseInt(background.substring(4, 6), 16);

	// Calculate the YIQ value
	let yiq = (r * 299 + g * 587 + b * 114) / 1000;

	// Return black for light backgrounds and white for dark backgrounds
	return yiq >= 128 ? "#000000" : "#FFFFFF";
}
