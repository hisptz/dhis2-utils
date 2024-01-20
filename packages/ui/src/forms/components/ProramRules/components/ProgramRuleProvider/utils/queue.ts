import { isEmpty } from "lodash";

export class Queue<T> {
	callback: (params: T) => void;
	active: boolean = false;
	queue: T[] = [];

	constructor(callback: (params: T) => void) {
		this.callback = callback;
	}

	next() {
		if (!isEmpty(this.queue)) {
			const param = this.queue.shift() as T;
			this.callback(param);
			this.next();
		}
		this.active = false;
	}

	add(param: T) {
		this.queue.push(param);
		if (!this.active) {
			this.next();
		}
	}
}
