import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as usdCents, u as initialInventoryItems } from "./auth-BUW1x0A9.mjs";
import { C as CircleCheck, f as Minus, i as Trash2, l as Plus, s as Send } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { a as Td, c as createPurchaseOrder, f as useFirestoreCollection, i as TableWrap, o as Th, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory.orders.new-eiBwf7h2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var JOBS = [
	"Northgate Medical Tower",
	"Harborview Phase 2",
	"Eastline Warehouse",
	"Service & Small Works"
];
var SHIP_TO = [
	"Northgate Medical — Gate 4",
	"Harborview — Dock 1",
	"Yard B — Lay-Down",
	"Stock Room A",
	"Trailer 2 — Northgate"
];
function NewPurchaseOrder() {
	const { data: inventoryItems } = useFirestoreCollection("inventoryItems", initialInventoryItems);
	const [vendor, setVendor] = (0, import_react.useState)(inventoryItems[0]?.supplier || "Gulf Coast Industrial Supply");
	const [job, setJob] = (0, import_react.useState)(JOBS[0]);
	const [shipTo, setShipTo] = (0, import_react.useState)(SHIP_TO[0]);
	const [needBy, setNeedBy] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([{
		id: "itm_01",
		qty: 20
	}]);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submittedPo, setSubmittedPo] = (0, import_react.useState)(null);
	const vendors = [...new Set(inventoryItems.map((i) => i.supplier))];
	const catalogForVendor = inventoryItems.filter((i) => i.supplier === vendor);
	const item = (id) => inventoryItems.find((i) => i.id === id) || {
		unitCost: 0,
		name: "Item",
		sku: ""
	};
	const subtotal = lines.reduce((s, l) => s + (item(l.id).unitCost || 0) * l.qty, 0);
	const tax = subtotal * .0825;
	const total = subtotal + tax;
	const addLine = (id) => {
		setLines((prev) => prev.some((l) => l.id === id) ? prev.map((l) => l.id === id ? {
			...l,
			qty: l.qty + 1
		} : l) : [...prev, {
			id,
			qty: 1
		}]);
	};
	const setQty = (id, qty) => setLines((prev) => prev.map((l) => l.id === id ? {
		...l,
		qty: Math.max(1, qty)
	} : l));
	const removeLine = (id) => setLines((prev) => prev.filter((l) => l.id !== id));
	const submit = async () => {
		if (!lines.length) {
			toast.error("Add at least one line item.");
			return;
		}
		setSubmitting(true);
		const res = await createPurchaseOrder({
			vendor,
			job,
			shipTo,
			needBy,
			notes,
			total,
			lines: lines.length,
			requestedBy: "Marcus Hale",
			customer: "Ridgeline Builders"
		});
		setSubmitting(false);
		setSubmittedPo(res.po || res.id);
		toast.success(`${res.po || res.id} sent to ${vendor}`);
	};
	if (submittedPo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		role: "inventory",
		title: "Purchase order sent",
		subtitle: `${submittedPo} · ${vendor}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center py-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-12 text-success" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-4 text-xl font-bold",
					children: [submittedPo, " is on its way"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-md text-sm text-muted-foreground",
					children: [vendor, " received it in their Lavaant Vendor inbox instantly. You'll see an acknowledgement the moment they open it — no phone tag, no carbon copies."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-6 grid w-full max-w-md gap-3 text-left sm:grid-cols-2",
					children: [
						["Job", job],
						["Ship to", shipTo],
						["Need by", needBy || "ASAP"],
						["Total", usdCents(total)]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/60 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "label-eyebrow",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "truncate text-sm font-semibold",
							children: v
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 font-bold",
					onClick: () => {
						setSubmittedPo(null);
						setLines([]);
						setNotes("");
					},
					children: "Start another PO"
				})
			]
		}) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		role: "inventory",
		title: "New purchase order",
		subtitle: "Digital PO — goes straight to your vendor's inbox",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: submit,
			disabled: submitting,
			className: "font-bold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 size-4" }), submitting ? "Sending…" : "Submit PO"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1.6fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Order details",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Vendor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: vendor,
									onChange: (e) => {
										setVendor(e.target.value);
										setLines([]);
									},
									className: "field",
									children: vendors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Job / cost code",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: job,
									onChange: (e) => setJob(e.target.value),
									className: "field",
									children: JOBS.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: j }, j))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Ship to",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: shipTo,
									onChange: (e) => setShipTo(e.target.value),
									className: "field",
									children: SHIP_TO.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Need by",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: needBy,
									onChange: (e) => setNeedBy(e.target.value),
									className: "field"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Notes for the vendor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: notes,
										onChange: (e) => setNotes(e.target.value),
										placeholder: "Gate code 4471. Call Marcus 30 min before delivery.",
										className: "field resize-y"
									})
								})
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Line items",
					description: `${lines.length} on this PO`,
					children: lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "No items yet — add from the catalog."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 lg:hidden",
						children: lines.map((l) => {
							const it = item(l.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[minmax(0,1fr)_auto] gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold",
											children: it.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs text-muted-foreground",
											children: it.sku
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeLine(l.id),
										"aria-label": `Remove ${it.name}`,
										className: "shrink-0 text-muted-foreground hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
										qty: l.qty,
										onChange: (q) => setQty(l.id, q)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold",
										children: usdCents(it.unitCost * l.qty)
									})]
								})]
							}, l.id);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full border-collapse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "Item" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
									className: "text-right",
									children: "Unit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
									className: "text-center",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
									className: "text-right",
									children: "Ext."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, { children: "" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((l) => {
								const it = item(l.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Td, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: it.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: it.sku
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
										className: "text-right",
										children: usdCents(it.unitCost)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
											qty: l.qty,
											onChange: (q) => setQty(l.id, q)
										})
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
										className: "text-right font-bold",
										children: usdCents(it.unitCost * l.qty)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Td, {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeLine(l.id),
											"aria-label": `Remove ${it.name}`,
											className: "text-muted-foreground hover:text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									})
								] }, l.id);
							}) })]
						}) })
					})] })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Vendor catalog",
					description: vendor,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: catalogForVendor.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold",
									children: it.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										usdCents(it.unitCost),
										" / ",
										it.unit
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => addLine(it.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})]
						}, it.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Totals",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Subtotal",
								v: usdCents(subtotal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Tax (8.25%)",
								v: usdCents(tax)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "font-display font-bold",
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-display text-xl font-black",
										children: usdCents(total)
									})]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: submit,
						disabled: submitting,
						size: "lg",
						className: "mt-4 w-full font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 size-4" }), submitting ? "Sending…" : "Submit purchase order"]
					})]
				})]
			})]
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-semibold",
			children: v
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "label-eyebrow",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1.5 block",
			children
		})]
	});
}
function QtyStepper({ qty, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onChange(qty - 1),
				"aria-label": "Decrease quantity",
				className: "grid size-8 place-items-center rounded-md border border-input hover:bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "number",
				value: qty,
				onChange: (e) => onChange(Number(e.target.value)),
				"aria-label": "Quantity",
				className: "w-14 rounded-md border border-input bg-card py-1.5 text-center text-sm font-bold outline-none focus:border-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onChange(qty + 1),
				"aria-label": "Increase quantity",
				className: "grid size-8 place-items-center rounded-md border border-input hover:bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
			})
		]
	});
}
//#endregion
export { NewPurchaseOrder as component };
