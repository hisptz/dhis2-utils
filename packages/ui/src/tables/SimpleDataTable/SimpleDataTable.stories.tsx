import { SimpleDataTable } from "./SimpleDataTable";
import { Meta, StoryObj } from "@storybook/react";
import rawRows from "./resources/data.json";
import { Tag } from "@dhis2/ui";
import { useEffect, useState } from "react";
import { chunk, difference, isEmpty, uniq } from "lodash";
import { useDataQuery } from "@dhis2/app-runtime";
import { SimpleDataTableRow } from "./types";

const meta: Meta<typeof SimpleDataTable> = {
	component: SimpleDataTable,
	title: "Tables/Simple Data Table",
	tags: ["autodocs"],
	parameters: {
		controls: {
			expanded: false,
		},
		docs: {
			story: {
				inline: true,
			},
		},
	},
};
export default meta;

const columns = [
	{
		label: "Name",
		key: "name",
		width: 50,
	},
	{
		label: "Age",
		key: "age",
	},
	{
		label: "Sex",
		key: "sex",
	},
	{
		label: "Company",
		key: "company",
	},
	{
		label: "Account no",
		key: "accountNo",
	},
	{
		label: "Status",
		key: "active",
	},
];

const manyRows = rawRows.map((row) => ({
	...row,
	active: (
		<Tag positive={row.active} negative={!row.active}>
			{row.active ? "Active" : "Inactive"}
		</Tag>
	),
}));

const rows = rawRows.toSpliced(10).map((row) => ({
	...row,
	active: (
		<Tag positive={row.active} negative={!row.active}>
			{row.active ? "Active" : "Inactive"}
		</Tag>
	),
}));

const tableProps = {
	scrollHeight: "500px",
};

type Story = StoryObj<typeof SimpleDataTable>;
/**
 * By default, you can pass an array of columns and rows to be displayed.
 */
export const Default: Story = {
	render: (props) => <SimpleDataTable {...props} tableProps={tableProps} />,
	name: "Default",
	args: {
		columns,
		rows,
		height: 500,
	},
};

/**
 * When the `row` prop is not passed, the table will be replaced by the string `There are no items`
 */
export const EmptyRows: Story = {
	render: (props) => <SimpleDataTable {...props} tableProps={tableProps} />,
	name: "Empty Rows",
	args: {
		columns,
		rows: [],
	},
};

/**
 * You can customize the empty row text using the `emptyLabel` prop
 */
export const CustomizedEmptyRows: Story = {
	render: (props) => <SimpleDataTable {...props} tableProps={tableProps} />,
	name: "Customized Empty Rows",
	args: {
		columns,
		rows: [],
		emptyLabel: "A customized empty label",
	},
};

/**
 * You can use the `selectable` prop to control if the rows of the table can be selected.
 * The `onRowSelect`, `onRowDeselect` and `selectedRows`
 * props allow the row selection to be controlled outside the component.
 *
 * Example:
 *
 * ```tsx
 *
 *  const [selectedRows, setSelectedRows] = useState<string[]>([]);
 * 		return (
 * 			<SimpleDataTable
 * 				{...props}
 * 				selectedRows={selectedRows}
 * 				onRowSelect={(selectedValueIds) => {
 * 					setSelectedRows((prevState) => {
 * 						return uniq([...prevState, ...selectedValueIds]);
 * 					});
 * 				}}
 * 				onRowDeselect={(selectedValueIds) => {
 * 					setSelectedRows((prevValues) => {
 * 						return difference(prevValues, selectedValueIds);
 * 					});
 * 				}}
 * 			/>
 * 		);
 *```
 * */
