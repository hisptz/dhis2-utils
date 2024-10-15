import { DropdownButton, FlyoutMenu, MenuItem } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { type RefObject, useEffect, useRef, useState } from "react";
import { useScorecardData } from "../../DataProvider";
import { useReactToPrint } from "react-to-print";
import { useScorecardConfig } from "../../ConfigProvider";
import { ScorecardPreviewArea } from "./ScorecardPreviewArea";

function DownloadMenu({
	previewRef,
}: {
	previewRef: RefObject<HTMLDivElement>;
}) {
	const config = useScorecardConfig();
	const print = useReactToPrint({
		contentRef: previewRef,
		preserveAfterPrint: false,
		documentTitle: config.title,
	});

	return (
		<>
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
	const { data: dataEngine } = useScorecardData();
	const [completed, setCompleted] = useState<boolean>(dataEngine.isDone);
	const previewRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		return dataEngine.addOnCompleteListener(setCompleted);
	}, [dataEngine]);

	return (
		<>
			{completed && <ScorecardPreviewArea previewRef={previewRef} />}
			<DropdownButton
				disabled={!completed}
				component={<DownloadMenu previewRef={previewRef} />}
			>
				{!completed ? i18n.t("Please wait...") : i18n.t("Download")}
			</DropdownButton>
		</>
	);
}
