import i18n from "@dhis2/d2-i18n";
import {ButtonStrip, colors, IconDelete24, IconEdit24, IconView24, Tooltip} from "@dhis2/ui";
import ActionButton from "../../../../../../shared/components/ActionButton";
import React, {SyntheticEvent} from "react";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {EditState} from "../../../ReportListHeader/components/UploadForm/state/data";
import {useConfirmDialog} from "@hisptz/react-ui";
import {useDeleteReport, useListRefresher} from "../../../../../../shared/hooks/data";
import {useAlert} from "@dhis2/app-runtime";

export function Actions({reportId, actions}: { reportId: string; actions: Record<string, boolean> }) {
    const navigate = useNavigate();
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))
    const {refresh} = useListRefresher();
    const {confirm} = useConfirmDialog();
    const {onDelete} = useDeleteReport()
    const setEdit = useSetRecoilState(EditState);
    const availableActions: { id: string, label: string; onClick: (event: SyntheticEvent) => void, icon: any }[] = [
        {
            label: i18n.t("View"),
            id: "view",
            onClick: (event: SyntheticEvent) => {
                event.stopPropagation();
                navigate(`details/${reportId}`)
            },
            icon: <IconView24 color={colors.blue900}/>
        },
        {
            label: i18n.t("Edit"),
            id: "edit",
            onClick: (event: SyntheticEvent) => {
                event.stopPropagation();
                setEdit(reportId)
            },
            icon: <IconEdit24/>
        },
        {
            label: i18n.t("Delete"),
            id: "delete",
            onClick: async (event: SyntheticEvent) => {
                event.stopPropagation();
                confirm({
                    confirmButtonText: i18n.t("Delete"),
                    message: i18n.t("Are you sure you want to delete this report?"),
                    onCancel(): void {
                        console.log('You ain\'t serious with deleting 😒')
                    },
                    onConfirm(): void {
                        show({message: i18n.t("Deleting report..."), type: {info: true}})
                        onDelete(reportId).then(() => {
                            refresh()
                        })
                    }, title: i18n.t("Confirm report deletion")
                })
            },
            icon: <IconDelete24 color={colors.red800}/>
        },
    ]

    const allowedActions = availableActions.filter(({id}) => actions[id])


    return <ButtonStrip>
        {
            allowedActions.map(action => {
                return <Tooltip key={`${action.label}-action-button`} content={action.label}>
                    <ActionButton onClick={action.onClick} icon={action.icon}/>
                </Tooltip>
            })
        }
    </ButtonStrip>
}
