import {FieldProps} from "../../interfaces";
import React, {useEffect} from "react";
import {InputField} from '@dhis2/ui'
import {useDataQuery} from "@dhis2/app-runtime";
import {OrgUnitSelectorModal} from "../../../selectors";
import {OrganisationUnit, OrgUnitSelection} from "@hisptz/dhis2-utils";
import {head} from "lodash";
import {useBoolean} from "usehooks-ts";
import classes from "./OrgUnitSelectField.module.css"

export interface OrgUnitSelectFieldProps extends FieldProps {

    /**
     * Selected organisation unit id
     * */
    value?: string;

}

const orgUnitQuery = {
    ou: {
        resource: "organisationUnits",
        id: ({id}: any) => id,
        params: {
            fields: [
                'id',
                'displayName',
                'path'
            ]
        }
    }
}

export const OrgUnitSelectField = React.forwardRef(({
                                                                                           value,
                                                                                           onChange,
                                                                                           error,
                                                                                           ...props
                                                                                       }: OrgUnitSelectFieldProps, ref) => {

    const {value: hide, setTrue: closeModal, setFalse: openModal} = useBoolean(true);
    const {data, loading, error: fetchError, refetch} = useDataQuery(orgUnitQuery, {
        lazy: true,
        variables: {
            id: value
        }
    });

    useEffect(() => {
        if (value) {
            refetch({
                id: value
            })
        }
    }, [])

    const onUpdate = (orgUnit: OrgUnitSelection) => {
        closeModal();
        const orgUnitId = head(orgUnit?.orgUnits)?.id;
        onChange(orgUnitId);
        refetch({
            id: orgUnitId
        })
    }

    const displayName = (data?.ou as any)?.displayName;

    return (
        <>
            <div onClick={openModal} style={{cursor: "pointer !important"}}>
                <InputField
                    className={classes['input']}
                    ref={ref}
                    loading={loading}
                    disabled
                    value={displayName}
                    error={Boolean(error) || Boolean(fetchError)}
                    validationText={error || fetchError?.message}
                    {...props}
                />
            </div>
            {
                !hide && (<OrgUnitSelectorModal
                    value={data?.ou ? {orgUnits: [(data?.ou as OrganisationUnit)]} : undefined}
                    singleSelection
                    searchable
                    onClose={closeModal}
                    hide={hide}
                    onUpdate={onUpdate}
                />)
            }
        </>
    )
})
