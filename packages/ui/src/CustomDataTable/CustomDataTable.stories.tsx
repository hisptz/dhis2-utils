import {CustomDataTable} from "./CustomDataTable";
import {Meta, StoryObj} from "@storybook/react";
import rawRows from "./resources/data.json";
import {Tag} from "@dhis2/ui";

const meta: Meta<typeof CustomDataTable> = {
		component: CustomDataTable,
		title: "Custom Data Table"
}
export default meta;


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

const rows = rawRows.map(row => ({
		...row,
		active: <Tag positive={row.active} negative={!row.active}>{row.active ? "Active" : "Inactive"}</Tag>
}))

const tableProps = {
		scrollHeight: "400px"
}

type Story = StoryObj<typeof CustomDataTable>;
export const Default: Story = {
		name: "Default",
		args: {
				columns,
				rows,
				tableProps,

		}
}
export const SelectableRows: Story = {
		name: "Selectable Rows",
		args: {
				columns,
				rows,
				tableProps,
				selectedRows: ['708zSF7wu', '835lS6TVu', '478iIvojm'],
				selectable: true,
				onRowSelect: (selectedValueIds) => {
						console.log(selectedValueIds)
				}

		}
}
export const LoadingStatus: Story = {
		name: "Loading Status",
		args: {
				columns,
				rows,
				tableProps,
				loading: true
		}
}
export const Pagination: Story = {
		name: "Pagination",
		args: {
				columns,
				rows,
				tableProps,
				pagination: {
						page: 1,
						pageCount: 2,
						pageSize: 10,
						total: 20
				}
		}
}
