import type { ScorecardLegend } from "../../../../../schemas/config";
import { colors, Popover } from "@dhis2/ui";
import type { RefObject } from "react";
import { LegendsView } from "../../../../ScorecardLegendsView/components/LegendView";
import { isEmpty } from "lodash";
import i18n from "@dhis2/d2-i18n";

export function DataHeaderLegendView({
	legends,
	reference,
	onClose,
}: {
	legends: Array<{
		id: string;
		label: string;
		legends: Array<ScorecardLegend>;
	}>;
	reference: RefObject<HTMLElement>;
	onClose: () => void;
}) {
	if (isEmpty(legends)) return null;

	return (
		<Popover onClickOutside={onClose} reference={reference}>
			<div
				style={{
					display: "flex",
					gap: 16,
					flexDirection: "column",
					padding: 16,
				}}
			>
				{legends?.map(({ id, label, legends }) => {
					if (!Array.isArray(legends)) {
						return (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 8,
								}}
							>
								<b style={{ fontSize: 14 }}>{label}</b>
								<span
									style={{
										color: colors.grey700,
										fontSize: 12,
									}}
								>
									{i18n.t(
										"This data item has been configured with specific targets. Open the specific targets menu to learn more",
									)}
								</span>
							</div>
						);
					}

					return (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
							key={`${id}-legend-view`}
						>
							<b style={{ fontSize: 14 }}>{label}</b>
							<LegendsView legends={legends} />
						</div>
					);
				})}
			</div>
		</Popover>
	);
}
