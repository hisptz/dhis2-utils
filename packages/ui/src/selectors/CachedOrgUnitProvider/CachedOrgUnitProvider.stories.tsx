import { Meta, StoryObj } from "@storybook/react";
import { OfflineOrgUnitProvider } from "./CachedOrgUnitProvider";
import { OrgUnitSelector } from "../OrgUnitSelector/OrgUnitSelector";
import { Button } from "@dhis2/ui";
import { CustomOrgUnitProvider } from "./components/CachedOrgUnits";
import { useClearOrganisationData } from "./hooks";

const meta: Meta<typeof OfflineOrgUnitProvider> = {
	title: "Offline Provider/Organisation Unit",
	component: OfflineOrgUnitProvider,
};

type Story = StoryObj<typeof OfflineOrgUnitProvider>;

export const Default: Story = {
	name: "Default",
	args: {
		fallback: <>Loading...</>,
		pageSize: 1000,
	},

	render: (args) => {
		return (
			<OfflineOrgUnitProvider {...args}>
				<CustomOrgUnitProvider>
					<OrgUnitSelector />
				</CustomOrgUnitProvider>
			</OfflineOrgUnitProvider>
		);
	},
};

function ClearCacheComponent() {
	const clear = useClearOrganisationData();
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 32,
			}}
		>
			<CustomOrgUnitProvider>
				<OrgUnitSelector />
			</CustomOrgUnitProvider>
			<Button
				onClick={() => {
					clear();
					window.location.reload();
				}}
			>
				Clear cache
			</Button>
		</div>
	);
}

/**
 * You can use the function returned from `useClearOrganisationUnitData` hook to clear the cached data.
 *
 * ```tsx
 * function ClearCacheComponent() {
 * 	const clear = useClearOrganisationData();
 * 	return (
 * 		<div
 * 			style={{
 * 				display: "flex",
 * 				flexDirection: "column",
 * 				gap: 32,
 * 			}}
 * 		>
 * 			<CustomOrgUnitProvider>
 * 				<OrgUnitSelector />
 * 			</CustomOrgUnitProvider>
 * 			<Button
 * 				onClick={() => {
 * 					clear();
 * 					window.location.reload();
 * 				}}
 * 			>
 * 				Clear cache
 * 			</Button>
 * 		</div>
 * 	);
 * }
 * ```
 * */
export const WithClearCache: Story = {
	name: "With clear cache",
	args: {
		fallback: <>Loading...</>,
		pageSize: 1000,
	},

	render: (args) => {
		return (
			<OfflineOrgUnitProvider {...args}>
				<ClearCacheComponent />
			</OfflineOrgUnitProvider>
		);
	},
};

export default meta;
