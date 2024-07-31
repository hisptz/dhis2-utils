import { SimpleDataTable } from "./SimpleDataTable";
import { Meta, StoryObj } from "@storybook/react";
import rawRows from "../../shared/resources/data.json";
import { Tag } from "@dhis2/ui";
import { useEffect, useMemo, useState } from "react";
import { chunk, difference, head, isEmpty, sortBy, uniq } from "lodash";
import { useDataQuery } from "@dhis2/app-runtime";
import { SimpleDataTableRow, SimpleDataTableSortState } from "./types";

const meta: Meta<typeof SimpleDataTable> = {
	component: SimpleDataTable,
	title: "Tables/Simple Data Table",
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
 * In its simplest form, you can pass an array of columns and rows to be displayed.
 *
 *
 */
export const Default: Story = {
	render: (props) => <SimpleDataTable {...props} tableProps={tableProps} />,
	name: "Default",
	args: {
		columns,
		rows,
		height: 500,
	},
	play: async ({ canvasElement }) => {},
};

/**
 * When the `row` prop is not passed or is an empty array, the table will be replaced by the string `There are no items`
 */
export const EmptyRows: Story = {
	render: (props) => <SimpleDataTable {...props} tableProps={tableProps} />,
	name: "Empty Rows",
	args: {
		columns,
		rows: [],
	},
	play: async ({ canvasElement }) => {},
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
	play: async ({ canvasElement, args }) => {},
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
		selectable: true,
		onRowSelect: (selectedValueIds) => {},
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const header = canvas.getAllByRole("row")[0];
		const firstRow = canvas.getAllByRole("row")[1];
		if (firstRow) {
			await step("Check the first row", async () => {
				const checkboxCell = head(firstRow.children);
				await expect(checkboxCell).toBeInTheDocument();
				const checkbox = checkboxCell?.firstElementChild;

				expect(checkbox).not.toBeNull();
				expect(checkbox).not.toBeUndefined();

				if (checkbox) {
					await userEvent.click(checkbox);
					expect(
						checkboxCell?.firstElementChild?.firstElementChild,
					).toBeChecked();
					await userEvent.click(checkbox);
					expect(
						checkboxCell?.firstElementChild?.firstElementChild,
					).not.toBeChecked();
				}
			});
			await step("Check all rows", async () => {
				const checkboxCell = head(header.children);
				await expect(checkboxCell).toBeInTheDocument();

				const checkbox =
					checkboxCell?.firstElementChild?.firstElementChild
						?.firstElementChild?.firstElementChild;

				expect(checkbox).not.toBeNull();
				expect(checkbox).not.toBeUndefined();

				if (checkbox) {
					await userEvent.click(checkbox);
					expect(
						checkboxCell?.firstElementChild?.firstElementChild
							?.firstElementChild?.firstElementChild
							?.firstElementChild,
					).toBeChecked();
					await userEvent.click(checkbox);
					expect(
						checkboxCell?.firstElementChild?.firstElementChild
							?.firstElementChild?.firstElementChild
							?.firstElementChild,
					).not.toBeChecked();
				}
			});
		}
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
	play: async ({ canvasElement, args }) => {},
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
	},
	play: async ({ canvasElement }) => {
		expect(
			canvasElement.querySelector(
				'[data-test="dhis2-uiwidgets-pagination"]',
			),
		).toBeInTheDocument();
	},
};

