import type { ScorecardViewOptions } from "../schemas/config";
import { get, set } from "lodash";
import { useScorecardViewStateEngine } from "../components";
import { useEffect, useState } from "react";

export type ViewOptionListener = {
	key: keyof ScorecardViewOptions;
	listener: (
		value?: ScorecardViewOptions[keyof ScorecardViewOptions],
	) => void;
};

export type ScorecardViewStateEngine = ReturnType<
	typeof createScorecardViewStateEngine
>;

export function createScorecardViewStateEngine(
	defaultOptions: ScorecardViewOptions,
) {
	return {
		options: defaultOptions as ScorecardViewOptions,
		listeners: [] as ViewOptionListener[],
		optionsListeners: [] as Array<(options: ScorecardViewOptions) => void>,
		updateOption(
			key: keyof ScorecardViewOptions,
			value: ScorecardViewOptions[keyof ScorecardViewOptions],
		) {
			set(this.options, key, value);
			const listeners: ViewOptionListener[] = this.listeners.filter(
				(listener: ViewOptionListener) => listener.key === key,
			);
			for (const listener of listeners) {
				listener.listener(value);
			}
			for (const listener of this.optionsListeners) {
				listener(this.options);
			}
		},
		updateOptions(options: ScorecardViewOptions) {
			this.options = {
				...this.options,
				...options,
			};
			for (const listener of this.listeners) {
				listener.listener(options[listener.key]);
			}
			for (const listener of this.optionsListeners) {
				listener(this.options);
			}
		},
		addOptionListener(listener: (options: ScorecardViewOptions) => void) {
			this.optionsListeners.push(listener);

			return () => {
				this.optionsListeners = this.optionsListeners.filter(
					(l: (options: ScorecardViewOptions) => void) =>
						l !== listener,
				);
			};
		},
		addListener(listener: ViewOptionListener) {
			this.listeners.push(listener);
			return () => {
				this.listeners = this.listeners.filter(
					(l: ViewOptionListener) => l !== listener,
				);
			};
		},
		removeListener(listener: ViewOptionListener) {
			this.listeners = this.listeners.filter(
				(l: ViewOptionListener) => listener !== l,
			);
		},
	};
}

export function useScorecardViewStateValue<
	ValueType extends ScorecardViewOptions[keyof ScorecardViewOptions],
>(key: keyof ScorecardViewOptions) {
	const viewEngine = useScorecardViewStateEngine();
	const [value, setValue] = useState<ValueType>(
		get(viewEngine.options, key) as ValueType,
	);
	useEffect(() => {
		const unsubscribe = viewEngine.addListener({
			key,
			listener(value) {
				setValue(value as ValueType);
			},
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return value;
}

export function useScorecardViewOptions() {
	const viewEngine = useScorecardViewStateEngine();
	const [options, setOptions] = useState<ScorecardViewOptions>(
		viewEngine.options,
	);

	useEffect(() => {
		const unsubscribe = viewEngine.addOptionListener(setOptions);

		return () => {
			unsubscribe();
		};
	}, []);

	return options;
}

export function useUpdateScorecardViewState(key: keyof ScorecardViewOptions) {
	const viewEngine = useScorecardViewStateEngine();
	return (value: ScorecardViewOptions[keyof ScorecardViewOptions]) => {
		viewEngine.updateOption(key, value);
	};
}
