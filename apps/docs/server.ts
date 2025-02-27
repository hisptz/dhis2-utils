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
		secure: false,
		preserveHeaderKeyCase: true,
	})
	.on("start", (req) => {
		console.log("Proxying", req.url);
	})
	.on("proxyReq", (proxyReq, req) => {
		console.log(proxyReq.path);
		console.log(proxyReq.headersSent);
	})
	.on("proxyRes", (proxyRes, req, res) => {
		console.log(proxyRes.statusCode);
	})
	.listen(8080);