export const SelectableRows: Story = {
	name: "Selectable Rows",
	render: (props) => {
		const [selectedRows, setSelectedRows] = useState<string[]>([]);

		return (
			<SimpleDataTable
				{...props}
				selectedRows={selectedRows}
				onRowSelect={(selectedValueIds) => {
					setSelectedRows((prevState) => {
						return uniq([...prevState, ...selectedValueIds]);
					});
				}}
				onRowDeselect={(selectedValueIds) => {
					setSelectedRows((prevValues) => {
						return difference(prevValues, selectedValueIds);
					});
				}}
			/>
		);
	},
	args: {
		columns,
		rows,
		tableProps,
		selectedRows: ["708zSF7wu", "835lS6TVu", "478iIvojm"],
		selectable: true,
		onRowSelect: (selectedValueIds) => {
			console.log(selectedValueIds);
		},
	},
};

/**
 * When the `loading` prop is set to `true`, an overlay loader will show over the data. This only works if `rows` prop is not undefined or empty
 */
export const LoadingStatus: Story = {
	name: "Loading Status",
	args: {
		columns,
		rows,
		tableProps,
		loading: true,
	},
};

/**
 * The simple data table also comes with controlled pagination out of the box. The pagination UI used is from the `@dhis2/ui` library.
 * To use the pagination, supply a `pagination` prop.
 *
 * Example
 *
 * ```tsx
 * const [page, setPage] = useState(1);
 * 		const [pageSize, setPageSize] = useState(10);
 * 		const chunkedRows = chunk(manyRows, pageSize);
 *
 * 		const onPageChange = setPage;
 * 		const onPageSizeChange = (pageSize: number) => {
 * 			setPageSize(pageSize);
 * 			setPage(1);
 * 		};
 *
 * 		return (
 * 			<SimpleDataTable
 * 				{...props}
 * 				rows={chunkedRows[page - 1]}
 * 				pagination={{
 * 					page,
 * 					pageSize,
 * 					onPageChange,
 * 					onPageSizeChange,
 * 					total: manyRows.length,
 * 				}}
 * 			/>
 * 		);
 * ```
 *
 * You can also paginate in the server side
 *
 *
 * ```tsx
 *
 * const query = {
 * indicators: {
 * }
 *
 * }
 *
 *
 * ```
 *
 * */

