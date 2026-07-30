import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as usdCents, c as initialCatalog } from "./auth-BUW1x0A9.mjs";
import { o as ShieldAlert, v as FileText } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DovqRWXo.mjs";
import { t as Button } from "./button-CRwLaW16.mjs";
import { f as useFirestoreCollection, l as getStorageAssetUrl, r as StatusPill, t as Panel } from "./firebase-service-7UuAQbgx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendor.catalog-Csb_CCAm.js
var import_jsx_runtime = require_jsx_runtime();
function Catalog() {
	const { data: catalog } = useFirestoreCollection("catalog", initialCatalog);
	const openDoc = async (label, path) => {
		toast.loading(`Fetching ${label} from Firebase Storage...`, { id: "storage" });
		const url = await getStorageAssetUrl(path);
		toast.success(`Firebase Storage ${label} resolved`, {
			id: "storage",
			description: url
		});
		if (typeof window !== "undefined") window.open(url, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "vendor",
		title: "Digital catalog",
		subtitle: "What your customers see when they build a PO",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "font-bold",
			children: "Add product"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: catalog.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "surface flex flex-col p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "label-eyebrow truncate",
									children: p.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-sm font-bold",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-mono text-xs text-muted-foreground",
									children: p.sku
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: p.stock })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-display text-2xl font-black",
						children: [usdCents(p.price), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-1 text-sm font-semibold text-muted-foreground",
							children: ["/ ", p.unit]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => openDoc("Spec sheet", p.specSheet),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1 size-4" }), " Spec sheet"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => openDoc("MSDS", p.msds),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mr-1 size-4" }), " MSDS"]
						})]
					})
				]
			}, p.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Catalog health",
			description: "Keep documents current for verified buyers",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					["Products published", String(catalog.length)],
					["Spec sheets on file", String(catalog.length)],
					["MSDS coverage", "100%"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg bg-muted/60 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-eyebrow",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-xl font-black",
						children: v
					})]
				}, k))
			})
		})]
	});
}
//#endregion
export { Catalog as component };
