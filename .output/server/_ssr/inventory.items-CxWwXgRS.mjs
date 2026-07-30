import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as usdCents, u as initialInventoryItems } from "./auth-BUW1x0A9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Search, j as BadgeCheck } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { a as Td, f as useFirestoreCollection, i as TableWrap, o as Th, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory.items-CxWwXgRS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryList() {
	const { data: inventoryItems } = useFirestoreCollection("inventoryItems", initialInventoryItems);
	const [query, setQuery] = (0, import_react.useState)("");
	const [supplier, setSupplier] = (0, import_react.useState)("All suppliers");
	const suppliers = (0, import_react.useMemo)(() => ["All suppliers", ...new Set(inventoryItems.map((i) => i.supplier))], [inventoryItems]);
	const rows = inventoryItems.filter((i) => {
		const q = query.trim().toLowerCase();
		const matchesQuery = !q || i.name && i.name.toLowerCase().includes(q) || i.sku && i.sku.toLowerCase().includes(q);
		const matchesSupplier = supplier === "All suppliers" || i.supplier === supplier;
		return matchesQuery && matchesSupplier;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "inventory",
		title: "Custom inventory list",
		subtitle: "Verified items linked to your approved suppliers",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "font-bold",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/inventory/orders/new",
				children: "Reorder"
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				bodyClassName: "p-3 sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search item or SKU",
							"aria-label": "Search inventory",
							className: "w-full rounded-md border border-input bg-card py-2.5 pr-3 pl-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: supplier,
						onChange: (e) => setSupplier(e.target.value),
						"aria-label": "Filter by supplier",
						className: "rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary",
						children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 lg:hidden",
				children: rows.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold",
									children: i.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-mono text-xs text-muted-foreground",
									children: i.sku
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: i.verified ? "Verified" : "Unverified" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid grid-cols-2 gap-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "On hand"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-bold",
									children: [
										i.onHand,
										" ",
										i.unit,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-normal text-muted-foreground",
											children: ["/ par ", i.par]
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Unit cost"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-bold",
									children: usdCents(i.unitCost)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Supplier"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "truncate font-medium",
										children: i.supplier
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "truncate font-medium",
										children: i.location
									})]
								})
							]
						}),
						Number(i.onHand) < Number(i.par) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs font-bold text-destructive",
							children: [
								"Below par — reorder ",
								Number(i.par) - Number(i.onHand),
								" ",
								i.unit
							]
						}) : null
					]
				}, i.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "hidden lg:block",
				title: `${rows.length} items`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Item" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Supplier" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "On hand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Par"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							className: "text-right",
							children: "Unit cost"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Location" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [i.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									className: "size-4 shrink-0 text-success",
									"aria-label": "Verified"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: i.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: i.sku
									})]
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: i.supplier
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, {
								className: `text-right font-bold ${Number(i.onHand) < Number(i.par) ? "text-destructive" : ""}`,
								children: [
									i.onHand,
									" ",
									i.unit
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-right text-muted-foreground",
								children: i.par
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-right font-semibold",
								children: usdCents(i.unitCost)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
								className: "text-muted-foreground",
								children: i.location
							})
						]
					}, i.id)) })]
				}) })
			})
		]
	});
}
//#endregion
export { InventoryList as component };
