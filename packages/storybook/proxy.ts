const httpProxy = require("http-proxy");
const {config} = require("dotenv");

config();

const target = process.env.DHIS2_PROXY_SERVER ?? "https://play.dhis2.org/2.38.1.1";
const port = parseInt(process.env.DHIS2_PROXY_PORT ?? "8080");

console.info(`Proxy to ${target} started at ${port}`);
const proxy = httpProxy.createProxyServer({
    target: target,
    changeOrigin: true,
    secure: false,
    protocolRewrite: "http",
    cookieDomainRewrite: "",
    cookiePathRewrite: "/",
});
try {
    proxy.listen(port);
} catch (e: any) {
    console.error("Proxy failed:" + e?.message ?? e.toString())
}
