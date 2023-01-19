import {Tag} from "@dhis2/ui";
import React from "react";

const status: { key: string, tag: string }[] = [
    {
        key: "Approved",
        tag: "positive",
    },
    {
        key: "Pending",
        tag: "neutral",
    },
    {
        key: "Rejected",
        tag: "negative"
    },
]

export default function Status({value: {label, value}}: { value: { label: string; value: string } }) {

    const statusProp = {
        [value]: true
    }

    return (<Tag {...statusProp} >
        {
            label
        }
    </Tag>)
}
