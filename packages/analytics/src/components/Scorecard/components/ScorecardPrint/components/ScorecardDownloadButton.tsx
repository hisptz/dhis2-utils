import { DropdownButton, FlyoutMenu, MenuItem } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useEffect, useRef, useState } from "react";
import { useScorecardData } from "../../DataProvider";
import type { AnalyticsData } from "../../../utils/data";
import { ScorecardPreviewArea } from "./ScorecardPreviewArea";
import { useReactToPrint } from "react-to-print";

function DownloadMenu() {
	const previewRef = useRef<HTMLDivElement | null>(null);
	const print = useReactToPrint({
		contentRef: previewRef,
		preserveAfterPrint: false,
	});

	return (
		<>
			<ScorecardPreviewArea previewRef={previewRef} />
			<FlyoutMenu>
				<MenuItem label={i18n.t("Excel")} />
				<MenuItem
					onClick={() => {
						print();
					}}
					label={i18n.t("PDF")}
				/>
				<MenuItem label={i18n.t("CSV")} />
				<MenuItem label={i18n.t("ALMA")}>
					<MenuItem label={i18n.t("Data(JSON)")} />
					<MenuItem label={i18n.t("Metadata")} />
				</MenuItem>
			</FlyoutMenu>
		</>
	);
}

export function ScorecardDownloadButton() {
	const [loading, setLoading] = useState<boolean>(false);
	const { data: dataEngine } = useScorecardData();

	useEffect(() => {
		const listener = (data: AnalyticsData[] | "done") => {
			if (data === "done") {
				setLoading(false);
			}
		};
		dataEngine.addDataListener(listener);
		return () => {
			dataEngine.removeListener(listener);
		};
	}, [dataEngine]);

	return (
		<DropdownButton disabled={loading} component={<DownloadMenu />}>
			{i18n.t("Download")}
		</DropdownButton>
	);
}
