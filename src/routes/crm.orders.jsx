import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { initialCatalog, initialCrmCustomers, usd, usdCents, initialVendorInbox } from "@/lib/mock-firebase";
import { useFirestoreCollection, createPurchaseOrder } from "@/lib/firebase-service";

export const Route = createFileRoute("/crm/orders")({
  head: () => ({
    meta: [
      { title: "Take & Track Orders | Lavaant CRM" },
      {
        name: "description",
        content:
          "Take customer orders on the spot and track them alongside your visit history inside Lavaant CRM.",
      },
      { property: "og:title", content: "Take & Track Orders | Lavaant CRM" },
      {
        property: "og:description",
        content: "Write the order at the jobsite — it lands in the vendor inbox instantly.",
      },
    ],
  }),
  component: CrmOrders,
});

function CrmOrders() {
  const { data: catalog } = useFirestoreCollection("catalog", initialCatalog);
  const { data: crmCustomers } = useFirestoreCollection("crmCustomers", initialCrmCustomers);
  const { data: vendorInbox } = useFirestoreCollection("vendorInbox", initialVendorInbox);

  const [customer, setCustomer] = useState(crmCustomers[0]?.name || "Ridgeline Builders");
  const [sku, setSku] = useState(catalog[0]?.id || "cp_01");
  const [qty, setQty] = useState(10);
  const [sending, setSending] = useState(false);

  const product = catalog.find((c) => c.id === sku) || catalog[0] || { price: 0, name: "Product", unit: "ea" };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    const orderTotal = product.price * qty;
    const res = await createPurchaseOrder({
      customer,
      requestedBy: "Tyler Boone (CRM)",
      shipTo: "Field Order",
      job: "Direct Sale",
      vendor: "Gulf Coast Industrial Supply",
      total: orderTotal,
      lines: 1,
      needBy: "ASAP",
    });
    setSending(false);
    toast.success(`${res.po || res.id} written for ${customer}`, {
      description: `${qty} × ${product.name} — ${usdCents(orderTotal)}`,
    });
  };

  return (
    <AppShell
      role="crm"
      title="Orders"
      subtitle="Take an order in the field, track it to delivery"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Orders written today" value="4" tone="success" />
        <StatCard label="Value written today" value={usd(18240)} />
        <StatCard label="Open orders" value={String(vendorInbox.filter(o => o.status !== "Received").length)} hint="Across your accounts" />
        <StatCard label="Month to date" value={usd(214600)} delta="+9.3% vs. last month" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <Panel title="Quick order" description="Write it before you leave the gate">
          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="label-eyebrow">Customer</span>
              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="field mt-1.5"
              >
                {crmCustomers.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="label-eyebrow">Product</span>
              <select
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="field mt-1.5"
              >
                {catalog.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="label-eyebrow">Quantity ({product.unit})</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="field mt-1.5"
              />
            </label>
            <div className="flex items-baseline justify-between rounded-lg bg-muted/60 px-3 py-2.5">
              <span className="label-eyebrow">Order total</span>
              <span className="font-display text-xl font-black">
                {usdCents(product.price * qty)}
              </span>
            </div>
            <Button type="submit" className="w-full font-bold" disabled={sending}>
              <Send className="mr-1 size-4" /> {sending ? "Sending…" : "Send order"}
            </Button>
          </form>
        </Panel>

        <Panel title="Recent orders" description="Written by you or your accounts">
          <TableWrap>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>PO</Th>
                  <Th>Customer</Th>
                  <Th>Need by</Th>
                  <Th className="text-right">Total</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {vendorInbox.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/50">
                    <Td className="font-semibold">{o.po}</Td>
                    <Td>{o.customer}</Td>
                    <Td className="text-muted-foreground">{o.needBy}</Td>
                    <Td className="text-right font-bold">{usd(o.total)}</Td>
                    <Td>
                      <StatusPill status={o.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
      </div>
    </AppShell>
  );
}
