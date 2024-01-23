import i18n from "@dhis2/d2-i18n";
import { InputField } from "@dhis2/ui";
import React, { useCallback, useState } from "react";
import { useFilterOrgUnits } from "../../hooks/index.js";

export function OrgUnitSearch({ searchable }: { searchable?: boolean }) {
	const [keyword, setKeyword] = useState<string | undefined>();
	const { onSearch } = useFilterOrgUnits();
	const search = onSearch;

	const onSearchChange = useCallback(
		({ value }: { value?: string }) => {
			setKeyword(value);
			if (onSearch && value) {
				onSearch(value);
			}
		},
		[search],
	);

	return (
		<>
			{searchable && (
				<div className="pb-8">
					<InputField
						value={keyword}
						onChange={onSearchChange}
						dense
						placeholder={i18n.t("Search name, id")}
					/>
				</div>
			)}
		</>
	);
}
