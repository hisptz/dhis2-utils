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
        label: "Status",
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
    tableProps: {
        scrollHeight: "800px",
        layout: "fixed"
    },
    loading: true
}

export const Pagination = Template.bind({});
Pagination.args = {
    columns,
    rows: rows.map(row => ({
        ...row,
        active: <Tag positive={row.active} negative={!row.active}><b>{row.active ? "Active" : "Inactive"}</b></Tag>
    })),
    tableProps: {
        scrollHeight: "800px",
        height: "800px",
        layout: "fixed"
    },
    pagination: {
        page: 2,
        pageCount: 2,
        pageSize: 10,
        total: 20
    }
}

export const Sortable = Template.bind({});
Sortable.args = {
    columns: columns.map(col => ({...col, sortable: true})),
    rows: rows.map(row => ({
        ...row,
        active: <Tag positive={row.active} negative={!row.active}><b>{row.active ? "Active" : "Inactive"}</b></Tag>
    })),
    tableProps: {
        scrollHeight: "800px"
    },
    onSort: (config) => console.log(config),
    sortState: {
        name: "name",
        direction: "asc"
    },
}

export default {
    title: "Tables/Custom DataTable",
    component: CustomDataTable,
}
