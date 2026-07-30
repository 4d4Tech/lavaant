import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Minus, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Panel, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { initialInventoryItems, usdCents } from "@/lib/mock-firebase";
import { useFirestoreCollection, createPurchaseOrder } from "@/lib/firebase-service";

export const Route = createFileRoute("/inventory/orders/new")({
  head: () => ({
    meta: [
      { title: "Create a Digital Purchase Order | Lavaant Inventory" },
      {
        name: "description",
        content:
          "Generate a digital purchase order and send it straight to your vendor — no carbon copies, no lost paperwork.",
      },
      { property: "og:title", content: "Create a Digital Purchase Order | Lavaant Inventory" },
      {
        property: "og:description",
        content: "Pick items from your verified list, set ship-to and need-by, and submit.",
      },
    ],
  }),
  component: NewPurchaseOrder,
});

const JOBS = [
  "Northgate Medical Tower",
  "Harborview Phase 2",
  "Eastline Warehouse",
  "Service & Small Works",
];
const SHIP_TO = [
  "Northgate Medical — Gate 4",
  "Harborview — Dock 1",
  "Yard B — Lay-Down",
  "Stock Room A",
  "Trailer 2 — Northgate",
];

function NewPurchaseOrder() {
  const { data: inventoryItems } = useFirestoreCollection("inventoryItems", initialInventoryItems);
  const [vendor, setVendor] = useState(inventoryItems[0]?.supplier || "Gulf Coast Industrial Supply");
  const [job, setJob] = useState(JOBS[0]);
  const [shipTo, setShipTo] = useState(SHIP_TO[0]);
  const [needBy, setNeedBy] = useState("");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState([{ id: "itm_01", qty: 20 }]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPo, setSubmittedPo] = useState(null);

  const vendors = [...new Set(inventoryItems.map((i) => i.supplier))];
  const catalogForVendor = inventoryItems.filter((i) => i.supplier === vendor);
  const item = (id) => inventoryItems.find((i) => i.id === id) || { unitCost: 0, name: "Item", sku: "" };
  const subtotal = lines.reduce((s, l) => s + (item(l.id).unitCost || 0) * l.qty, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const addLine = (id) => {
    setLines((prev) =>
      prev.some((l) => l.id === id)
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }]
    );
  };
  const setQty = (id, qty) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  const removeLine = (id) => setLines((prev) => prev.filter((l) => l.id !== id));

  const submit = async () => {
    if (!lines.length) {
      toast.error("Add at least one line item.");
      return;
    }
    setSubmitting(true);
    // Connect to Firebase Functions & Firestore PO creation
    const res = await createPurchaseOrder({
      vendor,
      job,
      shipTo,
      needBy,
      notes,
      total,
      lines: lines.length,
      requestedBy: "Marcus Hale",
      customer: "Ridgeline Builders",
    });
    setSubmitting(false);
    setSubmittedPo(res.po || res.id);
    toast.success(`${res.po || res.id} sent to ${vendor}`);
  };

  if (submittedPo) {
    return (
      <AppShell role="inventory" title="Purchase order sent" subtitle={`${submittedPo} · ${vendor}`}>
        <Panel>
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="size-12 text-success" />
            <h2 className="mt-4 text-xl font-bold">{submittedPo} is on its way</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {vendor} received it in their Lavaant Vendor inbox instantly. You&apos;ll see an
              acknowledgement the moment they open it — no phone tag, no carbon copies.
            </p>
            <dl className="mt-6 grid w-full max-w-md gap-3 text-left sm:grid-cols-2">
              {[
                ["Job", job],
                ["Ship to", shipTo],
                ["Need by", needBy || "ASAP"],
                ["Total", usdCents(total)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-muted/60 px-3 py-2">
                  <dt className="label-eyebrow">{k}</dt>
                  <dd className="truncate text-sm font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <Button
              className="mt-6 font-bold"
              onClick={() => {
                setSubmittedPo(null);
                setLines([]);
                setNotes("");
              }}
            >
              Start another PO
            </Button>
          </div>
        </Panel>
      </AppShell>
    );
  }

  return (
    <AppShell
      role="inventory"
      title="New purchase order"
      subtitle="Digital PO — goes straight to your vendor's inbox"
      actions={
        <Button onClick={submit} disabled={submitting} className="font-bold">
          <Send className="mr-1 size-4" />
          {submitting ? "Sending…" : "Submit PO"}
        </Button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Panel title="Order details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vendor">
                <select
                  value={vendor}
                  onChange={(e) => {
                    setVendor(e.target.value);
                    setLines([]);
                  }}
                  className="field"
                >
                  {vendors.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </Field>
              <Field label="Job / cost code">
                <select value={job} onChange={(e) => setJob(e.target.value)} className="field">
                  {JOBS.map((j) => (
                    <option key={j}>{j}</option>
                  ))}
                </select>
              </Field>
              <Field label="Ship to">
                <select value={shipTo} onChange={(e) => setShipTo(e.target.value)} className="field">
                  {SHIP_TO.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Need by">
                <input
                  type="date"
                  value={needBy}
                  onChange={(e) => setNeedBy(e.target.value)}
                  className="field"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Notes for the vendor">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Gate code 4471. Call Marcus 30 min before delivery."
                    className="field resize-y"
                  />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel title="Line items" description={`${lines.length} on this PO`}>
            {lines.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No items yet — add from the catalog.
              </p>
            ) : (
              <>
                {/* Mobile line cards */}
                <ul className="space-y-3 lg:hidden">
                  {lines.map((l) => {
                    const it = item(l.id);
                    return (
                      <li key={l.id} className="rounded-lg border border-border p-3">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{it.name}</p>
                            <p className="font-mono text-xs text-muted-foreground">{it.sku}</p>
                          </div>
                          <button
                            onClick={() => removeLine(l.id)}
                            aria-label={`Remove ${it.name}`}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <QtyStepper qty={l.qty} onChange={(q) => setQty(l.id, q)} />
                          <span className="text-sm font-bold">
                            {usdCents(it.unitCost * l.qty)}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="hidden lg:block">
                  <TableWrap>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <Th>Item</Th>
                          <Th className="text-right">Unit</Th>
                          <Th className="text-center">Qty</Th>
                          <Th className="text-right">Ext.</Th>
                          <Th>{""}</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {lines.map((l) => {
                          const it = item(l.id);
                          return (
                            <tr key={l.id}>
                              <Td>
                                <p className="font-semibold">{it.name}</p>
                                <p className="font-mono text-xs text-muted-foreground">{it.sku}</p>
                              </Td>
                              <Td className="text-right">{usdCents(it.unitCost)}</Td>
                              <Td>
                                <div className="flex justify-center">
                                  <QtyStepper qty={l.qty} onChange={(q) => setQty(l.id, q)} />
                                </div>
                              </Td>
                              <Td className="text-right font-bold">
                                {usdCents(it.unitCost * l.qty)}
                              </Td>
                              <Td className="text-right">
                                <button
                                  onClick={() => removeLine(l.id)}
                                  aria-label={`Remove ${it.name}`}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </Td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </TableWrap>
                </div>
              </>
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Vendor catalog" description={vendor}>
            <ul className="space-y-2">
              {catalogForVendor.map((it) => (
                <li
                  key={it.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{it.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {usdCents(it.unitCost)} / {it.unit}
                    </p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => addLine(it.id)}>
                    <Plus className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Totals">
            <dl className="space-y-2 text-sm">
              <Row k="Subtotal" v={usdCents(subtotal)} />
              <Row k="Tax (8.25%)" v={usdCents(tax)} />
              <div className="border-t border-border pt-2">
                <div className="flex items-baseline justify-between">
                  <dt className="font-display font-bold">Total</dt>
                  <dd className="font-display text-xl font-black">{usdCents(total)}</dd>
                </div>
              </div>
            </dl>
            <Button
              onClick={submit}
              disabled={submitting}
              size="lg"
              className="mt-4 w-full font-bold"
            >
              <Send className="mr-1 size-4" />
              {submitting ? "Sending…" : "Submit purchase order"}
            </Button>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label-eyebrow">{label}</span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

function QtyStepper({ qty, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
        className="grid size-8 place-items-center rounded-md border border-input hover:bg-muted"
      >
        <Minus className="size-3.5" />
      </button>
      <input
        type="number"
        value={qty}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Quantity"
        className="w-14 rounded-md border border-input bg-card py-1.5 text-center text-sm font-bold outline-none focus:border-primary"
      />
      <button
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className="grid size-8 place-items-center rounded-md border border-input hover:bg-muted"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
