import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { httpsCallable } from "firebase/functions";
import { auth, db, storage, functions } from "../../firebase";
import {
  initialInventoryItems,
  initialOrders,
  initialVendorInbox,
  initialVendorCustomers,
  initialCatalog,
  initialPlannerStops,
  initialCrmCustomers,
} from "./mock-firebase";

/* -------------------------------------------------------------------------- */
/*                           AUTO-SEEDING FIRESTORE                            */
/* -------------------------------------------------------------------------- */

let isSeeding = false;

export async function seedFirestoreIfEmpty() {
  if (isSeeding) return;
  isSeeding = true;
  try {
    const collectionsToSeed = [
      { name: "inventoryItems", data: initialInventoryItems },
      { name: "orders", data: initialOrders },
      { name: "vendorInbox", data: initialVendorInbox },
      { name: "vendorCustomers", data: initialVendorCustomers },
      { name: "catalog", data: initialCatalog },
      { name: "plannerStops", data: initialPlannerStops },
      { name: "crmCustomers", data: initialCrmCustomers },
    ];

    for (const item of collectionsToSeed) {
      const colRef = collection(db, item.name);
      const snapshot = await getDocs(colRef).catch(() => null);
      if (snapshot && snapshot.empty) {
        console.log(`Seeding Firestore collection: ${item.name}`);
        for (const docData of item.data) {
          const docRef = doc(colRef, docData.id);
          await setDoc(docRef, docData, { merge: true }).catch((err) =>
            console.warn(`Error seeding doc ${docData.id}:`, err)
          );
        }
      }
    }
  } catch (err) {
    console.warn("Firestore auto-seeding fallback activated:", err);
  } finally {
    isSeeding = false;
  }
}

// Fire off background seed check
seedFirestoreIfEmpty();

/* -------------------------------------------------------------------------- */
/*                     REALTIME FIRESTORE HOOK & HELPERS                       */
/* -------------------------------------------------------------------------- */

/**
 * Custom React Hook that listens to a Firestore collection in real time.
 * Fallbacks seamlessly to fallbackData if Firestore is offline or empty.
 */
export function useFirestoreCollection(collectionName, fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const colRef = collection(db, collectionName);
      unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setData(docs);
          } else {
            // Seed if empty
            seedFirestoreIfEmpty();
            setData(fallbackData);
          }
          setLoading(false);
        },
        (err) => {
          console.warn(`Firestore subscription fallback for ${collectionName}:`, err);
          setError(err);
          setData(fallbackData);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn(`Firestore setup error for ${collectionName}:`, err);
      setError(err);
      setData(fallbackData);
      setLoading(false);
    }
    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error };
}

/* -------------------------------------------------------------------------- */
/*                        INVENTORY & PO OPERATIONS                           */
/* -------------------------------------------------------------------------- */

export async function addInventoryItem(item) {
  try {
    const id = item.id || `itm_${Date.now()}`;
    const docRef = doc(db, "inventoryItems", id);
    const payload = { ...item, id };
    await setDoc(docRef, payload, { merge: true });
    return payload;
  } catch (err) {
    console.warn("Firestore addInventoryItem fallback:", err);
    return item;
  }
}

export async function updateInventoryItem(id, updates) {
  try {
    const docRef = doc(db, "inventoryItems", id);
    await updateDoc(docRef, updates);
  } catch (err) {
    console.warn("Firestore updateInventoryItem fallback:", err);
  }
}

export async function createPurchaseOrder(orderData) {
  try {
    const poNumber = `PO-${Math.floor(10430 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ord_${Date.now()}`,
      po: poNumber,
      status: "Submitted",
      placedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ...orderData,
    };

    // 1. Add to orders collection in Firestore
    const orderDocRef = doc(db, "orders", newOrder.id);
    await setDoc(orderDocRef, newOrder);

    // 2. Add to vendorInbox collection in Firestore so vendor sees order in real time
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
      status: "Submitted",
    });

    // 3. Trigger Firebase Functions if available
    try {
      const sendPOFunction = httpsCallable(functions, "onPurchaseOrderCreated");
      await sendPOFunction({ po: poNumber, order: newOrder });
    } catch {
      /* headless function fallback */
    }

    return newOrder;
  } catch (err) {
    console.warn("Firestore createPurchaseOrder fallback:", err);
    return {
      id: `ord_${Date.now()}`,
      po: `PO-${Math.floor(10430 + Math.random() * 9000)}`,
      status: "Submitted",
      placedAt: "Today",
      ...orderData,
    };
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    const orderDocRef = doc(db, "orders", orderId);
    await updateDoc(orderDocRef, { status: newStatus }).catch(() => {});

    const vendorDocRef = doc(db, "vendorInbox", orderId);
    await updateDoc(vendorDocRef, { status: newStatus }).catch(() => {});
  } catch (err) {
    console.warn("Firestore updateOrderStatus fallback:", err);
  }
}

/* -------------------------------------------------------------------------- */
/*                         CRM PLANNER OPERATIONS                             */
/* -------------------------------------------------------------------------- */

export async function togglePlannerStopDone(stopId, currentDone) {
  try {
    const stopDocRef = doc(db, "plannerStops", stopId);
    await updateDoc(stopDocRef, { done: !currentDone });
  } catch (err) {
    console.warn("Firestore togglePlannerStopDone fallback:", err);
  }
}

export async function addPlannerStop(stopData) {
  try {
    const id = `ps_${Date.now()}`;
    const docRef = doc(db, "plannerStops", id);
    const payload = { id, done: false, ...stopData };
    await setDoc(docRef, payload);
    return payload;
  } catch (err) {
    console.warn("Firestore addPlannerStop fallback:", err);
    return stopData;
  }
}

/* -------------------------------------------------------------------------- */
/*                         FIREBASE STORAGE HELPERS                           */
/* -------------------------------------------------------------------------- */

export async function getStorageAssetUrl(path) {
  if (!path) return "#";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  try {
    const cleanPath = path.replace(/^storage:\/\//, "");
    const storageRef = ref(storage, cleanPath);
    return await getDownloadURL(storageRef);
  } catch (err) {
    console.warn(`Firebase Storage URL resolution fallback for ${path}:`, err);
    return `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(
      path.replace(/^storage:\/\//, "")
    )}?alt=media`;
  }
}
