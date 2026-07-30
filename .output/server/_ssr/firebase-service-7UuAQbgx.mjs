import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import "../_libs/firebase.mjs";
import { a as updateDoc, i as setDoc, n as getDocs, o as collection, r as onSnapshot, s as doc } from "../_libs/@firebase/firestore+[...].mjs";
import { r as ref, t as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { n as httpsCallable } from "../_libs/firebase__functions.mjs";
import { a as db, c as initialCatalog, d as initialOrders, f as initialPlannerStops, l as initialCrmCustomers, m as initialVendorInbox, p as initialVendorCustomers, s as functions, u as initialInventoryItems, v as storage } from "./auth-BUW1x0A9.mjs";
import { r as cn } from "./app-shell-DovqRWXo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-service-7UuAQbgx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Panel({ title, description, actions, children, className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("surface overflow-hidden", className),
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3.5 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "truncate text-sm font-bold sm:text-base",
					children: title
				}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: description
				}) : null]
			}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: actions
			}) : null]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("p-4 sm:p-5", bodyClassName),
			children
		})]
	});
}
function StatCard({ label, value, delta, hint, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-eyebrow truncate",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl", tone === "accent" && "text-accent", tone === "success" && "text-success", tone === "destructive" && "text-destructive"),
				children: value
			}),
			delta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-semibold text-success",
				children: delta
			}) : null,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
