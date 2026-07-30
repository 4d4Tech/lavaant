import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as initialCrmCustomers, y as usd } from "./auth-BUW1x0A9.mjs";
import { D as CalendarClock, _ as Heart, u as Phone } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { a as Td, f as useFirestoreCollection, i as TableWrap, o as Th, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm.customers-B_fFEE3-.js
var import_jsx_runtime = require_jsx_runtime();
function CrmCustomers() {
	const { data: crmCustomers } = useFirestoreCollection("crmCustomers", initialCrmCustomers);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "crm",
		title: "Customer tracking",
		subtitle: "Visit history, deadlines, and the details that win the order",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "font-bold",
			children: "Add account"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: crmCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-display text-base font-bold",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm",
									children: [
										c.contact,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["· ", c.title]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: c.phone
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: c.temp })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Last visit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "truncate font-bold",
									children: c.lastVisit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Next visit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "truncate font-bold",
									children: c.nextVisit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Quote due"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: `truncate font-bold ${c.quoteDeadline ? "text-destructive" : ""}`,
									children: c.quoteDeadline ?? "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "YTD"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "truncate font-bold",
									children: usd(c.ytd)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0",
							children: c.preferences
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mr-1 size-4" }), " Call"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "mr-1 size-4" }), " Schedule visit"]
						})]
					})
				]
			}, c.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "hidden lg:block",
			title: "Visit cadence",
			description: "All accounts",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Account" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Contact" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Last visit" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Next required" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Quote deadline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
						className: "text-right",
						children: "YTD"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: crmCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "hover:bg-muted/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "font-semibold",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.contact }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "text-muted-foreground",
							children: c.lastVisit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: c.nextVisit }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: c.quoteDeadline ? "font-bold text-destructive" : "",
							children: c.quoteDeadline ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
							className: "text-right font-bold",
							children: usd(c.ytd)
						})
					]
				}, c.id)) })]
			}) })
		})]
	});
}
//#endregion
export { CrmCustomers as component };
