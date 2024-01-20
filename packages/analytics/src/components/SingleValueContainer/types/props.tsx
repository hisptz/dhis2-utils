export type SingleValueVisualizerProps = {
	title: string;
	singleValueItems: Array<SingleValue>;
	animationDuration?: number;
	animationDelay?: number;
};

export type SingleValueContainerProps = SingleValueVisualizerProps;

export type SingleValue = {
	label: string;
	value: number;
	percentage?: number;
	decimalPlaces?: number;
	color?: string;
	animationDuration?: number;
	animationDelay?: number;
};
