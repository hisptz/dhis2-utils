import {Story} from "@storybook/react"
import React from "react";
import {CustomDataTable, CustomDataTableProps} from "./index";
import rows from "../../../data/table-data.json"
import {Tag} from '@dhis2/ui'

const Template: Story<CustomDataTableProps> = (args) => <CustomDataTable {...args} />


const columns = [
    {
        label: "Name",
        key: "name",
        width: 50
    },
    {
        label: "Age",
        key: "age"
    },
    {
        label: "Sex",
        key: "sex"
    },
    {
        label: "Company",
        key: "company"
    },
    {
        label: "Account no",
        key: "accountNo"
    },
    {
        label: "Active",
        key: "active"
    },
]


export const Default = Template.bind({});
Default.args = {
    columns,
    rows: rows.map(row => ({
        ...row,
        active: <Tag positive={row.active} negative={!row.active}><b>{row.active ? "Active" : "Inactive"}</b></Tag>
    })),
    tableProps: {
        scrollHeight: "800px"
    }
}

export const SelectableRows = Template.bind({});
SelectableRows.args = {
    columns,
    rows: rows.map(row => ({
        ...row,
        active: <Tag positive={row.active} negative={!row.active}><b>{row.active ? "Active" : "Inactive"}</b></Tag>
    })),
    tableProps: {
        scrollHeight: "800px"
    },
    selectedRows: ['708zSF7wu', '835lS6TVu', '478iIvojm'],
    selectable: true,
    onRowSelect: (selectedValueIds) => {
        console.log(selectedValueIds)
    }
}

export const Loading = Template.bind({});
Loading.args = {
    columns,
    rows: rows.map(row => ({
        ...row,
        active: <Tag positive={row.active} negative={!row.active}><b>{row.active ? "Active" : "Inactive"}</b></Tag>
    })),
    loading: true
}

export default {
    title: "Tables/Custom DataTable",
    component: CustomDataTable,
}
