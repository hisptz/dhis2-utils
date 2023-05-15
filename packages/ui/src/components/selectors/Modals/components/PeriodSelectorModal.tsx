import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle} from "@dhis2/ui";
import React, {useCallback, useState} from "react";
import type {PeriodSelectorProps} from "../../PeriodSelector";
import {PeriodSelector} from "../../PeriodSelector";
import {ModalProps} from "../types";


export {PeriodSelectorProps}

export function PeriodSelectorModal({
                                        small,
                                        large,
                                        position,
                                        onClose,
                                        hide,
                                        onUpdate,
                                        selectedPeriods,
                                        updateButtonLabel,
                                        singleSelection,
                                        title,
                                        ...props
                                    }: ModalProps & Omit<PeriodSelectorProps, "onSelect">) {
    const [periodState, setPeriodState] = useState<Array<any> | undefined>(selectedPeriods);

    const onSelect = useCallback(({items: periods}: any) => {
        setPeriodState(periods);
    }, []);

    const onUpdateClick = useCallback(() => {
        onUpdate(periodState);
    }, [onUpdate, periodState]);

    return (
        <Modal hide={hide} small={small} large={large} onClose={onClose} position={position}>
            <ModalTitle>{title ?? singleSelection ? i18n.t("Select Period") : i18n.t("Select Period(s)")}</ModalTitle>
            <ModalContent>
                <PeriodSelector
                    singleSelection={singleSelection}
                    {...props}
                    selectedPeriods={periodState}
                    onSelect={onSelect}
                />
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
                    <Button dataTest={"modal-update-button"} primary onClick={onUpdateClick}>
                        {updateButtonLabel ?? i18n.t("Update")}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    );
}
