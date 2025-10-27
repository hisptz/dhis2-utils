import { DataTableToolbar, Pagination } from "@dhis2/ui";
import {
	useTableState,
	useToggleTableLoadingState,
} from "../../TableStateProvider";
import { useEffect, useTransition } from "react";

export function PaginatedToolbar() {
	const [isPending, startTransition] = useTransition();
	const table = useTableState();
	const rowCount = table.getRowCount();
	const page = table.getState().pagination.pageIndex + 1;
	const pageSize = table.getState().pagination.pageSize;
	const pageCount = table.getPageCount();
	const toggleTableLoading = useToggleTableLoadingState();

	const onPageChange = (page: number) => {
		startTransition(() => {
			table.setPageIndex(page - 1);
		});
	};
	const onPageSizeChange = (pageSize: number) => {
		startTransition(() => {
			table.setPageSize(pageSize);
		});
	};

	useEffect(() => {
		toggleTableLoading();
	}, [isPending]);

	if (
		rowCount <= 50 ||
		(table.options.meta as { disablePagination?: boolean })
			?.disablePagination
	) {
		return null;
	}

	return (
		<DataTableToolbar
			/*
			// @ts-ignore */
			style={{ position: "unset" }}
			position="bottom"
		>
			<div style={{ width: "stretch" }}>
				<Pagination
					total={rowCount}
					pageCount={pageCount}
					pageSizes={[10, 20, 30, 40, 50, 100].map((size) =>
						size.toString(),
					)}
					page={page}
					pageSize={pageSize}
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
				/>
			</div>
		</DataTableToolbar>
	);
}