export const Pagination: Story = {
	render: (props) => {
		const [page, setPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const chunkedRows = chunk(manyRows, pageSize);

		const pageCount = Math.ceil(manyRows.length / pageSize);

		const onPageChange = setPage;
		const onPageSizeChange = (pageSize: number) => {
			setPageSize(pageSize);
			setPage(1);
		};

		return (
			<SimpleDataTable
				{...props}
				rows={chunkedRows[page - 1]}
				pagination={{
					page,
					pageSize,
					pageCount,
					onPageChange,
					onPageSizeChange,
					total: manyRows.length,
				}}
			/>
		);
	},
	name: "Pagination",
	args: {
		columns,
		rows,
		tableProps,
		pagination: {
			page: 1,
			pageCount: 2,
			pageSize: 10,
			total: 20,
		},
	},
};

const query: any = {
	indicators: {
		resource: "indicators",
		params: ({ page, pageSize }: { page: number; pageSize: number }) => {
			return {
				page,
				pageSize,
				totalPages: true,
				fields: ["id", "displayName"],
			};
		},
	},
};

interface IndicatorData {
	indicators: {
		pager: {
			page: number;
			pageSize: number;
			total: number;
			pageCount: number;
		};
		indicators: Array<{
			id: string;
			displayName: string;
		}>;
	};
}

/**
 * You can also paginate in the server side as in the example below.
 * This example also shows how you can persist data as more data loads.
 *
 *
 *  ```tsx
 *  const query: any = {
 * 	indicators: {
 * 		resource: "indicators",
 * 		params: ({ page, pageSize }: { page: number; pageSize: number }) => {
 * 			return {
 * 				page,
 * 				pageSize,
 * 				totalPages: true,
 * 				fields: ["id", "displayName"],
 * 			};
 * 		},
 * 	},
 * };
 *
 * interface IndicatorData {
 * 	indicators: {
 * 		pager: {
 * 			page: number;
 * 			pageSize: number;
 * 			total: number;
 * 			pageCount: number;
 * 		};
 * 		indicators: Array<{
 * 			id: string;
 * 			displayName: string;
 * 		}>;
 * 	};
 * }
 *
 *  const [pager, setPager] = useState<{
 * 			page: number;
 * 			pageSize: number;
 * 			total: number;
 * 			pageCount: number;
 * 		}>({
 * 			page: 1,
 * 			pageSize: 10,
 * 			pageCount: 1,
 * 			total: 0,
 * 		});
 * 		const [tableData, setTableData] = useState<SimpleDataTableRow[]>();
 * 		const { data, loading, refetch, fetching } =
 * 			useDataQuery<IndicatorData>(query, {
 * 				variables: {
 * 					page: pager.page,
 * 					pageSize: pager.pageSize,
 * 				},
 * 			});
 * 		const onPageChange = (page: number) => {
 * 			refetch({
 * 				page,
 * 			});
 * 		};
 * 		const onPageSizeChange = (pageSize: number) => {
 * 			refetch({
 * 				pageSize,
 * 				page: 1,
 * 			});
 * 		};
 *
 * 		useEffect(() => {
 * 			if (data) {
 * 				const indicators = data.indicators.indicators;
 * 				setTableData(indicators);
 * 				setPager(data.indicators.pager);
 * 			}
 * 		}, [data]);
 *
 * 		if (loading && isEmpty(tableData)) {
 * 			return (
 * 				<div style={{ width: "100%", height: "100%" }}>Loading...</div>
 * 			);
 * 		}
 *
 * 		return (
 * 			<SimpleDataTable
 * 				{...props}
 * 				columns={[
 * 					{
 * 						label: "ID",
 * 						key: "id",
 * 					},
 * 					{
 * 						label: "Name",
 * 						key: "displayName",
 * 					},
 * 				]}
 * 				rows={tableData}
 * 				loading={fetching}
 * 				pagination={{
 * 					...pager,
 * 					onPageChange,
 * 					onPageSizeChange,
 * 				}}
 * 			/>
 * 		);
 *
 *  ```
 * */
export const PaginationFromServer: Story = {
	render: (props) => {
		const [pager, setPager] = useState<{
			page: number;
			pageSize: number;
			total: number;
			pageCount: number;
		}>({
			page: 1,
			pageSize: 10,
			pageCount: 1,
			total: 0,
		});
		const [tableData, setTableData] = useState<SimpleDataTableRow[]>();
		const { data, loading, refetch, fetching } =
			useDataQuery<IndicatorData>(query, {
				variables: {
					page: pager.page,
					pageSize: pager.pageSize,
				},
			});
		const onPageChange = (page: number) => {
			refetch({
				page,
			});
		};
		const onPageSizeChange = (pageSize: number) => {
			refetch({
				pageSize,
				page: 1,
			});
		};

		useEffect(() => {
			if (data) {
				const indicators = data.indicators.indicators;
				setTableData(indicators);
				setPager(data.indicators.pager);
			}
		}, [data]);

		if (loading && isEmpty(tableData)) {
			return (
				<div style={{ width: "100%", height: "100%" }}>Loading...</div>
			);
		}

		return (
			<SimpleDataTable
				{...props}
				columns={[
					{
						label: "ID",
						key: "id",
					},
					{
						label: "Name",
						key: "displayName",
					},
				]}
				rows={tableData}
				loading={fetching}
				pagination={{
					...pager,
					onPageChange,
					onPageSizeChange,
				}}
			/>
		);
	},
	name: "Pagination server side",
	args: {
		columns,
		rows,
		tableProps,
		pagination: {
			page: 1,
			pageCount: 2,
			pageSize: 10,
			total: 20,
		},
	},
};
