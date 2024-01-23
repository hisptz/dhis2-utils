import { IconMore24 } from "@dhis2/ui";
import HighchartsReact from "highcharts-react-official";
import React, { useRef, useState } from "react";
import {
	onCSVDownload,
	onFullScreenView,
	onImageDownload,
	onPDFDownload,
	onViewAsTable,
} from "../../services/export.js";
import { ChartMenu } from "./components/Menu.js";
import { ChartExportMenuItem } from "./interfaces/menu.js";

export function ChartDownloadMenu({
	chartRef,
	exclude,
	icon,
}: {
	chartRef: HighchartsReact.RefObject | null;
	exclude?: ChartExportMenuItem[];
	icon?: React.ReactNode;
}) {
	const menuButtonRef = useRef<HTMLDivElement | null>(null);
	const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);
	const toggleMenu = () => {
		if (menuRef === null) {
			setMenuRef(menuButtonRef.current);
		} else {
			setMenuRef(null);
		}
	};

	const chart = chartRef;

	const onMenuClick = (action: string) => {
		if (chart) {
			switch (action) {
				case "png":
					onImageDownload(chart, "png");
					break;
				case "jpeg":
					onImageDownload(chart, "jpeg");
					break;
				case "svg":
					onImageDownload(chart, "svg+xml");
					break;
				case "csv":
					onCSVDownload(chart);
					break;
				case "pdf":
					onPDFDownload(chart);
					break;
				case "table":
					onViewAsTable(chart, true);
					break;
				case "full-screen":
					onFullScreenView(chart);
					break;
			}
		}
	};

	return (
		<>
			<div onClick={toggleMenu} ref={menuButtonRef}>
				{icon ?? <IconMore24 />}
			</div>
			{menuRef && (
				<ChartMenu
					exclude={exclude}
					onClick={onMenuClick}
					onClose={toggleMenu}
					menuRef={menuRef}
				/>
			)}
		</>
	);
}
