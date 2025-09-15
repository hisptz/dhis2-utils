import { LinearLoader } from "@dhis2/ui";
import { type ReactElement } from "react";
import styles from "../../styles/SingleValueContainer.module.css";

export default function SingleValuePercentage({
	percentage,
	color,
}: any): ReactElement {
	const width = "100%";
	return (
		<div className="w-100">
			<LinearLoader
				className={styles["percent-value"]}
				width={width}
				amount={percentage}
			/>
		</div>
	);
}
