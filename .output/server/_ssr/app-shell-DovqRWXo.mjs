import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as ROLE_META, x as useAuth } from "./auth-BUW1x0A9.mjs";
import { g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as BookOpen, E as ChartColumn, O as CalendarCheck, T as ChartLine, g as Inbox, h as LayoutDashboard, k as Boxes, m as LogOut, t as Users, x as ClipboardList, y as FilePlusCorner } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DovqRWXo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = {
	inventory: [
		{
			to: "/inventory",
			label: "Dashboard",
			short: "Home",
			icon: LayoutDashboard
		},
		{
			to: "/inventory/items",
			label: "Inventory List",
			short: "Items",
			icon: Boxes
		},
		{
			to: "/inventory/orders/new",
			label: "New Purchase Order",
			short: "New PO",
			icon: FilePlusCorner
		},
		{
			to: "/inventory/tracking",
			label: "Tracking & Reports",
			short: "Track",
			icon: ChartColumn
		}
	],
	vendor: [
		{
			to: "/vendor",
			label: "Dashboard",
			short: "Home",
			icon: LayoutDashboard
		},
		{
			to: "/vendor/inbox",
			label: "Order Inbox",
			short: "Inbox",
			icon: Inbox
		},
		{
			to: "/vendor/customers",
			label: "Customer Roster",
			short: "Roster",
			icon: Users
		},
		{
			to: "/vendor/catalog",
			label: "Digital Catalog",
			short: "Catalog",
			icon: BookOpen
		},
		{
			to: "/vendor/reports",
			label: "Reporting",
			short: "Reports",
			icon: ChartLine
		}
	],
	crm: [
		{
			to: "/crm",
			label: "Dashboard",
			short: "Home",
			icon: LayoutDashboard
		},
		{
			to: "/crm/planner",
			label: "Daily Planner",
			short: "Planner",
			icon: CalendarCheck
		},
		{
			to: "/crm/customers",
			label: "Customer Tracking",
			short: "Accounts",
			icon: Users
		},
		{
			to: "/crm/orders",
			label: "Orders",
			short: "Orders",
			icon: ClipboardList
		}
	]
};
function AppShell({ role, title, subtitle, actions, children }) {
	const { user, ready, signOut } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const items = NAV[role] || [];
	(0, import_react.useEffect)(() => {
		if (ready && !user) navigate({
			to: "/",
			replace: true
		});
	}, [
		ready,
		user,
		navigate
	]);
	const isActive = (to) => to === ROLE_META[role]?.home ? pathname === to : pathname.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-sidebar-border px-5 py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs font-semibold tracking-wide text-sidebar-primary",
								children: ROLE_META[role]?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-sidebar-foreground/60",
								children: ROLE_META[role]?.tagline
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 space-y-1 overflow-y-auto p-3",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors", isActive(item.to) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-sidebar-border p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalSwitcher, { current: role }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-3 rounded-md px-2 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary font-display text-sm font-bold text-sidebar-primary-foreground",
									children: (user?.displayName ?? "L").split(" ").map((p) => p[0]).join("")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-semibold",
										children: user?.displayName ?? "Signed out"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-sidebar-foreground/60",
										children: user?.company
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									signOut();
									navigate({ to: "/" });
								},
								className: "mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Sign out"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-20 border-b border-border bg-sidebar text-sidebar-foreground lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] font-semibold text-sidebar-primary",
								children: ROLE_META[role]?.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								signOut();
								navigate({ to: "/" });
							},
							"aria-label": "Sign out",
							className: "grid size-9 shrink-0 place-items-center rounded-md bg-sidebar-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate text-2xl font-bold sm:text-3xl",
									children: title
								}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground sm:text-base",
									children: subtitle
								}) : null]
							}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "shrink-0",
								children: actions
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-6",
							children
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-semibold transition-colors", isActive(item.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.short
							})]
						})
					}, item.to))
				})
			})
		]
	});
}
function PortalSwitcher({ current }) {
	const { signIn } = useAuth();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-2 text-[10px] font-bold tracking-[0.14em] text-sidebar-foreground/50 uppercase",
		children: "Switch portal"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 grid grid-cols-3 gap-1",
		children: [
			"inventory",
			"vendor",
			"crm"
		].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => {
				signIn(r);
				navigate({ to: ROLE_META[r].home });
			},
			className: cn("rounded-md px-1 py-1.5 text-[11px] font-semibold capitalize transition-colors", r === current ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-sidebar-accent/60 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"),
			children: r
		}, r))
	})] });
}
function BrandMark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-7 place-items-center rounded-md bg-sidebar-primary font-display text-sm font-black text-sidebar-primary-foreground",
			children: "L"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display font-black tracking-tight", compact ? "text-base" : "text-lg"),
			children: "LAVAANT"
		})]
	});
}
//#endregion
export { BrandMark as n, cn as r, AppShell as t };
