import { cloneDeep } from "lodash";
import { uid } from "@hisptz/dhis2-utils";

export class Legend {
	id: string;
	legendDefinitionId: string;
	startValue: number | undefined;
	endValue: number | undefined;

	constructor({
		id,
		legendDefinitionId,
	}: {
		id?: string;
		legendDefinitionId: string;
	}) {
		this.id = id ?? uid();
		this.legendDefinitionId = legendDefinitionId;
	}

	static set(object: { [key: string]: any }, key: string, value: any) {
		if (key) {
			const updatedObject = cloneDeep(object);
			updatedObject[key] = value;
			return updatedObject;
		}
		return this;
	}

	toJSON() {
		return {
			id: this.id,
			legendDefinitionId: this.legendDefinitionId,
			startValue: this.startValue,
			endValue: this.endValue,
		};
	}
}
