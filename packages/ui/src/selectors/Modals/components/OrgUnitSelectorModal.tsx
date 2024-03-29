import i18n from "@dhis2/d2-i18n";
import {
	Button,
	ButtonStrip,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
} from "@dhis2/ui";
import { flatten, last } from "lodash";
import React, { useCallback, useState } from "react";
import {
	OrgUnitSelection,
	OrgUnitSelector,
	OrgUnitSelectorProps,
} from "../../OrgUnitSelector/index.js";
import { ModalProps } from "../types/index.js";

/**
 * This is a modal wrapper for `OrgUnitSelector` with internal state to control the selected values.
 * It returns the value using `onUpdate` function prop when the user clicks the update button.
 *
 * */
export function OrgUnitSelectorModal({
	small,
	large,
	position,
	onClose,
	hide,
	onUpdate,
	updateButtonLabel,
	singleSelection,
	value,
	...props
}: ModalProps & OrgUnitSelectorProps) {
	const [selectedOrgUnits, setSelectedOrgUnits] = useState<
		OrgUnitSelection | undefined
	>(value);

	const onSelect = useCallback(
		(value: OrgUnitSelection) => {
			if (singleSelection) {
				const updatedValue = {
					...value,
					orgUnits: flatten([last(value.orgUnits) ?? []]),
				};
				setSelectedOrgUnits(updatedValue);
				return;
			}
			setSelectedOrgUnits(value);
		},
		[singleSelection],
	);

	const onUpdateClick = useCallback(() => {
		onUpdate(selectedOrgUnits);
	}, [selectedOrgUnits, onUpdate]);

	return (
		<Modal
			hide={hide}
			small={small}
			large={large}
			onClose={onClose}
			position={position}
		>
			<ModalTitle>
				{singleSelection
					? i18n.t("Select Organisation Unit")
					: i18n.t("Select Organisation Unit(s)")}
			</ModalTitle>
			<ModalContent>
				<OrgUnitSelector
					{...props}
					value={selectedOrgUnits}
					onUpdate={onSelect}
					singleSelection={singleSelection}
				/>
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
					<Button
						dataTest={"modal-update-button"}
						primary
						onClick={onUpdateClick}
					>
						{updateButtonLabel ?? i18n.t("Update")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
