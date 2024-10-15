import React, { type RefObject } from "react";
import { TableStateProvider } from "../../TableStateProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ScorecardTable } from "../../ScorecardTable";

export function ScorecardPreviewArea({
	previewRef,
}: {
	previewRef: RefObject<HTMLDivElement>;
}) {
	return (
		<div style={{ display: "none" }}>
			<div
				className="print-preview"
				style={{ flex: 1, height: "100%" }}
				ref={previewRef}
			>
				<TableStateProvider>
					<DndProvider backend={HTML5Backend}>
						<ScorecardTable
							scrollHeight="100%"
							scrollWidth="100%"
							width="100%"
						/>
					</DndProvider>
				</TableStateProvider>
			</div>
		</div>
	);
}
