import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as initialVendorInbox, y as usd } from "./auth-BUW1x0A9.mjs";
import { b as Clock, d as Package, n as Truck, w as Check } from "../_libs/lucide-react.mjs";
import { r as cn, t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { d as updateOrderStatus, f as useFirestoreCollection, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendor.inbox-WtFQOy3d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"All",
	"Submitted",
	"Acknowledged",
	"Shipped",
	"Received"
];
function VendorInbox() {
	const { data: vendorInbox } = useFirestoreCollection("vendorInbox", initialVendorInbox);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [selectedId, setSelectedId] = (0, import_react.useState)(vendorInbox[0]?.id || "vo_01");
	const rows = vendorInbox.filter((o) => filter === "All" || o.status === filter);
	const selected = vendorInbox.find((o) => o.id === selectedId) || vendorInbox[0] || {};
	const advance = async (id, currentStatus) => {
		const flow = [
			"Submitted",
			"Acknowledged",
			"Shipped",
			"Received"
		];
		const next = flow[Math.min(flow.indexOf(currentStatus) + 1, flow.length - 1)];
		await updateOrderStatus(id, next);
		const targetOrder = vendorInbox.find((o) => o.id === id);
		toast.success(`${targetOrder?.po || id} marked ${next}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "vendor",
		title: "Order inbox",
		subtitle: "Digital POs arriving live from Lavaant Inventory customers",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-max gap-1 px-1",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(f),
					"aria-pressed": filter === f,
					className: cn("rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors", filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"),
					children: f
				}, f))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [rows.map((o) => {
					const status = o.status;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						onClick: () => setSelectedId(o.id),
						className: cn("surface cursor-pointer p-4 transition-colors sm:p-5", selectedId === o.id && "border-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "truncate font-display text-base font-bold",
											children: o.po
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 truncate text-sm font-medium",
										children: o.customer
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											o.contact,
											" · ",
											o.lines,
											" lines · need by ",
											o.needBy
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-black",
									children: usd(o.total)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center justify-end gap-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
										" ",
										o.received
									]
								})]
							})]
						}), status !== "Received" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "font-bold",
								onClick: (e) => {
									e.stopPropagation();
									advance(o.id, status);
								},
								children: status === "Submitted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 size-4" }), " Acknowledge"] }) : status === "Acknowledged" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mr-1 size-4" }), " Mark picked & shipped"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "mr-1 size-4" }), " Confirm delivered"] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: (e) => e.stopPropagation(),
								children: "Message buyer"
							})]
						}) : null]
					}, o.id);
				}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Nothing in this queue right now."
				}) }) : null]
			}), selected?.po ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: `${selected.po} detail`,
				description: selected.customer,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid grid-cols-2 gap-3 text-sm",
					children: [
						["Contact", selected.contact],
						["Lines", String(selected.lines)],
						["Need by", selected.needBy],
						["Received", selected.received],
						["Status", selected.status],
						["Total", usd(selected.total)]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 rounded-lg bg-muted/60 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "label-eyebrow",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "truncate font-semibold",
							children: v
						})]
					}, k))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-lg border border-border p-3 text-xs text-muted-foreground",
					children: "Buyer note: “Gate code 4471. Call 30 minutes before delivery — crane is on the deck until noon.”"
				})]
			}) : null]
		})]
	});
}
//#endregion
export { VendorInbox as component };
