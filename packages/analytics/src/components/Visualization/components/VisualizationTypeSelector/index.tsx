import React, {useMemo} from "react";
import {useVisualizationType, VisualizationType} from "../VisualizationTypeProvider";
import {Button, IconTable24, IconVisualizationColumn24, IconWorld24, Tooltip} from "@dhis2/ui"
import i18n from '@dhis2/d2-i18n';

const supportedVisualizationTypes = [
    {
        id: "pivot-table",
        icon: <IconTable24/>,
        label: i18n.t("Pivot table")
    },
    {
        id: "chart",
        icon: <IconVisualizationColumn24/>,
        label: i18n.t("Chart")
    }, {
        id: "map",
        icon: <IconWorld24/>,
        label: i18n.t("Map")
    }
]

export function VisualizationTypeSelector() {
    const [type, setType] = useVisualizationType();

    const types = useMemo(() => supportedVisualizationTypes.filter((supportedType) => supportedType.id !== type), [type]);

    return (
        <div style={{display: "flex", gap: 16}}>
            {
                types.map(({icon, label, id}) => {
                    return (
                        <Tooltip content={i18n.t("View as {{type}}", {
                            type: label.toLowerCase()
                        })}>
                            <Button onClick={() => setType(id as VisualizationType)} icon={icon}/>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}
