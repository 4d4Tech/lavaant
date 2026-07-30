import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as vendorSalesTrend, m as initialVendorInbox, p as initialVendorCustomers, y as usd } from "./auth-BUW1x0A9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Inbox } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { a as Td, f as useFirestoreCollection, i as TableWrap, n as StatCard, o as Th, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
import { a as XAxis, d as ResponsiveContainer, i as YAxis, l as CartesianGrid, s as Area, t as AreaChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendor.index-DosIanpO.js
var import_jsx_runtime = require_jsx_runtime();
function VendorDashboard() {
	const { data: vendorInbox } = useFirestoreCollection("vendorInbox", initialVendorInbox);
	const { data: vendorCustomers } = useFirestoreCollection("vendorCustomers", initialVendorCustomers);
	const newOrders = vendorInbox.filter((o) => o.status === "Submitted");
	const openValue = vendorInbox.filter((o) => o.status !== "Received").reduce((s, o) => s + Number(o.total || 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "vendor",
		title: "Gulf Coast Industrial Supply",
		subtitle: "Order desk — Dana Whitfield",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "font-bold",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/vendor/inbox",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "mr-1 size-4" }), " Open inbox"]
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "New orders",
						value: String(newOrders.length),
						tone: "accent",
						hint: "Awaiting acknowledgement"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Open order value",
						value: usd(openValue),
						hint: "Not yet received"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "July sales",
						value: usd(171900),
						delta: "+15.1% vs. June"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Linked customers",
						value: String(vendorCustomers.length),
						hint: `${vendorCustomers.filter((c) => c.verified).length} verified`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Sales trend",
					description: "Monthly revenue through Lavaant",
					className: "xl:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: vendorSalesTrend,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "salesFill",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--color-chart-1)",
											stopOpacity: .35
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--color-chart-1)",
											stopOpacity: .02
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										stroke: "var(--color-muted-foreground)",
										fontSize: 12,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 12,
										tickLine: false,
										axisLine: false,
										tickFormatter: (v) => `${v / 1e3}k`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										formatter: (v) => usd(v),
										contentStyle: {
											background: "var(--color-card)",
											border: "1px solid var(--color-border)",
											borderRadius: 10,
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "sales",
										stroke: "var(--color-chart-1)",
										strokeWidth: 3,
										fill: "url(#salesFill)"
									})
								]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Top accounts",
					description: "Revenue year to date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: vendorCustomers.map((c) => {
							const maxVal = vendorCustomers[0]?.ytd || 1;
							const pct = Number(c.ytd || 0) / maxVal * 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 truncate text-sm font-semibold",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs font-bold",
									children: usd(c.ytd)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${pct}%` }
								})
							})] }, c.id);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Latest incoming orders",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vendor/inbox",
						children: "View inbox"
					})
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "PO" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Customer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Received" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Need by" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: vendorInbox.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "font-semibold",
								children: o.po
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: o.customer }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: o.received
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: o.needBy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-right font-bold",
								children: usd(o.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: o.status }) })
						]
					}, o.id)) })]
				}) })
			})
		]
	});
}
//#endregion
export { VendorDashboard as component };
