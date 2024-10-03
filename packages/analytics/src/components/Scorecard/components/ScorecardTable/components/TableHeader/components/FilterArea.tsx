import type { ScorecardTableData } from "../../../../../schemas/config";
import type { Column } from "@tanstack/react-table";
import i18n from "@dhis2/d2-i18n";
import { useScorecardStateSelector } from "../../../../StateProvider";
import { InputField } from "@dhis2/ui";
import { useEffect, useState } from "react";

export interface FilterAreaProps {
	column: Column<ScorecardTableData, any>;
}

export function FilterArea({ column }: FilterAreaProps) {
	const defaultValue = column.getFilterValue() as string | undefined;
	const [text, setText] = useState<string | undefined>(defaultValue);
	const dataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);
	const searchPlaceholder = dataInRows
		? i18n.t("Search data items")
		: i18n.t("Search organisation units");

	useEffect(() => {
		const timeout = setTimeout(() => {
			column.setFilterValue(text);
		}, 700);

		return () => clearTimeout(timeout);
	}, [text]);

	return (
		<InputField
			value={text}
			onChange={({ value }) => setText(value)}
			placeholder={searchPlaceholder}
		/>
	);
}
