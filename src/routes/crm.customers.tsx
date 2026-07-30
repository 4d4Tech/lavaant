import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Heart, Phone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { crmCustomers, usd } from "@/lib/mock-firebase";

export const Route = createFileRoute("/crm/customers")({
  head: () => ({
    meta: [
      { title: "Customer Tracking | Lavaant CRM" },
      {
        name: "description",
        content:
          "Visit history, next required visit, quote deadlines, and personal preferences for every construction account.",
      },
      { property: "og:title", content: "Customer Tracking | Lavaant CRM" },
      {
        property: "og:description",
        content: "Know your customers — right down to where they like to eat.",
      },
    ],
  }),
  component: CrmCustomers,
});

function CrmCustomers() {
  return (
    <AppShell
      role="crm"
      title="Customer tracking"
      subtitle="Visit history, deadlines, and the details that win the order"
      actions={<Button className="font-bold">Add account</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {crmCustomers.map((c) => (
          <article key={c.id} className="surface p-4 sm:p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-display text-base font-bold">{c.name}</h3>
                <p className="truncate text-sm">
                  {c.contact} <span className="text-muted-foreground">· {c.title}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">{c.phone}</p>
              </div>
              <StatusPill status={c.temp} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div className="min-w-0">
                <dt className="text-muted-foreground">Last visit</dt>
                <dd className="truncate font-bold">{c.lastVisit}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Next visit</dt>
                <dd className="truncate font-bold">{c.nextVisit}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Quote due</dt>
                <dd
                  className={`truncate font-bold ${c.quoteDeadline ? "text-destructive" : ""}`}
                >
                  {c.quoteDeadline ?? "—"}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">YTD</dt>
                <dd className="truncate font-bold">{usd(c.ytd)}</dd>
              </div>
            </dl>

            <p className="mt-4 flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-sm">
              <Heart className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="min-w-0">{c.preferences}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" className="font-bold">
                <Phone className="mr-1 size-4" /> Call
              </Button>
              <Button size="sm" variant="outline">
                <CalendarClock className="mr-1 size-4" /> Schedule visit
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Panel className="hidden lg:block" title="Visit cadence" description="All accounts">
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Account</Th>
                <Th>Contact</Th>
                <Th>Last visit</Th>
                <Th>Next required</Th>
                <Th>Quote deadline</Th>
                <Th className="text-right">YTD</Th>
              </tr>
            </thead>
            <tbody>
              {crmCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/50">
                  <Td className="font-semibold">{c.name}</Td>
                  <Td>{c.contact}</Td>
                  <Td className="text-muted-foreground">{c.lastVisit}</Td>
                  <Td>{c.nextVisit}</Td>
                  <Td className={c.quoteDeadline ? "font-bold text-destructive" : ""}>
                    {c.quoteDeadline ?? "—"}
                  </Td>
                  <Td className="text-right font-bold">{usd(c.ytd)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </AppShell>
  );
}
