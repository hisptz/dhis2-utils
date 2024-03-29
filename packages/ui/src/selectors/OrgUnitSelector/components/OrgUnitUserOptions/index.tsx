import i18n from "@dhis2/d2-i18n";
import { CheckboxField, colors } from "@dhis2/ui";
import React from "react";
import {
	onUserOrUnitChange,
	onUserSubUnitsChange,
	onUserSubX2Units,
} from "../../utils/index.js";
import { OrgUnitSelection } from "../../types/index.js";

export function OrgUnitUserOptions({
	value,
	onUpdate,
}: {
	onUpdate: ((value: OrgUnitSelection) => void) | undefined;
	value: OrgUnitSelection | undefined;
}) {
	const { userSubX2Unit, userOrgUnit, userSubUnit } = value ?? {};

	return (
		<div
			data-test="user-options-selector"
			style={{
				background: colors.grey200,
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				padding: 8,
				gap: 8,
				justifyItems: "center",
			}}
		>
			<CheckboxField
				dataTest={"user-org-unit"}
				checked={userOrgUnit}
				onChange={onUserOrUnitChange({ onUpdate, value })}
				label={i18n.t("User organisation unit")}
			/>
			<CheckboxField
				dataTest={"user-sub-org-unit"}
				checked={userSubUnit}
				onChange={onUserSubUnitsChange({ onUpdate, value })}
				label={i18n.t("User sub-units")}
			/>
			<CheckboxField
				dataTest={"user-sub-x2-org-unit"}
				checked={userSubX2Unit}
				onChange={onUserSubX2Units({ onUpdate, value })}
				label={i18n.t("User sub-x2-units")}
			/>
		</div>
	);
}
