import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as initialPlannerStops } from "./auth-BUW1x0A9.mjs";
import { C as CircleCheck, S as Circle, b as Clock, l as Plus, p as MapPin } from "../_libs/lucide-react.mjs";
import { r as cn, t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { f as useFirestoreCollection, n as StatCard, r as StatusPill, s as addPlannerStop, t as Panel, u as togglePlannerStopDone } from "./firebase-service-7UuAQbgx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm.planner-D6YP4E9i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPE_TONE = {
	Stop: "bg-primary/10 text-primary",
	Quote: "bg-destructive/12 text-destructive",
	Delivery: "bg-accent/20 text-accent-foreground",
	Call: "bg-muted text-muted-foreground"
};
function DailyPlanner() {
	const { data: stops } = useFirestoreCollection("plannerStops", initialPlannerStops);
	const [draft, setDraft] = (0, import_react.useState)({
		time: "",
		customer: "",
		purpose: ""
	});
	const toggle = async (id, currentDone) => {
		await togglePlannerStopDone(id, currentDone);
	};
	const handleAddStop = async (e) => {
		e.preventDefault();
		if (!draft.customer.trim()) {
			toast.error("Who are you stopping to see?");
			return;
		}
		await addPlannerStop({
			time: draft.time || "TBD",
			customer: draft.customer,
			contact: "—",
			address: "Add address",
			purpose: draft.purpose || "Cold stop",
			type: "Stop"
		});
		setDraft({
			time: "",
			customer: "",
			purpose: ""
		});
		toast.success("Stop added to today's plan");
	};
	const done = stops.filter((s) => s.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "crm",
		title: "Daily planner",
		subtitle: "Today — built for windshield time",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Planned stops",
					value: String(stops.length)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Completed",
					value: String(done),
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Remaining",
					value: String(stops.length - done),
					tone: "accent",
					hint: "Keep the truck moving"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Goal",
					value: "6 stops/day",
					hint: `${Math.max(0, 6 - stops.length)} to hit goal`
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Today's run",
				description: `${done} of ${stops.length} complete`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: stops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: cn("rounded-lg border p-3.5 transition-colors sm:p-4", s.done ? "border-border bg-muted/40" : "border-border bg-card"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggle(s.id, s.done),
									"aria-label": s.done ? `Reopen ${s.customer}` : `Complete ${s.customer}`,
									className: "mt-0.5 shrink-0",
									children: s.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-5 text-muted-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: cn("truncate text-sm font-bold", s.done && "text-muted-foreground line-through"),
												children: s.customer
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full px-2 py-0.5 text-[11px] font-bold", TYPE_TONE[s.type] || TYPE_TONE.Stop),
												children: s.type
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 truncate text-xs text-muted-foreground",
											children: s.contact
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: s.address
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm",
											children: s.purpose
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex shrink-0 items-center gap-1 text-xs font-bold whitespace-nowrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
										" ",
										s.time
									]
								})
							]
						})
					}, s.id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Add a stop",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddStop,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-eyebrow",
									children: "Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: draft.time,
									onChange: (e) => setDraft({
										...draft,
										time: e.target.value
									}),
									className: "field mt-1.5"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-eyebrow",
									children: "Customer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.customer,
									onChange: (e) => setDraft({
										...draft,
										customer: e.target.value
									}),
									placeholder: "Eastline Framing",
									className: "field mt-1.5"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-eyebrow",
									children: "Purpose"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									value: draft.purpose,
									onChange: (e) => setDraft({
										...draft,
										purpose: e.target.value
									}),
									placeholder: "Drop catalog, walk the yard",
									className: "field mt-1.5 resize-y"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "w-full font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 size-4" }), " Add to plan"]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Reminders",
					description: "Pulled from your accounts",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: "Hot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [
										"Copperhead quote due ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "today at 5:00 PM" }),
										"."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: "Warm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0",
									children: "Sam Ottley still on paper POs — bring the onboarding one-pager."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: "Cold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0",
									children: "Eastline Framing hasn't ordered in 61 days."
								})]
							})
						]
					})
				})]
			})]
		})]
	});
}
//#endregion
export { DailyPlanner as component };
