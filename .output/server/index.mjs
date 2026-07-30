globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx+unenv.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-30T22:55:09.680Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-07-30T22:55:09.680Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/BarChart-CreEtBN5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51cd-cRW4hrGLI21IACbrcSDvxctlQ4U\"",
		"mtime": "2026-07-30T22:55:08.610Z",
		"size": 20941,
		"path": "../public/assets/BarChart-CreEtBN5.js"
	},
	"/assets/app-shell-DN9a0FAs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93b7-4l3nVLB91Rr3IUwfd2rGDNnopgY\"",
		"mtime": "2026-07-30T22:55:08.610Z",
		"size": 37815,
		"path": "../public/assets/app-shell-DN9a0FAs.js"
	},
	"/assets/CartesianChart-IBWiTJUc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51db3-HYU+Y1WyVCbX2MVt4YKQmH2bldk\"",
		"mtime": "2026-07-30T22:55:08.610Z",
		"size": 335283,
		"path": "../public/assets/CartesianChart-IBWiTJUc.js"
	},
	"/assets/button-DxliLHbZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1230-MbGFbJ4NpSxgKNGCqNLiEarnUUQ\"",
		"mtime": "2026-07-30T22:55:08.611Z",
		"size": 4656,
		"path": "../public/assets/button-DxliLHbZ.js"
	},
	"/assets/clock-Csvuhm2W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-Qtpg7OCd7udWcIR3NWIZ+bB7C3c\"",
		"mtime": "2026-07-30T22:55:08.611Z",
		"size": 162,
		"path": "../public/assets/clock-Csvuhm2W.js"
	},
	"/assets/badge-check-DMhyVZnI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-GyLRummpvx/plB4Qiu+b+3kyz2I\"",
		"mtime": "2026-07-30T22:55:08.611Z",
		"size": 309,
		"path": "../public/assets/badge-check-DMhyVZnI.js"
	},
	"/assets/crm.customers-5Uz2ad6X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1008-hjr08wxA2+oVvQKC8i9yQbsIj6Y\"",
		"mtime": "2026-07-30T22:55:08.612Z",
		"size": 4104,
		"path": "../public/assets/crm.customers-5Uz2ad6X.js"
	},
	"/assets/crm.index-CbLnQxEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1031-C3jBKVENO6FRWp37TSTs9mzRA1U\"",
		"mtime": "2026-07-30T22:55:08.612Z",
		"size": 4145,
		"path": "../public/assets/crm.index-CbLnQxEG.js"
	},
	"/assets/crm.orders-DolbfHhc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee2-PchMcGgWNQ9mFJ45Fj6QSVHe8xU\"",
		"mtime": "2026-07-30T22:55:08.612Z",
		"size": 3810,
		"path": "../public/assets/crm.orders-DolbfHhc.js"
	},
	"/assets/crm.planner-BEac5dqw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1402-qJbnu7hFFLrb8fPP+90rcY332bg\"",
		"mtime": "2026-07-30T22:55:08.612Z",
		"size": 5122,
		"path": "../public/assets/crm.planner-BEac5dqw.js"
	},
	"/assets/firebase-service-B3-wtDXK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15b4-rr/Ibe4rdQMUANl/b8cwX/uROXc\"",
		"mtime": "2026-07-30T22:55:08.612Z",
		"size": 5556,
		"path": "../public/assets/firebase-service-B3-wtDXK.js"
	},
	"/assets/getRadiusAndStrokeWidthFromDot-W5WEY3E9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143b-5vFDgFo7u57Vfm9n0MOadIXWlrg\"",
		"mtime": "2026-07-30T22:55:08.613Z",
		"size": 5179,
		"path": "../public/assets/getRadiusAndStrokeWidthFromDot-W5WEY3E9.js"
	},
	"/assets/inventory.index-CqpscI6g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4484-U5SgGiFMRMGv2bfhbWSsdQnISVY\"",
		"mtime": "2026-07-30T22:55:08.613Z",
		"size": 17540,
		"path": "../public/assets/inventory.index-CqpscI6g.js"
	},
	"/assets/inventory.items-DXogKCYY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1327-RCNQTFlsLgf31+bUIOX5vcUieTw\"",
		"mtime": "2026-07-30T22:55:08.613Z",
		"size": 4903,
		"path": "../public/assets/inventory.items-DXogKCYY.js"
	},
	"/assets/inventory.orders.new-CvalSzU3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23f7-ZkagtdiI4Jqm2Rq2dKZrIH3B3YI\"",
		"mtime": "2026-07-30T22:55:08.613Z",
		"size": 9207,
		"path": "../public/assets/inventory.orders.new-CvalSzU3.js"
	},
	"/assets/inventory.tracking-Dq27dB94.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132b-n3i3s3DfiaVOa7SG4iEW3AccAKQ\"",
		"mtime": "2026-07-30T22:55:08.614Z",
		"size": 4907,
		"path": "../public/assets/inventory.tracking-Dq27dB94.js"
	},
	"/assets/map-pin-CxZFZkiH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-pqiJHOZYSDrrEl0kbj816SbOQZ0\"",
		"mtime": "2026-07-30T22:55:08.614Z",
		"size": 252,
		"path": "../public/assets/map-pin-CxZFZkiH.js"
	},
	"/assets/phone-CNQxWkRh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-q4ZfihdwJeC4Ab3NlXwyrqjrgCI\"",
		"mtime": "2026-07-30T22:55:08.614Z",
		"size": 315,
		"path": "../public/assets/phone-CNQxWkRh.js"
	},
	"/assets/plus-BT01rpAq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-pVIAuAUm4AjpiiRxQu7t1wuYYQE\"",
		"mtime": "2026-07-30T22:55:08.614Z",
		"size": 271,
		"path": "../public/assets/plus-BT01rpAq.js"
	},
	"/assets/routes-5X2hoqyo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1350-XkDLV0tx05cGLeh/uNxZescyA5s\"",
		"mtime": "2026-07-30T22:55:08.614Z",
		"size": 4944,
		"path": "../public/assets/routes-5X2hoqyo.js"
	},
	"/assets/send-BnMLXxNi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11b-5R8mFcY3mYrFLCAxTCbq8fz4MDk\"",
		"mtime": "2026-07-30T22:55:08.615Z",
		"size": 283,
		"path": "../public/assets/send-BnMLXxNi.js"
	},
	"/assets/index-BRibzYtz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5635f-TLGnh/8HMyJsygWNTeS0oAC3LpE\"",
		"mtime": "2026-07-30T22:55:08.610Z",
		"size": 353119,
		"path": "../public/assets/index-BRibzYtz.js"
	},
	"/assets/auth-C5aTf81i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97bb4-cIL2IM3crXjTBGEbUXs15v10wTo\"",
		"mtime": "2026-07-30T22:55:08.611Z",
		"size": 621492,
		"path": "../public/assets/auth-C5aTf81i.js"
	},
	"/assets/truck-BvvkdiWo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18f-F4WGEmLq7WTYny45/Bkyinf7dok\"",
		"mtime": "2026-07-30T22:55:08.615Z",
		"size": 399,
		"path": "../public/assets/truck-BvvkdiWo.js"
	},
	"/assets/vendor.catalog-DI8WhCda.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba1-iuE+XwPr6u1IPYCTnJXGJw9qvOY\"",
		"mtime": "2026-07-30T22:55:08.615Z",
		"size": 2977,
		"path": "../public/assets/vendor.catalog-DI8WhCda.js"
	},
	"/assets/styles-DDHN4TvN.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"143c0-41IUo9FLBBpjPP7Sv7PdIFHvFVo\"",
		"mtime": "2026-07-30T22:55:08.616Z",
		"size": 82880,
		"path": "../public/assets/styles-DDHN4TvN.css"
	},
	"/assets/vendor.customers-BBzxEfJW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c22-p0XWjzroptdWMB+uqxDfwL68/JQ\"",
		"mtime": "2026-07-30T22:55:08.615Z",
		"size": 3106,
		"path": "../public/assets/vendor.customers-BBzxEfJW.js"
	},
	"/assets/vendor.inbox-B2U7wPAa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112b-wKstgAaAOw3Or4VGzGk8W5aAHjY\"",
		"mtime": "2026-07-30T22:55:08.615Z",
		"size": 4395,
		"path": "../public/assets/vendor.inbox-B2U7wPAa.js"
	},
	"/assets/vendor.index-DxKmXnm7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"468f-kucOsNnL7QhQxe9ciXfC9b5K89E\"",
		"mtime": "2026-07-30T22:55:08.616Z",
		"size": 18063,
		"path": "../public/assets/vendor.index-DxKmXnm7.js"
	},
	"/assets/vendor.reports-DPy73A9b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a64-Iyps8EtFstgBW92bEh2MzH9A9XE\"",
		"mtime": "2026-07-30T22:55:08.616Z",
		"size": 2660,
		"path": "../public/assets/vendor.reports-DPy73A9b.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_6eGpaP = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_6eGpaP
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
