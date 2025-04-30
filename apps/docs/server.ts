#!/usr/bin/env ts-node
import { config } from "dotenv";
import httpProxy from "http-proxy";

config();

console.log(
	`Starting proxy server at ${8080} pointing to ${process.env.STORYBOOK_DHIS2_PROXY_URL}`,
);

httpProxy
	.createProxyServer({
		target: process.env.STORYBOOK_DHIS2_PROXY_URL,
		headers: {
			Authorization: `ApiToken ${process.env.STORYBOOK_DHIS2_API_TOKEN}`,
		},
		preserveHeaderKeyCase: true,
		secure: false,
	})
	.on("start", (req) => {
		console.log("Proxying", req.url);
	})
	.listen(8080);
