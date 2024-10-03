import { ScorecardConfigProvider } from "./ConfigProvider";
import { ScorecardStateProvider } from "./StateProvider";
import { ScorecardMetaProvider } from "./MetaProvider";
import React, { type ReactNode } from "react";
import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Button, colors, IconError24 } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";

interface ScorecardContextProps {
	children: ReactNode;
	config: ScorecardConfig;
	initialState?: ScorecardState;
}

function ErrorFallback({
	error,
	resetErrorBoundary,
	height,
}: FallbackProps & { height?: number }) {
	return (
		<div
			style={{
				width: "100%",
				textAlign: "center",
				height: height ?? 500,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 16,
				padding: 16,
			}}
		>
			<IconError24 />
			<h3
				style={{
					color: colors.grey800,
					margin: 0,
				}}
			>
				{i18n.t("Could not load visualization")}
			</h3>
			<p style={{ margin: 0 }}>{error.message}</p>
			{resetErrorBoundary && (
				<Button onClick={resetErrorBoundary} small>
					{i18n.t("Try again")}
				</Button>
			)}
		</div>
	);
}

export function ScorecardContext({
	config,
	children,
	initialState,
}: ScorecardContextProps) {
	return (
		<ErrorBoundary
			resetKeys={[config, initialState]}
			FallbackComponent={ErrorFallback}
		>
			<ScorecardConfigProvider config={config}>
				<ScorecardStateProvider initialState={initialState}>
					<ScorecardMetaProvider>{children}</ScorecardMetaProvider>
				</ScorecardStateProvider>
			</ScorecardConfigProvider>
		</ErrorBoundary>
	);
}
