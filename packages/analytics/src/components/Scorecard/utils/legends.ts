import type {
	LegendDefinition,
	OrgUnitLevelLegend,
	ScorecardAnalyticsData,
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
	value?: string;
}): LegendDefinition | undefined {
	if (!value) {
		return find(legendDefinitions, { id: "No Data" });
	}
	const numericValue = +value;
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
	value?: ScorecardAnalyticsData;
	config: ScorecardConfig;
	periodId: string;
	orgUnit: ItemMeta & { hierarchy: string };
	orgUnitLevels: Array<{
		id: string;
		level: number;
		organisationUnits: Array<{
			id: string;
		}>;
	}>;
}) {
	let legends: ScorecardLegend[];

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

	return findLegend({
		legends,
		value: value?.value,
		max: dataSource.weight,
		legendDefinitions: config.legendDefinitions,
	});
}

export function getTextColorFromBackgroundColor(background: string): string {
	if (background.startsWith("#")) {
		background = background.slice(1);
	}
	const r = parseInt(background.substr(0, 2), 16);
	const g = parseInt(background.substr(2, 2), 16);
	const b = parseInt(background.substr(4, 2), 16);
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	if (luminance > 0.5) {
		return "black"; // bright background, use dark text
	} else {
		return "white"; // dark background, use bright text
	}
}
