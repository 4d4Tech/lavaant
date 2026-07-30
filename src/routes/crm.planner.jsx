import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Clock, MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard, StatusPill } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { initialPlannerStops } from "@/lib/mock-firebase";
import { useFirestoreCollection, togglePlannerStopDone, addPlannerStop } from "@/lib/firebase-service";

export const Route = createFileRoute("/crm/planner")({
  head: () => ({
    meta: [
      { title: "Daily Planner | Lavaant CRM" },
      {
        name: "description",
        content:
          "Plan the day, organize tasks, and increase in-person stops — a route-first planner built for construction sales.",
      },
      { property: "og:title", content: "Daily Planner | Lavaant CRM" },
      {
        property: "og:description",
        content: "Every stop, quote, and delivery for today in one running order.",
      },
    ],
  }),
  component: DailyPlanner,
});

const TYPE_TONE = {
  Stop: "bg-primary/10 text-primary",
  Quote: "bg-destructive/12 text-destructive",
  Delivery: "bg-accent/20 text-accent-foreground",
  Call: "bg-muted text-muted-foreground",
};

function DailyPlanner() {
  const { data: stops } = useFirestoreCollection("plannerStops", initialPlannerStops);
  const [draft, setDraft] = useState({ time: "", customer: "", purpose: "" });

  const toggle = async (id, currentDone) => {
    await togglePlannerStopDone(id, currentDone);
  };

  const handleAddStop = async (e) => {
    e.preventDefault();
    if (!draft.customer.trim()) {
      toast.error("Who are you stopping to see?");
      return;
    }
    await addPlannerStop({
      time: draft.time || "TBD",
      customer: draft.customer,
      contact: "—",
      address: "Add address",
      purpose: draft.purpose || "Cold stop",
      type: "Stop",
    });
    setDraft({ time: "", customer: "", purpose: "" });
    toast.success("Stop added to today's plan");
  };

  const done = stops.filter((s) => s.done).length;

  return (
    <AppShell
      role="crm"
      title="Daily planner"
      subtitle="Today — built for windshield time"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Planned stops" value={String(stops.length)} />
        <StatCard label="Completed" value={String(done)} tone="success" />
        <StatCard
          label="Remaining"
          value={String(stops.length - done)}
          tone="accent"
          hint="Keep the truck moving"
        />
        <StatCard
          label="Goal"
          value="6 stops/day"
          hint={`${Math.max(0, 6 - stops.length)} to hit goal`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Today's run" description={`${done} of ${stops.length} complete`}>
          <ol className="space-y-3">
            {stops.map((s) => (
              <li
                key={s.id}
                className={cn(
                  "rounded-lg border p-3.5 transition-colors sm:p-4",
                  s.done ? "border-border bg-muted/40" : "border-border bg-card"
                )}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                  <button
                    onClick={() => toggle(s.id, s.done)}
                    aria-label={s.done ? `Reopen ${s.customer}` : `Complete ${s.customer}`}
                    className="mt-0.5 shrink-0"
                  >
                    {s.done ? (
                      <CheckCircle2 className="size-5 text-success" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={cn(
                          "truncate text-sm font-bold",
                          s.done && "text-muted-foreground line-through"
                        )}
                      >
                        {s.customer}
                      </h3>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-bold",
                          TYPE_TONE[s.type] || TYPE_TONE.Stop
                        )}
                      >
                        {s.type}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{s.contact}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{s.address}</span>
                    </p>
                    <p className="mt-2 text-sm">{s.purpose}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-bold whitespace-nowrap">
                    <Clock className="size-3.5" /> {s.time}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-6">
          <Panel title="Add a stop">
            <form onSubmit={handleAddStop} className="space-y-3">
              <label className="block">
                <span className="label-eyebrow">Time</span>
                <input
                  type="time"
                  value={draft.time}
                  onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                  className="field mt-1.5"
                />
              </label>
              <label className="block">
                <span className="label-eyebrow">Customer</span>
                <input
                  value={draft.customer}
                  onChange={(e) => setDraft({ ...draft, customer: e.target.value })}
                  placeholder="Eastline Framing"
                  className="field mt-1.5"
                />
              </label>
              <label className="block">
                <span className="label-eyebrow">Purpose</span>
                <textarea
                  rows={2}
                  value={draft.purpose}
                  onChange={(e) => setDraft({ ...draft, purpose: e.target.value })}
                  placeholder="Drop catalog, walk the yard"
                  className="field mt-1.5 resize-y"
                />
              </label>
              <Button type="submit" className="w-full font-bold">
                <Plus className="mr-1 size-4" /> Add to plan
              </Button>
            </form>
          </Panel>

          <Panel title="Reminders" description="Pulled from your accounts">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <StatusPill status="Hot" />
                <span className="min-w-0">
                  Copperhead quote due <strong>today at 5:00 PM</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <StatusPill status="Warm" />
                <span className="min-w-0">
                  Sam Ottley still on paper POs — bring the onboarding one-pager.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <StatusPill status="Cold" />
                <span className="min-w-0">
                  Eastline Framing hasn&apos;t ordered in 61 days.
                </span>
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
