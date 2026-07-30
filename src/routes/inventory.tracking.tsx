import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { cn } from "@/lib/utils";
import {
  orders,
  shipToBreakdown,
  spendByJob,
  spendByPerson,
  inventoryItems,
  usd,
  usdCents,
} from "@/lib/mock-firebase";

export const Route = createFileRoute("/inventory/tracking")({
  head: () => ({
    meta: [
      { title: "Purchase Tracking & Reports | Lavaant Inventory" },
      {
        name: "description",
        content:
          "Detailed reporting of purchases by item, by person, and by ship-to location across every job.",
      },
      { property: "og:title", content: "Purchase Tracking & Reports | Lavaant Inventory" },
      {
        property: "og:description",
        content: "Know exactly who ordered what, where it shipped, and what it cost.",
      },
    ],
  }),
  component: Tracking,
});

const TABS = ["By item", "By person", "By ship-to", "All orders"] as const;

function Tracking() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("By item");
  const totalSpend = spendByJob.reduce((s, j) => s + j.spend, 0);

  return (
    <AppShell
      role="inventory"
      title="Tracking & reporting"
      subtitle="Every dollar, traced to an item, a person, and a gate"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="YTD material spend" value={usd(totalSpend)} hint="Across 4 jobs" />
        <StatCard label="Purchase orders" value="125" hint="Year to date" />
        <StatCard label="Avg. PO value" value={usd(totalSpend / 125)} />
        <StatCard label="Ship-to locations" value={String(shipToBreakdown.length)} tone="accent" />
      </div>

      <div className="-mx-1 overflow-x-auto">
        <div role="tablist" className="flex min-w-max gap-1 px-1">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "By item" ? (
        <Panel title="Purchases by item" description="Rolling 90 days">
          <TableWrap>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>Item</Th>
                  <Th>Supplier</Th>
                  <Th className="text-right">Qty purchased</Th>
                  <Th className="text-right">Unit cost</Th>
                  <Th className="text-right">Extended</Th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((i, idx) => {
                  const qty = 40 + idx * 27;
                  return (
                    <tr key={i.id} className="hover:bg-muted/50">
                      <Td>
                        <p className="font-semibold">{i.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">{i.sku}</p>
                      </Td>
                      <Td className="text-muted-foreground">{i.supplier}</Td>
                      <Td className="text-right font-semibold">
                        {qty} {i.unit}
                      </Td>
                      <Td className="text-right">{usdCents(i.unitCost)}</Td>
                      <Td className="text-right font-bold">{usd(qty * i.unitCost)}</Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrap>
        </Panel>
      ) : null}

      {tab === "By person" ? (
        <Panel title="Purchases by person" description="Who is spending what">
          <ul className="space-y-3">
            {spendByPerson.map((p) => (
              <li
                key={p.person}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{p.person}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.role} · {p.orders} orders
                  </p>
                </div>
                <span className="shrink-0 font-display text-lg font-black">{usd(p.spend)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      {tab === "By ship-to" ? (
        <Panel title="Purchases by ship-to location" description="Where material actually landed">
          <ul className="space-y-3">
            {shipToBreakdown.map((s) => {
              const pct = (s.spend / shipToBreakdown[0].spend) * 100;
              return (
                <li key={s.location}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate text-sm font-semibold">{s.location}</span>
                    <span className="shrink-0 text-xs font-bold">
                      {usd(s.spend)}{" "}
                      <span className="font-normal text-muted-foreground">· {s.orders} orders</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      ) : null}

      {tab === "All orders" ? (
        <Panel title="All purchase orders">
          <TableWrap>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>PO</Th>
                  <Th>Requested by</Th>
                  <Th>Ship to</Th>
                  <Th>Placed</Th>
                  <Th className="text-right">Total</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/50">
                    <Td className="font-semibold">{o.po}</Td>
                    <Td>{o.requestedBy}</Td>
                    <Td className="text-muted-foreground">{o.shipTo}</Td>
                    <Td className="text-muted-foreground">{o.placedAt}</Td>
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
      ) : null}
    </AppShell>
  );
}
