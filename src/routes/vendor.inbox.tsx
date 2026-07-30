import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock, Package, Truck } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Panel, StatusPill } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usd, vendorInbox, type OrderStatus } from "@/lib/mock-firebase";

export const Route = createFileRoute("/vendor/inbox")({
  head: () => ({
    meta: [
      { title: "Order Inbox | Lavaant Vendor" },
      {
        name: "description",
        content:
          "A unified, real-time inbox for digital purchase orders arriving from your construction customers.",
      },
      { property: "og:title", content: "Order Inbox | Lavaant Vendor" },
      {
        property: "og:description",
        content: "Acknowledge, pick, and ship — every order in one live queue.",
      },
    ],
  }),
  component: VendorInbox,
});

const FILTERS = ["All", "Submitted", "Acknowledged", "Shipped", "Received"] as const;

function VendorInbox() {
  const [statuses, setStatuses] = useState<Record<string, OrderStatus>>(
    Object.fromEntries(vendorInbox.map((o) => [o.id, o.status])),
  );
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selectedId, setSelectedId] = useState(vendorInbox[0].id);

  const rows = vendorInbox.filter((o) => filter === "All" || statuses[o.id] === filter);
  const selected = vendorInbox.find((o) => o.id === selectedId)!;

  const advance = (id: string) => {
    const flow: OrderStatus[] = ["Submitted", "Acknowledged", "Shipped", "Received"];
    const next = flow[Math.min(flow.indexOf(statuses[id]) + 1, flow.length - 1)];
    setStatuses((prev) => ({ ...prev, [id]: next })); // Firebase Function: updateOrderStatus
    toast.success(`${vendorInbox.find((o) => o.id === id)!.po} marked ${next}`);
  };

  return (
    <AppShell
      role="vendor"
      title="Order inbox"
      subtitle="Digital POs arriving live from Lavaant Inventory customers"
    >
      <div className="-mx-1 overflow-x-auto">
        <div className="flex min-w-max gap-1 px-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {rows.map((o) => {
            const status = statuses[o.id];
            return (
              <article
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className={cn(
                  "surface cursor-pointer p-4 transition-colors sm:p-5",
                  selectedId === o.id && "border-primary",
                )}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-display text-base font-bold">{o.po}</h3>
                      <StatusPill status={status} />
                    </div>
                    <p className="mt-1 truncate text-sm font-medium">{o.customer}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {o.contact} · {o.lines} lines · need by {o.needBy}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg font-black">{usd(o.total)}</p>
                    <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {o.received}
                    </p>
                  </div>
                </div>
                {status !== "Received" ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        advance(o.id);
                      }}
                    >
                      {status === "Submitted" ? (
                        <>
                          <Check className="mr-1 size-4" /> Acknowledge
                        </>
                      ) : status === "Acknowledged" ? (
                        <>
                          <Package className="mr-1 size-4" /> Mark picked & shipped
                        </>
                      ) : (
                        <>
                          <Truck className="mr-1 size-4" /> Confirm delivered
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                      Message buyer
                    </Button>
                  </div>
                ) : null}
              </article>
            );
          })}
          {rows.length === 0 ? (
            <Panel>
              <p className="py-6 text-center text-sm text-muted-foreground">
                Nothing in this queue right now.
              </p>
            </Panel>
          ) : null}
        </div>

        <Panel title={`${selected.po} detail`} description={selected.customer}>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Contact", selected.contact],
              ["Lines", String(selected.lines)],
              ["Need by", selected.needBy],
              ["Received", selected.received],
              ["Status", statuses[selected.id]],
              ["Total", usd(selected.total)],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0 rounded-lg bg-muted/60 px-3 py-2">
                <dt className="label-eyebrow">{k}</dt>
                <dd className="truncate font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-lg border border-border p-3 text-xs text-muted-foreground">
            Buyer note: “Gate code 4471. Call 30 minutes before delivery — crane is on the deck
            until noon.”
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}
