import { Meta, StoryObj } from "@storybook/react";
import { SimpleTable } from "./SimpleTable";
import rawRows from "../../shared/resources/data.json";
import { Tag } from "@dhis2/ui";
import { useEffect, useState } from "react";
import { chunk } from "lodash";
import { useDataQuery } from "@dhis2/app-runtime";
import { SimpleTableRow } from "./types";

const meta: Meta<typeof SimpleTable> = {
	component: SimpleTable,
	title: "Tables/Simple Table",
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

type Story = StoryObj<typeof SimpleTable>;

export const Default: Story = {
	name: "Default",
	args: {
		columns,
		rows,
	},
};

/**
 * When the `row` prop is not passed or is an empty array, the table will be replaced by the string `There are no items`
 */
export const EmptyRows: Story = {
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
	name: "Customized Empty Rows",
	args: {
		columns,
		rows: [],
		emptyLabel: "A customized empty label",
	},
};

/**
 * The simple table also comes with controlled pagination out of the box. The pagination UI used is from the `@dhis2/ui` library.
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
 * 			<SimpleTable
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
			<SimpleTable
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
 * 		const [tableData, setTableData] = useState<SimpleTableRow[]>();
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
 * 			<SimpleTable
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
		const [tableData, setTableData] = useState<SimpleTableRow[]>();
		const { data, loading, refetch } = useDataQuery<IndicatorData>(query, {
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

		if (loading) {
			return (
				<div style={{ width: "100%", height: "100%" }}>Loading...</div>
			);
		}

		return (
			<SimpleTable
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
	},
};
