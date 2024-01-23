import NativeDataSource from "./nativeDataSource.js";

export class SqlViews extends NativeDataSource {
	async getGroups(engine: any): Promise<any> {
		return [];
	}
}
