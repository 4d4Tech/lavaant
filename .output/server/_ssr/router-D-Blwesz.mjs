import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as AuthProvider } from "./auth-BUW1x0A9.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DDHN4TvN.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lavaant — Construction Inventory, Purchasing & Sales Platform" },
			{
				name: "description",
				content: "Lavaant turns stagnant construction inventory into trackable digital assets: inventory, vendor, and CRM portals in one platform."
			},
			{
				name: "author",
				content: "Lavaant"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$13 = () => import("./routes-BvYEhs_s.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Lavaant — Digital Inventory & Purchase Orders for Construction" },
		{
			name: "description",
			content: "Sign in to Lavaant: inventory tracking, digital purchase orders, vendor order inbox, and a CRM built for construction sales pros."
		},
		{
			property: "og:title",
			content: "Lavaant — Construction Inventory & Purchasing Platform"
		},
		{
			property: "og:description",
			content: "Inventory is just money laying around that doesn't look like dollar bills. Lavaant turns it into trackable digital assets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./crm.index-DF0jMXxy.mjs");
var Route$12 = createFileRoute("/crm/")({
	head: () => ({ meta: [
		{ title: "Sales Dashboard | Lavaant CRM" },
		{
			name: "description",
			content: "An all-in-one CRM for construction sales pros: today's stops, quote deadlines, and account activity."
		},
		{
			property: "og:title",
			content: "Sales Dashboard | Lavaant CRM"
		},
		{
			property: "og:description",
			content: "Plan more in-person stops, never miss a quote deadline, take orders on the spot."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./crm.customers-B_fFEE3-.mjs");
var Route$11 = createFileRoute("/crm/customers")({
	head: () => ({ meta: [
		{ title: "Customer Tracking | Lavaant CRM" },
		{
			name: "description",
			content: "Visit history, next required visit, quote deadlines, and personal preferences for every construction account."
		},
		{
			property: "og:title",
			content: "Customer Tracking | Lavaant CRM"
		},
		{
			property: "og:description",
			content: "Know your customers — right down to where they like to eat."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./crm.orders-C_CY9c0w.mjs");
var Route$10 = createFileRoute("/crm/orders")({
	head: () => ({ meta: [
		{ title: "Take & Track Orders | Lavaant CRM" },
		{
			name: "description",
			content: "Take customer orders on the spot and track them alongside your visit history inside Lavaant CRM."
		},
		{
			property: "og:title",
			content: "Take & Track Orders | Lavaant CRM"
		},
		{
			property: "og:description",
			content: "Write the order at the jobsite — it lands in the vendor inbox instantly."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./crm.planner-D6YP4E9i.mjs");
var Route$9 = createFileRoute("/crm/planner")({
	head: () => ({ meta: [
		{ title: "Daily Planner | Lavaant CRM" },
		{
			name: "description",
			content: "Plan the day, organize tasks, and increase in-person stops — a route-first planner built for construction sales."
		},
		{
			property: "og:title",
			content: "Daily Planner | Lavaant CRM"
		},
		{
			property: "og:description",
			content: "Every stop, quote, and delivery for today in one running order."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./inventory.index-BRyrhwh0.mjs");
var Route$8 = createFileRoute("/inventory/")({
	head: () => ({ meta: [
		{ title: "Inventory Dashboard | Lavaant Inventory" },
		{
			name: "description",
			content: "Forecasting, budget vs. actuals, low-stock alerts, and recent purchase orders for your construction jobs."
		},
		{
			property: "og:title",
			content: "Inventory Dashboard | Lavaant Inventory"
		},
		{
			property: "og:description",
			content: "Track spend by job, watch par levels, and see every open PO in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./inventory.items-CxWwXgRS.mjs");
var Route$7 = createFileRoute("/inventory/items")({
	head: () => ({ meta: [
		{ title: "Custom Inventory List | Lavaant Inventory" },
		{
			name: "description",
			content: "A verified inventory list linked to specific suppliers, with par levels, on-hand counts, and yard locations."
		},
		{
			property: "og:title",
			content: "Custom Inventory List | Lavaant Inventory"
		},
		{
			property: "og:description",
			content: "Verified items, supplier links, par levels, and where each item actually sits."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./inventory.tracking-cASrTZiF.mjs");
var Route$6 = createFileRoute("/inventory/tracking")({
	head: () => ({ meta: [
		{ title: "Purchase Tracking & Reports | Lavaant Inventory" },
		{
			name: "description",
			content: "Detailed reporting of purchases by item, by person, and by ship-to location across every job."
		},
		{
			property: "og:title",
			content: "Purchase Tracking & Reports | Lavaant Inventory"
		},
		{
			property: "og:description",
			content: "Know exactly who ordered what, where it shipped, and what it cost."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./vendor.index-DosIanpO.mjs");
var Route$5 = createFileRoute("/vendor/")({
	head: () => ({ meta: [
		{ title: "Vendor Dashboard | Lavaant Vendor" },
		{
			name: "description",
			content: "Real-time digital orders from verified construction customers, sales trends, and account activity for suppliers."
		},
		{
			property: "og:title",
			content: "Vendor Dashboard | Lavaant Vendor"
		},
		{
			property: "og:description",
			content: "See incoming POs the second they're submitted — no faxes, no phone tag."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./vendor.catalog-Csb_CCAm.mjs");
var Route$4 = createFileRoute("/vendor/catalog")({
	head: () => ({ meta: [
		{ title: "Digital Catalog | Lavaant Vendor" },
		{
			name: "description",
			content: "Publish products with pricing, spec sheets, and MSDS documents your construction customers can order from directly."
		},
		{
			property: "og:title",
			content: "Digital Catalog | Lavaant Vendor"
		},
		{
			property: "og:description",
			content: "Products, spec sheets, and MSDS access in one shared catalog."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./vendor.customers-Cqnxo61V.mjs");
var Route$3 = createFileRoute("/vendor/customers")({
	head: () => ({ meta: [
		{ title: "Customer Roster | Lavaant Vendor" },
		{
			name: "description",
			content: "Manage linked, verified construction customers — terms, open orders, and year-to-date revenue."
		},
		{
			property: "og:title",
			content: "Customer Roster | Lavaant Vendor"
		},
		{
			property: "og:description",
			content: "Every linked account, verified and ready to order."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./vendor.inbox-WtFQOy3d.mjs");
var Route$2 = createFileRoute("/vendor/inbox")({
	head: () => ({ meta: [
		{ title: "Order Inbox | Lavaant Vendor" },
		{
			name: "description",
			content: "A unified, real-time inbox for digital purchase orders arriving from your construction customers."
		},
		{
			property: "og:title",
			content: "Order Inbox | Lavaant Vendor"
		},
		{
			property: "og:description",
			content: "Acknowledge, pick, and ship — every order in one live queue."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./vendor.reports-CdoAvDBS.mjs");
var Route$1 = createFileRoute("/vendor/reports")({
	head: () => ({ meta: [
		{ title: "Customer Reporting | Lavaant Vendor" },
		{
			name: "description",
			content: "Customer-based reporting for suppliers: sales trends, order frequency, and account growth."
		},
		{
			property: "og:title",
			content: "Customer Reporting | Lavaant Vendor"
		},
		{
			property: "og:description",
			content: "Track sales trends by account and spot slipping customers early."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./inventory.orders.new-eiBwf7h2.mjs");
var Route = createFileRoute("/inventory/orders/new")({
	head: () => ({ meta: [
		{ title: "Create a Digital Purchase Order | Lavaant Inventory" },
		{
			name: "description",
			content: "Generate a digital purchase order and send it straight to your vendor — no carbon copies, no lost paperwork."
		},
		{
			property: "og:title",
			content: "Create a Digital Purchase Order | Lavaant Inventory"
		},
		{
			property: "og:description",
			content: "Pick items from your verified list, set ship-to and need-by, and submit."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var CrmIndexRoute = Route$12.update({
	id: "/crm/",
	path: "/crm/",
	getParentRoute: () => Route$14
});
var CrmCustomersRoute = Route$11.update({
	id: "/crm/customers",
	path: "/crm/customers",
	getParentRoute: () => Route$14
});
var CrmOrdersRoute = Route$10.update({
	id: "/crm/orders",
	path: "/crm/orders",
	getParentRoute: () => Route$14
});
var CrmPlannerRoute = Route$9.update({
	id: "/crm/planner",
	path: "/crm/planner",
	getParentRoute: () => Route$14
});
var InventoryIndexRoute = Route$8.update({
	id: "/inventory/",
	path: "/inventory/",
	getParentRoute: () => Route$14
});
var InventoryItemsRoute = Route$7.update({
	id: "/inventory/items",
	path: "/inventory/items",
	getParentRoute: () => Route$14
});
var InventoryTrackingRoute = Route$6.update({
	id: "/inventory/tracking",
	path: "/inventory/tracking",
	getParentRoute: () => Route$14
});
var VendorIndexRoute = Route$5.update({
	id: "/vendor/",
	path: "/vendor/",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute,
	CrmCustomersRoute,
	CrmOrdersRoute,
	CrmPlannerRoute,
	InventoryItemsRoute,
	InventoryTrackingRoute,
	VendorCatalogRoute: Route$4.update({
		id: "/vendor/catalog",
		path: "/vendor/catalog",
		getParentRoute: () => Route$14
	}),
	VendorCustomersRoute: Route$3.update({
		id: "/vendor/customers",
		path: "/vendor/customers",
		getParentRoute: () => Route$14
	}),
	VendorInboxRoute: Route$2.update({
		id: "/vendor/inbox",
		path: "/vendor/inbox",
		getParentRoute: () => Route$14
	}),
	VendorReportsRoute: Route$1.update({
		id: "/vendor/reports",
		path: "/vendor/reports",
		getParentRoute: () => Route$14
	}),
	CrmIndexRoute,
	InventoryIndexRoute,
	VendorIndexRoute,
	InventoryOrdersNewRoute: Route.update({
		id: "/inventory/orders/new",
		path: "/inventory/orders/new",
		getParentRoute: () => Route$14
	})
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
