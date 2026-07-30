import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as usdCents, c as initialCatalog, l as initialCrmCustomers, m as initialVendorInbox, y as usd } from "./auth-BUW1x0A9.mjs";
import { s as Send } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { a as Td, c as createPurchaseOrder, f as useFirestoreCollection, i as TableWrap, n as StatCard, o as Th, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm.orders-C_CY9c0w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CrmOrders() {
	const { data: catalog } = useFirestoreCollection("catalog", initialCatalog);
	const { data: crmCustomers } = useFirestoreCollection("crmCustomers", initialCrmCustomers);
	const { data: vendorInbox } = useFirestoreCollection("vendorInbox", initialVendorInbox);
	const [customer, setCustomer] = (0, import_react.useState)(crmCustomers[0]?.name || "Ridgeline Builders");
	const [sku, setSku] = (0, import_react.useState)(catalog[0]?.id || "cp_01");
	const [qty, setQty] = (0, import_react.useState)(10);
	const [sending, setSending] = (0, import_react.useState)(false);
	const product = catalog.find((c) => c.id === sku) || catalog[0] || {
		price: 0,
		name: "Product",
		unit: "ea"
	};
	const submit = async (e) => {
		e.preventDefault();
		setSending(true);
		const orderTotal = product.price * qty;
		const res = await createPurchaseOrder({
			customer,
			requestedBy: "Tyler Boone (CRM)",
			shipTo: "Field Order",
			job: "Direct Sale",
			vendor: "Gulf Coast Industrial Supply",
			total: orderTotal,
			lines: 1,
			needBy: "ASAP"
		});
		setSending(false);
		toast.success(`${res.po || res.id} written for ${customer}`, { description: `${qty} × ${product.name} — ${usdCents(orderTotal)}` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "crm",
		title: "Orders",
		subtitle: "Take an order in the field, track it to delivery",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Orders written today",
					value: "4",
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Value written today",
					value: usd(18240)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Open orders",
					value: String(vendorInbox.filter((o) => o.status !== "Received").length),
					hint: "Across your accounts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Month to date",
					value: usd(214600),
					delta: "+9.3% vs. last month"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1fr_1.4fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Quick order",
				description: "Write it before you leave the gate",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-eyebrow",
								children: "Customer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: customer,
								onChange: (e) => setCustomer(e.target.value),
								className: "field mt-1.5",
								children: crmCustomers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c.name }, c.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-eyebrow",
								children: "Product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: sku,
								onChange: (e) => setSku(e.target.value),
								className: "field mt-1.5",
								children: catalog.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "label-eyebrow",
								children: [
									"Quantity (",
									product.unit,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								value: qty,
								onChange: (e) => setQty(Math.max(1, Number(e.target.value))),
								className: "field mt-1.5"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between rounded-lg bg-muted/60 px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-eyebrow",
								children: "Order total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-black",
								children: usdCents(product.price * qty)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full font-bold",
							disabled: sending,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 size-4" }),
								" ",
								sending ? "Sending…" : "Send order"
							]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent orders",
				description: "Written by you or your accounts",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "PO" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Customer" }),
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
			})]
		})]
	});
}
//#endregion
export { CrmOrders as component };
