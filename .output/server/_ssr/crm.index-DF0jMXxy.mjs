import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as initialPlannerStops, l as initialCrmCustomers, y as usd } from "./auth-BUW1x0A9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as CalendarCheck, b as Clock, p as MapPin, u as Phone } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { f as useFirestoreCollection, n as StatCard, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm.index-DF0jMXxy.js
var import_jsx_runtime = require_jsx_runtime();
function CrmDashboard() {
	const { data: plannerStops } = useFirestoreCollection("plannerStops", initialPlannerStops);
	const { data: crmCustomers } = useFirestoreCollection("crmCustomers", initialCrmCustomers);
	const done = plannerStops.filter((s) => s.done).length;
	const next = plannerStops.find((s) => !s.done);
	const deadlines = crmCustomers.filter((c) => c.quoteDeadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "crm",
		title: "Let's move, Tyler",
		subtitle: `Today — ${plannerStops.length} stops planned`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "font-bold",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/crm/planner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "mr-1 size-4" }), " Today's plan"]
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Stops completed",
						value: `${done}/${plannerStops.length}`,
						tone: "success",
						hint: "In-person visits today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Quotes due",
						value: String(deadlines.length),
						tone: "destructive",
						hint: "Deadlines this week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Pipeline",
						value: usd(184e3),
						hint: "Open quotes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "YTD book",
						value: usd(crmCustomers.reduce((s, c) => s + Number(c.ytd || 0), 0)),
						delta: "+12.7% vs. last year"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Up next",
					description: "Your next stop",
					className: "xl:col-span-2",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/crm/planner",
							children: "Full planner"
						})
					}),
					children: next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "truncate font-display text-lg font-black",
										children: next.customer
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: next.contact
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 flex items-center gap-1.5 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: next.address
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 shrink-0" }),
											" ",
											next.time
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: next.type === "Quote" ? "Hot" : "Warm" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-lg bg-muted/60 p-3 text-sm",
							children: next.purpose
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mr-1 size-4" }), " Call ahead"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/crm/orders",
									children: "Take an order"
								})
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "Every stop is knocked out. Go sell tomorrow."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Quote deadlines",
					description: "Don't let these slip",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: deadlines.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-bold",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: c.contact
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: c.temp })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs font-bold text-destructive",
								children: ["Due ", c.quoteDeadline]
							})]
						}, c.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Accounts to touch",
				description: "Longest since last visit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2",
					children: crmCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-bold",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									"Last visit ",
									c.lastVisit,
									" · next ",
									c.nextVisit
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs font-bold",
							children: usd(c.ytd)
						})]
					}, c.id))
				})
			})
		]
	});
}
//#endregion
export { CrmDashboard as component };
