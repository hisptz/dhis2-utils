import { AccessObject, CustomLegend, LegendDefinition } from "../../interfaces";

/**
 * The uid function generates a unique identifier acceptable as a DHIS2 resource id.
 * @returns A random string of length 11
 */
export function uid(): string {
	const letters = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const allowedChars = "0123456789" + letters;
	const NUMBER_OF_CODEPOINTS = allowedChars.length;
	const CODESIZE = 11;
	let uid;
	uid = letters.charAt(Math.random() * letters.length);
	for (let i = 1; i < CODESIZE; ++i) {
		uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
	}
	return uid;
}

/**
 * This translates a string access to an object
 *
 * @param access The access string
 *
 * @returns  [@link(AccessObject)]
 *
 * */
export function translateAccess(access: string): AccessObject {
	const translatedAccess = {
		read: false,
		write: false,
	};
	if (access.includes("r")) {
		translatedAccess.read = true;
	}
	if (access.includes("w")) {
		translatedAccess.write = true;
	}
	return translatedAccess;
}

/**
 * This constructs an app url
 *
 * @param baseUrl The base url of the app
 * @param config app.config.js config object
 * @param serverVersion DHIS2 version server object
 *
 * @returns The URL at which the app is hosted within DHIS2
 * */
export function constructAppUrl(
	baseUrl: string,
	config: { name: string; title: string },
	serverVersion: {
		major: number;
		minor: number;
		patch: number;
	},
): string {
	let appUrl = baseUrl;
	const isModernServer =
		serverVersion.major >= 2 && serverVersion.minor >= 35;
	// From core version 2.35, short_name is used instead of the human-readable title to generate the url slug
	const urlSafeAppSlug = (isModernServer ? config.name : config.title)
		.replace(/[^A-Za-z0-9\s-]/g, "")
		.replace(/\s+/g, "-");

	// From core version 2.35, core apps are hosted at the server root under the /dhis-web-* namespace

	appUrl += `/api/apps/${urlSafeAppSlug}/`;

	// Prior to core version 2.35, installed applications did not properly serve "pretty" urls (`/` vs `/index.html`)
	if (!isModernServer) {
		appUrl += "index.html";
	}
	// Clean up any double slashes
	const scheme = appUrl.substr(0, appUrl.indexOf("://") + 3);
	appUrl = scheme + appUrl.substr(scheme.length).replace(/\/+/g, "/");
	return appUrl;
}

/**
 *
 * Return auto-calculated legend values for given legendDefinitions
 *
 * @param [legendDefinitions] Legend definitions
 * @returns Legend values
 * */
export function generateLegendDefaults(
	legendDefinitions: LegendDefinition,
	{ weight, highIsGood }: { weight: number; highIsGood: boolean },
): Array<CustomLegend> {
	return [];
}

/**
 *
 * Return a legend definition object that matches the value based on the specified legends
 *
 * @param value The value to match
 *
 * @param legends The legends to match against
 *
 * @param options object of consisting of the following properties:
 *  - max: the maximum value acceptable
 *  - min: the minimum value acceptable
 *  - legendDefinitions: Array of legend definitions to match the legends with
 *
 * */
export function findLegend(
	value: number | string,
	legends: Array<CustomLegend>,
	options: {
		max: number;
		legendDefinitions: Array<{ id: string; label: string; color: string }>;
	},
): LegendDefinition {
	return {
		id: "",
		label: "",
		color: "",
	};
}
