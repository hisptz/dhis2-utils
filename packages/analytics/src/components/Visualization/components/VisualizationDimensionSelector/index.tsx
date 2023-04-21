import React, {useCallback, useMemo, useState} from "react";
import {Button, IconClock24, IconLocation24, Tooltip} from "@dhis2/ui"
import i18n from '@dhis2/d2-i18n';
import {useDimensions} from "../DimensionsProvider";
import {OrgUnitSelectorModal, PeriodSelectorModal} from "@hisptz/dhis2-ui";
import {OrgUnitSelection} from "@hisptz/dhis2-utils";
import {getOrgUnitSelectionFromIds} from "../VisualizationSelector";
import {getOrgUnitsSelection} from "../../../Map/utils/map";

export function VisualizationDimensionSelector() {
    const [dimensions, setDimensions] = useDimensions();
    const periods = useMemo(() => dimensions.pe, [dimensions.pe]);
    const orgUnitSelection = useMemo(() => getOrgUnitSelectionFromIds(dimensions.ou ?? []), [dimensions.ou]);
    const [openFilter, setOpenFilter] = useState<"pe" | "ou" | undefined>();

    const onFilterUpdate = useCallback((type: "ou" | "pe") => (data: OrgUnitSelection | any) => {
        setOpenFilter(undefined);
        if (type === "ou") {
            setDimensions({dimension: "ou", value: getOrgUnitsSelection(data)});
            return;
        }
        if (type === "pe") {
            setDimensions({dimension: "pe", value: data})
            return;
        }

    }, [setDimensions]);

    return (
        <>
            <PeriodSelectorModal

                position="middle"
                enablePeriodSelector
                selectedPeriods={periods}
                onClose={() => setOpenFilter(undefined)}
                hide={openFilter !== "pe"}
                onUpdate={onFilterUpdate("pe")}
            />
            <OrgUnitSelectorModal
                showUserOptions
                searchable
                title={i18n.t("Select location(s)")}
                value={orgUnitSelection}
                onClose={() => setOpenFilter(undefined)}
                hide={openFilter !== "ou"}
                onUpdate={onFilterUpdate("ou")}
            />
            <div style={{display: "flex", gap: 8}}>
                <Tooltip content={i18n.t("Period")}>
                    <Button onClick={() => setOpenFilter("pe")} icon={<IconClock24/>}/>
                </Tooltip>
                <Tooltip content={i18n.t("Location")}>
                    <Button onClick={() => setOpenFilter("ou")} icon={<IconLocation24/>}/>
                </Tooltip>
            </div>
        </>
    )
}
