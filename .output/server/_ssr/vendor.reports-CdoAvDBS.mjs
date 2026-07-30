import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as vendorSalesTrend, p as initialVendorCustomers, y as usd } from "./auth-BUW1x0A9.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { a as Td, f as useFirestoreCollection, i as TableWrap, n as StatCard, o as Th, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
import { a as XAxis, d as ResponsiveContainer, i as YAxis, l as CartesianGrid, n as BarChart, o as Bar, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendor.reports-CdoAvDBS.js
var import_jsx_runtime = require_jsx_runtime();
function VendorReports() {
	const { data: vendorCustomers } = useFirestoreCollection("vendorCustomers", initialVendorCustomers);
	const ytd = vendorCustomers.reduce((s, c) => s + Number(c.ytd || 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "vendor",
		title: "Reporting",
		subtitle: "Customer-based sales trends through Lavaant",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "YTD revenue",
						value: usd(ytd),
						delta: "+18.4% YoY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Orders received",
						value: "312",
						hint: "Year to date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Avg. order value",
						value: usd(ytd / 312)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Fill rate",
						value: "96.2%",
						tone: "success",
						hint: "Lines shipped complete"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Monthly revenue",
				description: "All accounts",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: vendorSalesTrend,
							children: [
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "sales",
									fill: "var(--color-chart-1)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Revenue by customer",
				description: "Year to date",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Customer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Contact" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Terms" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Open orders"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "YTD revenue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Share"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: vendorCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "font-semibold",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: c.contact
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: c.terms
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-right",
								children: c.openOrders
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-right font-bold",
								children: usd(c.ytd)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
								className: "text-right",
								children: [ytd ? (c.ytd / ytd * 100).toFixed(1) : 0, "%"]
							})
						]
					}, c.id)) })]
				}) })
			})
		]
	});
}
//#endregion
export { VendorReports as component };
