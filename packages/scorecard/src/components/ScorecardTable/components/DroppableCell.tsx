import { colors } from "@dhis2/ui";
import { type ReactNode } from "react";
import type { ScorecardDraggableItems } from "../../../schemas/config";
import { useDrop } from "react-dnd";

export default function DroppableCell({
	accept,
	children,
}: {
	accept: ScorecardDraggableItems[];
	children: ReactNode;
}) {
	const [collectedProps, drop] = useDrop(() => {
		return {
			accept,
			collect: (monitor) => {
				if (monitor.canDrop()) {
					return {
						style: {
							border: `2px dashed ${colors.grey700}`,
							background: `${colors.grey100}`,
							width: "100%",
						},
					};
				} else {
					return {
						style: {
							width: "100%",
							border: `2px solid transparent`,
						},
					};
				}
			},
			drop: (results: { id: string }) => {
				return results;
			},
		};
	});

	return (
		<div
			ref={drop}
			className="column center align-items-center"
			{...collectedProps}
		>
			{children}
		</div>
	);
}
