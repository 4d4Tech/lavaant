import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as spendByPerson, b as usdCents, d as initialOrders, g as spendByJob, h as shipToBreakdown, u as initialInventoryItems, y as usd } from "./auth-BUW1x0A9.mjs";
import { r as cn, t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { a as Td, f as useFirestoreCollection, i as TableWrap, n as StatCard, o as Th, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory.tracking-cASrTZiF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"By item",
	"By person",
	"By ship-to",
	"All orders"
];
function Tracking() {
	const { data: inventoryItems } = useFirestoreCollection("inventoryItems", initialInventoryItems);
	const { data: orders } = useFirestoreCollection("orders", initialOrders);
	const [tab, setTab] = (0, import_react.useState)("By item");
	const totalSpend = spendByJob.reduce((s, j) => s + j.spend, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "inventory",
		title: "Tracking & reporting",
		subtitle: "Every dollar, traced to an item, a person, and a gate",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "YTD material spend",
						value: usd(totalSpend),
						hint: "Across 4 jobs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Purchase orders",
						value: String(orders.length || 125),
						hint: "Year to date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Avg. PO value",
						value: usd(totalSpend / (orders.length || 125))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Ship-to locations",
						value: String(shipToBreakdown.length),
						tone: "accent"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					className: "flex min-w-max gap-1 px-1",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": tab === t,
						onClick: () => setTab(t),
						className: cn("rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors", tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
						children: t
					}, t))
				})
			}),
			tab === "By item" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Purchases by item",
				description: "Rolling 90 days",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Item" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Supplier" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Qty purchased"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Unit cost"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Extended"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: inventoryItems.map((i, idx) => {
						const qty = 40 + idx * 27;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: i.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-muted-foreground",
									children: i.sku
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "text-muted-foreground",
									children: i.supplier
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
									className: "text-right font-semibold",
									children: [
										qty,
										" ",
										i.unit
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "text-right",
									children: usdCents(i.unitCost)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
									className: "text-right font-bold",
									children: usd(qty * i.unitCost)
								})
							]
						}, i.id);
					}) })]
				}) })
			}) : null,
			tab === "By person" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Purchases by person",
				description: "Who is spending what",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: spendByPerson.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-bold",
								children: p.person
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									p.role,
									" · ",
									p.orders,
									" orders"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-display text-lg font-black",
							children: usd(p.spend)
						})]
					}, p.person))
				})
			}) : null,
			tab === "By ship-to" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Purchases by ship-to location",
				description: "Where material actually landed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: shipToBreakdown.map((s) => {
						const pct = s.spend / shipToBreakdown[0].spend * 100;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 truncate text-sm font-semibold",
								children: s.location
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-xs font-bold",
								children: [
									usd(s.spend),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-normal text-muted-foreground",
										children: [
											"· ",
											s.orders,
											" orders"
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent",
								style: { width: `${pct}%` }
							})
						})] }, s.location);
					})
				})
			}) : null,
			tab === "All orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "All purchase orders",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "PO" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Requested by" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Ship to" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Placed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "font-semibold",
								children: o.po
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: o.requestedBy || o.contact }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: o.shipTo || "Yard B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: o.placedAt || o.received
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-right font-bold",
								children: usd(o.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: o.status }) })
						]
					}, o.id)) })]
				}) })
			}) : null
		]
	});
}
//#endregion
export { Tracking as component };
