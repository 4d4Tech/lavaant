import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { p as initialVendorCustomers, y as usd } from "./auth-BUW1x0A9.mjs";
import { j as BadgeCheck, u as Phone } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { a as Td, f as useFirestoreCollection, i as TableWrap, o as Th, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendor.customers-Cqnxo61V.js
var import_jsx_runtime = require_jsx_runtime();
function CustomerRoster() {
	const { data: vendorCustomers } = useFirestoreCollection("vendorCustomers", initialVendorCustomers);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "vendor",
		title: "Customer roster",
		subtitle: "Linked and verified Lavaant Inventory accounts",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "font-bold",
			children: "Invite customer"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 lg:hidden",
			children: vendorCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate text-sm font-bold",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									c.contact,
									" · ",
									c.phone
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: c.verified ? "Verified" : "Unverified" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-3 gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "YTD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-bold",
								children: usd(c.ytd)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Open"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-bold",
								children: c.openOrders
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Terms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-bold",
								children: c.terms
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-3 w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mr-1 size-4" }),
							" Call ",
							c.contact ? c.contact.split(" ")[0] : "contact"
						]
					})
				]
			}, c.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden lg:block",
			title: `${vendorCustomers.length} linked customers`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Customer" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Primary contact" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Terms" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
						className: "text-right",
						children: "Open orders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
						className: "text-right",
						children: "YTD revenue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Last order" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: vendorCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "hover:bg-muted/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [c.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
								className: "size-4 shrink-0 text-success",
								"aria-label": "Verified"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: c.name
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: c.contact }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: c.phone
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "text-muted-foreground",
							children: c.terms
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "text-right font-semibold",
							children: c.openOrders
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "text-right font-bold",
							children: usd(c.ytd)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "text-muted-foreground",
							children: c.lastOrder
						})
					]
				}, c.id)) })]
			}) })
		})]
	});
}
//#endregion
export { CustomerRoster as component };
