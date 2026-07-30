import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, FilePlus2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import {
  budgetVsActual,
  forecast,
  inventoryItems,
  orders,
  spendByJob,
  usd,
} from "@/lib/mock-firebase";

export const Route = createFileRoute("/inventory/")({
  head: () => ({
    meta: [
      { title: "Inventory Dashboard | Lavaant Inventory" },
      {
        name: "description",
        content:
          "Forecasting, budget vs. actuals, low-stock alerts, and recent purchase orders for your construction jobs.",
      },
      { property: "og:title", content: "Inventory Dashboard | Lavaant Inventory" },
      {
        property: "og:description",
        content: "Track spend by job, watch par levels, and see every open PO in one place.",
      },
    ],
  }),
  component: InventoryDashboard,
});

function InventoryDashboard() {
  const lowStock = inventoryItems.filter((i) => i.onHand < i.par);
  const onHandValue = inventoryItems.reduce((s, i) => s + i.onHand * i.unitCost, 0);
  const openOrders = orders.filter((o) => o.status !== "Received");

  return (
    <AppShell
      role="inventory"
      title="Good morning, Marcus"
      subtitle="Ridgeline Builders — 4 active jobs"
      actions={
        <Button asChild className="font-bold">
          <Link to="/inventory/orders/new">
            <FilePlus2 className="mr-1 size-4" /> New PO
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="On-hand value"
          value={usd(onHandValue)}
          hint="Money sitting in the yard & stock room"
        />
        <StatCard
          label="Open orders"
          value={String(openOrders.length)}
          hint={`${usd(openOrders.reduce((s, o) => s + o.total, 0))} committed`}
        />
        <StatCard
          label="July budget vs. actual"
          value={usd(88150)}
          delta="4.2% under budget"
          hint="Budget 92,000"
        />
        <StatCard
          label="Below par level"
          value={String(lowStock.length)}
          tone="destructive"
          hint="Items needing reorder"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Budget vs. actuals"
          description="Trailing 6 months of material spend"
          className="xl:col-span-2"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVsActual}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v: number) => usd(v)}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="budget" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Forecast" description="Projected spend, next 4 months">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v: number) => usd(v)}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="var(--color-chart-2)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Recent orders"
          description="Latest purchase orders across all jobs"
          className="xl:col-span-2"
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link to="/inventory/tracking">View all</Link>
            </Button>
          }
        >
          <TableWrap>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th>PO</Th>
                  <Th>Vendor</Th>
                  <Th>Job</Th>
                  <Th className="text-right">Total</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/50">
                    <Td className="font-semibold">{o.po}</Td>
                    <Td>{o.vendor}</Td>
                    <Td className="text-muted-foreground">{o.job}</Td>
                    <Td className="text-right font-semibold">{usd(o.total)}</Td>
                    <Td>
                      <StatusPill status={o.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Panel>

        <div className="space-y-6">
          <Panel title="Needs reorder" description="Below par level">
            <ul className="space-y-3">
              {lowStock.map((i) => (
                <li key={i.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{i.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{i.supplier}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold whitespace-nowrap">
                    {i.onHand}/{i.par} {i.unit}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Spend by job" description="Year to date">
            <ul className="space-y-3">
              {spendByJob.map((j) => {
                const pct = (j.spend / spendByJob[0].spend) * 100;
                return (
                  <li key={j.job}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-sm font-medium">{j.job}</span>
                      <span className="shrink-0 text-xs font-bold">{usd(j.spend)}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
