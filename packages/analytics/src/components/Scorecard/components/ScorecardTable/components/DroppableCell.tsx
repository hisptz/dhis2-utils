import { colors } from "@dhis2/ui";
import React, { useMemo } from "react";
import type { ScorecardDraggableItems } from "../../../schemas/config";
import { useDroppable } from "@dnd-kit/core";
import { head } from "lodash";

export default function DroppableCell({
	accept,
	children,
}: {
	accept: ScorecardDraggableItems[];
	children: React.ReactNode;
}) {
	const { setNodeRef, active } = useDroppable({
		id: head(accept) as string,
	});

	const canDrop = useMemo(() => {
		if (!active) return false;
		return accept.includes(active.id as ScorecardDraggableItems);
	}, [accept, active]);

	return (
		<div
			ref={setNodeRef}
			className="column center align-items-center"
			style={{
				border: canDrop ? `2px dashed ${colors.grey700}` : undefined,
				background: canDrop ? `${colors.grey100}` : undefined,
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}
