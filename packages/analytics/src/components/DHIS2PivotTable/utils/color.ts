export function getTextColorFromBackgroundColor(background: string): string {
	// Remove the hash at the start if it's there
	background = background.replace(/^#/, "");

	// Convert hex to RGB
	let r = parseInt(background.substring(0, 2), 16);
	let g = parseInt(background.substring(2, 4), 16);
	let b = parseInt(background.substring(4, 6), 16);

	// Calculate the YIQ value
	let yiq = (r * 299 + g * 587 + b * 114) / 1000;

	// Return black for light backgrounds and white for dark backgrounds
	return yiq >= 128 ? "#000000" : "#FFFFFF";
}