const query: any = {
	indicators: {
		resource: "indicators",
		params: ({
			page,
			pageSize,
			orderBy,
			direction,
		}: {
			page: number;
			pageSize: number;
			orderBy?: string;
			direction: "asc" | "desc";
		}) => {
			return {
				page,
				pageSize,
				totalPages: true,
				fields: ["id", "displayName"],
				order: orderBy ? `${orderBy}:${direction}` : undefined,
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
	},
};

/**
 * The props `sortState` and `onSort` can be used to control sorting of the table.
 * To allow sorting on a specific column, you must set `sortable` property of the column to `true`
 *
 * ```tsx
 * 		const [sortState, setSortState] = useState<SimpleDataTableSortState>();
 * 		const onSort = (sortState: SimpleDataTableSortState) => {
 * 			setSortState(sortState);
 * 		};
 *
 * 		const sortedRows = useMemo(() => {
 * 			if (!sortState || sortState.direction === "default") {
 * 				return rows;
 * 			}
 * 			const sortedData = sortBy(rows, sortState.name);
 * 			if (sortState.direction === "asc") {
 * 				return sortedData;
 * 			}
 * 			return sortedData.toReversed();
 * 		}, [sortState]);
 *
 * 		return (
 * 			<SimpleDataTable
 * 				{...props}
 * 				tableProps={tableProps}
 * 				columns={columns.map((col) =>
 * 					col.key === "active" ? col : { ...col, sortable: true },
 * 				)}
 * 				rows={sortedRows}
 * 				sortState={sortState}
 * 				onSort={onSort}
 * 			/>
 * 		);
 *
 * ```
 *
 * */
export const Sorting: Story = {
	render: (props) => {
		const [sortState, setSortState] = useState<SimpleDataTableSortState>();
		const onSort = (sortState: SimpleDataTableSortState) => {
			setSortState(sortState);
		};

		const sortedRows = useMemo(() => {
			if (!sortState || sortState.direction === "default") {
				return rows;
			}
			const sortedData = sortBy(rows, sortState.name as string);
			if (sortState.direction === "asc") {
				return sortedData;
			}
			return sortedData.toReversed();
		}, [sortState]);

		return (
			<SimpleDataTable
				{...props}
				tableProps={tableProps}
				columns={columns.map((col) =>
					col.key === "active" ? col : { ...col, sortable: true },
				)}
				rows={sortedRows}
				sortState={sortState}
				onSort={onSort}
			/>
		);
	},

	name: "Sorting",
	args: {
		columns,
		rows,
		height: 500,
	},
	play: async ({ canvasElement }) => {},
};

/**
 * Sorting can also be done on the server side using `order` property
 *
 * Example
 *
 *
 * ```tsx
 *
 * const query: any = {
 * 	indicators: {
 * 		resource: "indicators",
 * 		params: ({
 * 			page,
 * 			pageSize,
 * 			orderBy,
 * 			direction,
 * 		}: {
 * 			page: number;
 * 			pageSize: number;
 * 			orderBy?: string;
 * 			direction: "asc" | "desc";
 * 		}) => {
 * 			return {
 * 				page,
 * 				pageSize,
 * 				totalPages: true,
 * 				fields: ["id", "displayName"],
 * 				order: orderBy ? `${orderBy}:${direction}` : undefined,
 * 			};
 * 		},
 * 	},
 * };
 *
 * const [pager, setPager] = useState<{
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
 * 		const [sortState, setSortState] = useState<SimpleDataTableSortState>();
 * 		const [tableData, setTableData] = useState<SimpleDataTableRow[]>();
 * 		const { data, loading, refetch, fetching } =
 * 			useDataQuery<IndicatorData>(query, {
 * 				variables: {
 * 					page: pager.page,
 * 					pageSize: pager.pageSize,
 * 				},
 * 			});
 *
 * 		const onSort = (sortState: SimpleDataTableSortState) => {
 * 			setSortState(sortState);
 * 			refetch({
 * 				orderBy: sortState.name,
 * 				direction: sortState.direction,
 * 			});
 * 		};
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
 * 						sortable: true,
 * 					},
 * 				]}
 * 				rows={tableData}
 * 				loading={fetching}
 * 				onSort={onSort}
 * 				sortState={sortState}
 * 				pagination={{
 * 					...pager,
 * 					onPageChange,
 * 					onPageSizeChange,
 * 				}}
 * 			/>
 * 		);
 * ```
 * */
export const SortingFromServer: Story = {
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
		const [sortState, setSortState] = useState<SimpleDataTableSortState>();
		const [tableData, setTableData] = useState<SimpleDataTableRow[]>();
		const { data, loading, refetch, fetching } =
			useDataQuery<IndicatorData>(query, {
				variables: {
					page: pager.page,
					pageSize: pager.pageSize,
				},
			});

		const onSort = (sortState: SimpleDataTableSortState) => {
			setSortState(sortState);
			refetch({
				orderBy: sortState.name,
				direction: sortState.direction,
			});
		};
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
						sortable: true,
					},
				]}
				rows={tableData}
				loading={fetching}
				onSort={onSort}
				sortState={sortState}
				pagination={{
					...pager,
					onPageChange,
					onPageSizeChange,
				}}
			/>
		);
	},
	name: "Sorting server side",
	args: {
		columns,
		rows,
		tableProps,
	},
};

/**
 * You can pass `tableProps` and `tableBodyProps` to pass props to the table and the table body respectively.
 * You can pass `scrollHeight` property in the `tableProps` to control the scroll height
 *
 * See `DataTable` from `@dhis2/ui` props for more info.
 * */
export const OtherProps: Story = {
	render: (props) => <SimpleDataTable {...props} />,
	name: "Other props",
	args: {
		columns,
		rows,
		height: 500,
		tableProps: {
			scrollHeight: "800px",
		},
	},
};
