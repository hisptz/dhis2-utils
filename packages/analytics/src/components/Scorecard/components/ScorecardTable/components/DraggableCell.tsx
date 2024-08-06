import { colors } from "@dhis2/ui";
import React from "react";
import type { ScorecardDraggableItems } from "../../../schemas/config";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function DraggableCell({
	children,
	type,
	style,
	...props
}: {
	children: React.ReactNode;
	type: ScorecardDraggableItems;
	style?: React.CSSProperties;
}) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: type,
		});

	const transformStyle = transform
		? {
				transform: CSS.Translate.toString(transform),
			}
		: undefined;

	return (
		<div
			id={type}
			{...props}
			{...attributes}
			{...listeners}
			className="column center"
			style={{
				...(style ?? {}),
				...transformStyle,
				background: isDragging ? colors?.grey400 : undefined,
				cursor: "move",
				opacity: isDragging ? 0.5 : 1,
				height: "100%",
				width: "100%",
				padding: "0 12px",
				zIndex: isDragging ? 3 : undefined,
			}}
			ref={setNodeRef}
		>
			{children}
		</div>
	);
}