var STATUS_TONE = {
	Draft: "bg-muted text-muted-foreground",
	Submitted: "bg-accent/20 text-accent-foreground",
	Acknowledged: "bg-primary/10 text-primary",
	Shipped: "bg-primary/15 text-primary",
	Received: "bg-success/15 text-success",
	Verified: "bg-success/15 text-success",
	Unverified: "bg-muted text-muted-foreground",
	Low: "bg-destructive/12 text-destructive",
	"In stock": "bg-success/15 text-success",
	Backordered: "bg-destructive/12 text-destructive",
	Hot: "bg-destructive/12 text-destructive",
	Warm: "bg-accent/20 text-accent-foreground",
	Cold: "bg-muted text-muted-foreground"
};
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap", STATUS_TONE[status] ?? "bg-muted text-muted-foreground"),
		children: status
	});
}
/** Scrollable table wrapper: horizontal scroll on mobile, never clipped text. */
function TableWrap({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 overflow-x-auto sm:-mx-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-[640px] px-4 sm:px-5",
			children
		})
	});
}
function Th({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		className: cn("border-b border-border px-3 py-2 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase", className),
		children
	});
}
function Td({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: cn("border-b border-border/70 px-3 py-3 text-sm align-middle", className),
		children
	});
}
var isSeeding = false;
async function seedFirestoreIfEmpty() {
	if (isSeeding) return;
	isSeeding = true;
	try {
		const collectionsToSeed = [
			{
				name: "inventoryItems",
				data: initialInventoryItems
			},
			{
				name: "orders",
				data: initialOrders
			},
			{
				name: "vendorInbox",
				data: initialVendorInbox
			},
			{
				name: "vendorCustomers",
				data: initialVendorCustomers
			},
			{
				name: "catalog",
				data: initialCatalog
			},
			{
				name: "plannerStops",
				data: initialPlannerStops
			},
			{
				name: "crmCustomers",
				data: initialCrmCustomers
			}
		];
		for (const item of collectionsToSeed) {
			const colRef = collection(db, item.name);
			const snapshot = await getDocs(colRef).catch(() => null);
			if (snapshot && snapshot.empty) {
				console.log(`Seeding Firestore collection: ${item.name}`);
				for (const docData of item.data) {
					const docRef = doc(colRef, docData.id);
					await setDoc(docRef, docData, { merge: true }).catch((err) => console.warn(`Error seeding doc ${docData.id}:`, err));
				}
			}
		}
	} catch (err) {
		console.warn("Firestore auto-seeding fallback activated:", err);
	} finally {
		isSeeding = false;
	}
}
seedFirestoreIfEmpty();
/**
* Custom React Hook that listens to a Firestore collection in real time.
* Fallbacks seamlessly to fallbackData if Firestore is offline or empty.
*/
function useFirestoreCollection(collectionName, fallbackData = []) {
	const [data, setData] = (0, import_react.useState)(fallbackData);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let unsubscribe = () => {};
		try {
			const colRef = collection(db, collectionName);
			unsubscribe = onSnapshot(colRef, (snapshot) => {
				if (!snapshot.empty) {
					const docs = snapshot.docs.map((d) => ({
						id: d.id,
						...d.data()
					}));
					setData(docs);
				} else {
					seedFirestoreIfEmpty();
					setData(fallbackData);
				}
				setLoading(false);
			}, (err) => {
				console.warn(`Firestore subscription fallback for ${collectionName}:`, err);
				setError(err);
				setData(fallbackData);
				setLoading(false);
			});
		} catch (err) {
			console.warn(`Firestore setup error for ${collectionName}:`, err);
			setError(err);
			setData(fallbackData);
			setLoading(false);
		}
		return () => unsubscribe();
	}, [collectionName]);
	return {
		data,
		loading,
		error
	};
}
async function createPurchaseOrder(orderData) {
	try {
		const poNumber = `PO-${Math.floor(10430 + Math.random() * 9e3)}`;
		const newOrder = {
			id: `ord_${Date.now()}`,
			po: poNumber,
			status: "Submitted",
			placedAt: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric"
			}),
			...orderData
		};
		const orderDocRef = doc(db, "orders", newOrder.id);
		await setDoc(orderDocRef, newOrder);
		const vendorInboxDocRef = doc(db, "vendorInbox", `vo_${Date.now()}`);
		await setDoc(vendorInboxDocRef, {
			id: vendorInboxDocRef.id,
			po: poNumber,
			customer: newOrder.customer || "Ridgeline Builders",
			contact: newOrder.requestedBy || "Marcus Hale",
			total: newOrder.total || 0,
			lines: newOrder.lines || 1,
			needBy: newOrder.needBy || "ASAP",
			received: "Just now",
			status: "Submitted"
		});
		try {
			await httpsCallable(functions, "onPurchaseOrderCreated")({
				po: poNumber,
				order: newOrder
			});
		} catch {}
		return newOrder;
	} catch (err) {
		console.warn("Firestore createPurchaseOrder fallback:", err);
		return {
			id: `ord_${Date.now()}`,
			po: `PO-${Math.floor(10430 + Math.random() * 9e3)}`,
			status: "Submitted",
			placedAt: "Today",
			...orderData
		};
	}
}
async function updateOrderStatus(orderId, newStatus) {
	try {
		const orderDocRef = doc(db, "orders", orderId);
		await updateDoc(orderDocRef, { status: newStatus }).catch(() => {});
		const vendorDocRef = doc(db, "vendorInbox", orderId);
		await updateDoc(vendorDocRef, { status: newStatus }).catch(() => {});
	} catch (err) {
		console.warn("Firestore updateOrderStatus fallback:", err);
	}
}
async function togglePlannerStopDone(stopId, currentDone) {
	try {
		const stopDocRef = doc(db, "plannerStops", stopId);
		await updateDoc(stopDocRef, { done: !currentDone });
	} catch (err) {
		console.warn("Firestore togglePlannerStopDone fallback:", err);
	}
}
async function addPlannerStop(stopData) {
	try {
		const id = `ps_${Date.now()}`;
		const docRef = doc(db, "plannerStops", id);
		const payload = {
			id,
			done: false,
			...stopData
		};
		await setDoc(docRef, payload);
		return payload;
	} catch (err) {
		console.warn("Firestore addPlannerStop fallback:", err);
		return stopData;
	}
}
async function getStorageAssetUrl(path) {
	if (!path) return "#";
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	try {
		const cleanPath = path.replace(/^storage:\/\//, "");
		const storageRef = ref(storage, cleanPath);
		return await getDownloadURL(storageRef);
	} catch (err) {
		console.warn(`Firebase Storage URL resolution fallback for ${path}:`, err);
		return `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(path.replace(/^storage:\/\//, ""))}?alt=media`;
	}
}
//#endregion
export { Td as a, createPurchaseOrder as c, updateOrderStatus as d, useFirestoreCollection as f, TableWrap as i, getStorageAssetUrl as l, StatCard as n, Th as o, StatusPill as r, addPlannerStop as s, Panel as t, togglePlannerStopDone as u };
