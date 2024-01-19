import { UseFormReturn } from "react-hook-form";
import { ThematicLayerConfig } from "../../MapLayer/interfaces";

export interface ThematicLayerConfigurationProps {
	exclude?: string[];
	form: UseFormReturn<ThematicLayerConfig>;

	[key: string]: any;
}

export interface ThematicLayerConfigModalProps {
	open: boolean;
	config?: ThematicLayerConfig;
	exclude?: string[];
	onClose: () => void;
	onChange: (config: ThematicLayerConfig) => void;
}
