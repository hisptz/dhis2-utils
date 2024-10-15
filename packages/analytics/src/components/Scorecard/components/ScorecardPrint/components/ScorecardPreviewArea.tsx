import React, { memo, type RefObject } from "react";
import { TableStateProvider } from "../../TableStateProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ScorecardTable } from "../../ScorecardTable";
import { ScorecardHeader } from "../../ScorecardHeader";
import { ScorecardLegendsView } from "../../ScorecardLegendsView";

export const ScorecardPreviewArea = memo(function ScorecardPreviewArea({
	previewRef,
}: {
	previewRef: RefObject<HTMLDivElement>;
}) {
	return (
		<div style={{ display: "none" }}>
			<div
				className="print-preview"
				style={{
					height: "100%",
					display: "flex",
					gap: 16,
					flexDirection: "column",
				}}
				ref={previewRef}
			>
				<ScorecardHeader />
				<ScorecardLegendsView />
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
});
