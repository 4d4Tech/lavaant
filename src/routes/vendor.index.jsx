import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Inbox } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { usd, initialVendorCustomers, initialVendorInbox, vendorSalesTrend } from "@/lib/mock-firebase";
import { useFirestoreCollection } from "@/lib/firebase-service";

export const Route = createFileRoute("/vendor/")({
  head: () => ({
    meta: [
      { title: "Vendor Dashboard | Lavaant Vendor" },
      {
        name: "description",
        content:
          "Real-time digital orders from verified construction customers, sales trends, and account activity for suppliers.",
      },
      { property: "og:title", content: "Vendor Dashboard | Lavaant Vendor" },
      {
        property: "og:description",
        content: "See incoming POs the second they're submitted — no faxes, no phone tag.",
      },
    ],
  }),
  component: VendorDashboard,
});

function VendorDashboard() {
  const { data: vendorInbox } = useFirestoreCollection("vendorInbox", initialVendorInbox);
  const { data: vendorCustomers } = useFirestoreCollection("vendorCustomers", initialVendorCustomers);

  const newOrders = vendorInbox.filter((o) => o.status === "Submitted");
  const openValue = vendorInbox
    .filter((o) => o.status !== "Received")
    .reduce((s, o) => s + Number(o.total || 0), 0);

  return (
    <AppShell
      role="vendor"
      title="Gulf Coast Industrial Supply"
      subtitle="Order desk — Dana Whitfield"
      actions={
        <Button asChild className="font-bold">
          <Link to="/vendor/inbox">
            <Inbox className="mr-1 size-4" /> Open inbox
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="New orders"
          value={String(newOrders.length)}
          tone="accent"
          hint="Awaiting acknowledgement"
        />
        <StatCard label="Open order value" value={usd(openValue)} hint="Not yet received" />
        <StatCard label="July sales" value={usd(171900)} delta="+15.1% vs. June" />
        <StatCard
          label="Linked customers"
          value={String(vendorCustomers.length)}
          hint={`${vendorCustomers.filter((c) => c.verified).length} verified`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Sales trend"
          description="Monthly revenue through Lavaant"
          className="xl:col-span-2"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vendorSalesTrend}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
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
                  tickFormatter={(v) => `${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v) => usd(v)}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  fill="url(#salesFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top accounts" description="Revenue year to date">
          <ul className="space-y-3">
            {vendorCustomers.map((c) => {
              const maxVal = vendorCustomers[0]?.ytd || 1;
              const pct = (Number(c.ytd || 0) / maxVal) * 100;
              return (
                <li key={c.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="min-w-0 truncate text-sm font-semibold">{c.name}</span>
                    <span className="shrink-0 text-xs font-bold">{usd(c.ytd)}</span>
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

      <Panel
        title="Latest incoming orders"
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link to="/vendor/inbox">View inbox</Link>
          </Button>
        }
      >
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>PO</Th>
                <Th>Customer</Th>
                <Th>Received</Th>
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
                  <Td className="text-muted-foreground">{o.received}</Td>
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
    </AppShell>
  );
}
