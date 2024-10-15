import { colors } from "@dhis2/ui";
import React from "react";
import type { ScorecardDraggableItems } from "../../../schemas/config";
import { useDrag } from "react-dnd";

export function DraggableCell({
	children,
	type,
	style,
	id,
	...props
}: {
	children: React.ReactNode;
	type: ScorecardDraggableItems;
	id: string;
	style?: React.CSSProperties;
}) {
	const [collected, drag, dragPreview] = useDrag(() => {
		return {
			type,
			item: {
				id,
			},
			collect: (monitor) => {
				return {
					isDragging: monitor.isDragging(),
				};
			},
		};
	});

	if (collected.isDragging) {
		return (
			<div
				ref={dragPreview}
				style={{
					backgroundColor: colors.grey400,
					opacity: 0.5,
					cursor: "move",
				}}
			>
				{children}
			</div>
		);
	}

	return (
		<div style={{ cursor: "move" }} id={type} ref={drag}>
			{children}
		</div>
	);
}
