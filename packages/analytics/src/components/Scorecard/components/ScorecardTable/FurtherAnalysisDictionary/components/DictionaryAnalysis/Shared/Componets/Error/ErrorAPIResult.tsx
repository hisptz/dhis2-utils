import { CenteredContent, colors, IconError24 } from "@dhis2/ui";
import React from "react";

export default function Error({ error }: any) {
	return (
		<div
			className="column center "
			style={{ height: "100%", textAlign: "center" }}
		>
			<CenteredContent>
				<div>
					<IconError24 />
					<p style={{ color: colors.grey900 }}>
						{typeof error === "string"
							? error
							: error?.message ??
								error?.details ??
								error?.toString()}
					</p>
				</div>
			</CenteredContent>
		</div>
	);
}
