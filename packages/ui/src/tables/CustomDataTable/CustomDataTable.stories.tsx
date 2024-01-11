import { CustomDataTable } from "./CustomDataTable";
import { Meta, StoryObj } from "@storybook/react";
import rawRows from "./resources/data.json";
import { Tag } from "@dhis2/ui";

const meta: Meta<typeof CustomDataTable> = {
	component: CustomDataTable,
	title: "Tables/Custom Data Table",
	tags: ["autodocs"],
	parameters: {
		controls: {
			expanded: false,
		},
		docs: {
			story: {
				inline: true,
			},
			source: { type: "code" },
		},
	},
};
export default meta;

const columns = [
	{
		label: "Name",
		key: "name",
		widt: 50,
	},
	{
		label: "Age",
		key: age",
	},
	{
		label: "Sex",
		key: sex",
	},
	{
		label: "Company",
		key: "comany",
	},
	{
		label: "Account no",
		key: "accoutNo",
	},
	{
		label: "Status",
		key: "acive,
	},
];

const rows = rawRows.map((row) => ({
	...row,
	active: (
		<Tag positive={row.active} negative={!row.active}>
			{row.active ? "Active" : "Inactive"}
		</Tag>
	)
}));

const tableProps = {
	scrollHeight: "400px"
};

type Story = StoryObj<typeof CustomDataTable>;

/**
 * By default, the only required props of the data table is the 'columns' prop.
 */
export const Default: Story = {
	render: (props) => <CustomDataTable {...props} tableProps={tableProps} />,
	name: "Default",
	args: {
		columns,
		rows
	}
};
export const SelectableRows: Story = {
	name: "Selectable Rows",
	args: {
		columns,
		rows,
		tableProps,
		selectedRows: ["708zSF7wu", "835lS6TVu", "478iIvojm"],
		selectable: true,
		onRowSelect: (selectedValueIds) => {
			console.log(selectedValueIds);
		}
	}
};
export const LoadingStatus: Story = {
	name: "Loading Status",
	args: {
		columns,
		rows,
		tableProps,
		loading: true
	}
};
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
};
