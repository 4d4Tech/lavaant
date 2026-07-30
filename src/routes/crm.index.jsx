import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, StatusPill } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { initialCrmCustomers, initialPlannerStops, usd } from "@/lib/mock-firebase";
import { useFirestoreCollection } from "@/lib/firebase-service";

export const Route = createFileRoute("/crm/")({
  head: () => ({
    meta: [
      { title: "Sales Dashboard | Lavaant CRM" },
      {
        name: "description",
        content:
          "An all-in-one CRM for construction sales pros: today's stops, quote deadlines, and account activity.",
      },
      { property: "og:title", content: "Sales Dashboard | Lavaant CRM" },
      {
        property: "og:description",
        content: "Plan more in-person stops, never miss a quote deadline, take orders on the spot.",
      },
    ],
  }),
  component: CrmDashboard,
});

function CrmDashboard() {
  const { data: plannerStops } = useFirestoreCollection("plannerStops", initialPlannerStops);
  const { data: crmCustomers } = useFirestoreCollection("crmCustomers", initialCrmCustomers);

  const done = plannerStops.filter((s) => s.done).length;
  const next = plannerStops.find((s) => !s.done);
  const deadlines = crmCustomers.filter((c) => c.quoteDeadline);

  return (
    <AppShell
      role="crm"
      title="Let's move, Tyler"
      subtitle={`Today — ${plannerStops.length} stops planned`}
      actions={
        <Button asChild className="font-bold">
          <Link to="/crm/planner">
            <CalendarCheck className="mr-1 size-4" /> Today&apos;s plan
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Stops completed"
          value={`${done}/${plannerStops.length}`}
          tone="success"
          hint="In-person visits today"
        />
        <StatCard
          label="Quotes due"
          value={String(deadlines.length)}
          tone="destructive"
          hint="Deadlines this week"
        />
        <StatCard label="Pipeline" value={usd(184000)} hint="Open quotes" />
        <StatCard
          label="YTD book"
          value={usd(crmCustomers.reduce((s, c) => s + Number(c.ytd || 0), 0))}
          delta="+12.7% vs. last year"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Up next"
          description="Your next stop"
          className="xl:col-span-2"
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link to="/crm/planner">Full planner</Link>
            </Button>
          }
        >
          {next ? (
            <div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg font-black">{next.customer}</h3>
                  <p className="truncate text-sm font-medium">{next.contact}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4 shrink-0" />
                    <span className="truncate">{next.address}</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-4 shrink-0" /> {next.time}
                  </p>
                </div>
                <StatusPill status={next.type === "Quote" ? "Hot" : "Warm"} />
              </div>
              <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm">{next.purpose}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button className="font-bold">
                  <Phone className="mr-1 size-4" /> Call ahead
                </Button>
                <Button asChild variant="outline">
                  <Link to="/crm/orders">Take an order</Link>
                </Button>
              </div>
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Every stop is knocked out. Go sell tomorrow.
            </p>
          )}
        </Panel>

        <Panel title="Quote deadlines" description="Don't let these slip">
          <ul className="space-y-3">
            {deadlines.map((c) => (
              <li key={c.id} className="rounded-lg border border-border p-3">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.contact}</p>
                  </div>
                  <StatusPill status={c.temp} />
                </div>
                <p className="mt-2 text-xs font-bold text-destructive">Due {c.quoteDeadline}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Accounts to touch" description="Longest since last visit">
        <ul className="grid gap-3 sm:grid-cols-2">
          {crmCustomers.map((c) => (
            <li
              key={c.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Last visit {c.lastVisit} · next {c.nextVisit}
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold">{usd(c.ytd)}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
