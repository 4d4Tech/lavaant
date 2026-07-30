import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as DEMO_USERS, r as ROLE_META, x as useAuth } from "./auth-BUW1x0A9.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as ArrowRight, T as ChartLine, a as ShieldCheck, k as Boxes, n as Truck } from "../_libs/lucide-react.mjs";
import { n as BrandMark } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BvYEhs_s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLE_CARDS = [
	{
		role: "inventory",
		icon: Boxes,
		blurb: "Track purchases, par levels, and budget vs. actuals across every job."
	},
	{
		role: "vendor",
		icon: Truck,
		blurb: "Receive digital POs in real time from verified construction customers."
	},
	{
		role: "crm",
		icon: ChartLine,
		blurb: "Plan the day, log every stop, and take orders without leaving the truck."
	}
];
function SignIn() {
	const { signIn, user, ready } = useAuth();
	const navigate = useNavigate();
	const [selected, setSelected] = (0, import_react.useState)("inventory");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ready && user) navigate({
			to: ROLE_META[user.role]?.home || "/",
			replace: true
		});
	}, [
		ready,
		user,
		navigate
	]);
	const handleSubmit = (e) => {
		e.preventDefault();
		setPending(true);
		signIn(selected);
		navigate({ to: ROLE_META[selected].home });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-[1.05fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "gradient-brand relative flex flex-col justify-between px-6 py-10 text-sidebar-foreground sm:px-10 lg:px-14 lg:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 max-w-xl lg:mt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-eyebrow text-sidebar-primary",
							children: "Built for the field"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 text-3xl leading-[1.08] font-black sm:text-4xl lg:text-5xl",
							children: [
								"Inventory is just",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sidebar-primary",
									children: "MONEY laying around"
								}),
								" that doesn't look like dollar bills."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm leading-relaxed text-sidebar-foreground/75 sm:text-base",
							children: "Retire the carbon-copy PO book. Lavaant links construction companies, their suppliers, and the sales pros between them on one centralized record — from the stock room to the lay-down yard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 grid gap-3 sm:grid-cols-2",
							children: [
								"Digital purchase orders",
								"Verified supplier catalogs",
								"Budget vs. actual forecasting",
								"Ship-to & by-person reporting"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 text-sidebar-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0",
									children: f
								})]
							}, f))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-xs text-sidebar-foreground/50",
					children: "Connected to Firebase Auth, Firestore, Storage & Functions."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold sm:text-3xl",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Choose your portal — you'll be routed by role."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: ROLE_CARDS.map(({ role, icon: Icon, blurb }) => {
							const active = selected === role;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected(role),
								"aria-pressed": active,
								className: `grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border p-4 text-left transition-all ${active ? "border-primary bg-primary/[0.04] shadow-panel" : "border-border hover:border-primary/40 hover:bg-muted/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-10 shrink-0 place-items-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-display text-sm font-bold",
										children: ROLE_META[role].name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: blurb
									})]
								})]
							}, role);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "email",
							className: "label-eyebrow",
							children: "Work email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							type: "email",
							readOnly: true,
							value: DEMO_USERS[selected]?.email || "",
							className: "mt-1.5 w-full rounded-md border border-input bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "password",
							className: "label-eyebrow",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "password",
							type: "password",
							defaultValue: "demo-password",
							className: "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						size: "lg",
						className: "mt-6 w-full font-bold",
						disabled: pending,
						children: [
							"Enter ",
							ROLE_META[selected].name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 size-4" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-xs text-muted-foreground",
						children: "Firebase Auth session initialized. Any password logs in demo role."
					})
				]
			})
		})]
	});
}
//#endregion
export { SignIn as component };
