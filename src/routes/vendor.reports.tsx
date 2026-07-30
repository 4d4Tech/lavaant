import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, TableWrap, Td, Th } from "@/components/data-bits";
import { usd, vendorCustomers, vendorSalesTrend } from "@/lib/mock-firebase";

export const Route = createFileRoute("/vendor/reports")({
  head: () => ({
    meta: [
      { title: "Customer Reporting | Lavaant Vendor" },
      {
        name: "description",
        content:
          "Customer-based reporting for suppliers: sales trends, order frequency, and account growth.",
      },
      { property: "og:title", content: "Customer Reporting | Lavaant Vendor" },
      {
        property: "og:description",
        content: "Track sales trends by account and spot slipping customers early.",
      },
    ],
  }),
  component: VendorReports,
});

function VendorReports() {
  const ytd = vendorCustomers.reduce((s, c) => s + c.ytd, 0);

  return (
    <AppShell
      role="vendor"
      title="Reporting"
      subtitle="Customer-based sales trends through Lavaant"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="YTD revenue" value={usd(ytd)} delta="+18.4% YoY" />
        <StatCard label="Orders received" value="312" hint="Year to date" />
        <StatCard label="Avg. order value" value={usd(ytd / 312)} />
        <StatCard label="Fill rate" value="96.2%" tone="success" hint="Lines shipped complete" />
      </div>

      <Panel title="Monthly revenue" description="All accounts">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendorSalesTrend}>
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
              <Bar dataKey="sales" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Revenue by customer" description="Year to date">
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Contact</Th>
                <Th>Terms</Th>
                <Th className="text-right">Open orders</Th>
                <Th className="text-right">YTD revenue</Th>
                <Th className="text-right">Share</Th>
              </tr>
            </thead>
            <tbody>
              {vendorCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/50">
                  <Td className="font-semibold">{c.name}</Td>
                  <Td className="text-muted-foreground">{c.contact}</Td>
                  <Td className="text-muted-foreground">{c.terms}</Td>
                  <Td className="text-right">{c.openOrders}</Td>
                  <Td className="text-right font-bold">{usd(c.ytd)}</Td>
                  <Td className="text-right">{((c.ytd / ytd) * 100).toFixed(1)}%</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </AppShell>
  );
}
