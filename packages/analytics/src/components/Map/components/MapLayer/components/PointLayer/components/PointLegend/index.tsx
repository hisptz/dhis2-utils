import { useConfig } from "@dhis2/app-runtime";
import { Divider } from "@dhis2/ui";
import React, { forwardRef } from "react";
import { getIconUrl } from "../../../../../../utils/helpers.js";
import LegendCardHeader from "../../../LegendArea/components/LegendCardHeader/index.js";
import { usePointLayer } from "../../hooks/index.js";
import i18n from "@dhis2/d2-i18n";

function PointLegends({
	orgUnitGroups,
	icon,
	label,
}: {
	orgUnitGroups: { name: string; symbol: string }[];
	icon?: string;
	label?: string;
}) {
	const { baseUrl } = useConfig();

	return (
		<div
			style={{
				minWidth: 100,
				alignItems: "flex-start",
				width: "100%",
				padding: 8,
				display: "flex",
				flexDirection: "column",
			}}
		>
			{icon && (
				<div
					key={`${icon}-legend`}
					style={{
						display: "flex",
						gap: 16,
						alignItems: "center",
					}}
					className="row gap-16  align-items-center"
				>
					<img
						height={20}
						width={20}
						alt={`${name}-icon`}
						src={getIconUrl(icon, { baseUrl })}
					/>
					<p>{label}</p>
				</div>
			)}
			{orgUnitGroups.map(({ name, symbol }) => {
				return (
					<div
						key={`${name}-legend`}
						className="row gap-16  align-items-center"
					>
						<img
							height={20}
							width={20}
							alt={`${name}-icon`}
							src={getIconUrl(symbol ?? "", { baseUrl })}
						/>
						<p>{name}</p>
					</div>
				);
			})}
		</div>
	);
}

function PointLegend(
	{ collapsible, onCollapse }: any,
	ref: React.LegacyRef<HTMLDivElement>,
) {
	const pointLayer = usePointLayer();
	const { label, style } = pointLayer ?? {};

	return (
		<div ref={ref} className="legend-card">
			<LegendCardHeader
				collapsible={collapsible}
				onCollapse={onCollapse}
				title={label ?? i18n.t("Points")}
			/>
			<Divider margin={"0"} />
			<PointLegends
				label={label}
				orgUnitGroups={style?.orgUnitGroups ?? []}
				icon={style?.icon}
			/>
		</div>
	);
}

export default forwardRef(PointLegend);
