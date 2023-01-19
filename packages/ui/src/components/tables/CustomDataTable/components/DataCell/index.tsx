import React from "react";
import Status from "../Status";
import {Actions} from "../Actions";

export function CustomDataTableCell({data, columnKey, reportId}: { data: any, columnKey: string; reportId: string }) {
    switch (columnKey) {
        case "reportStatus":
            return <Status value={data}/>;
        case "actions":
            return <Actions reportId={reportId} actions={data}/>;
        default:
            return data ?? null;
    }

}
