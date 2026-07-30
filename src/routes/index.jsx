import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Boxes, LineChart, ShieldCheck, Truck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { DEMO_USERS, ROLE_META } from "@/lib/mock-firebase";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lavaant — Digital Inventory & Purchase Orders for Construction" },
      {
        name: "description",
        content:
          "Sign in to Lavaant: inventory tracking, digital purchase orders, vendor order inbox, and a CRM built for construction sales pros.",
      },
      { property: "og:title", content: "Lavaant — Construction Inventory & Purchasing Platform" },
      {
        property: "og:description",
        content:
          "Inventory is just money laying around that doesn't look like dollar bills. Lavaant turns it into trackable digital assets.",
      },
    ],
  }),
  component: SignIn,
});

const ROLE_CARDS = [
  {
    role: "inventory",
    icon: Boxes,
    blurb: "Track purchases, par levels, and budget vs. actuals across every job.",
  },
  {
    role: "vendor",
    icon: Truck,
    blurb: "Receive digital POs in real time from verified construction customers.",
  },
  {
    role: "crm",
    icon: LineChart,
    blurb: "Plan the day, log every stop, and take orders without leaving the truck.",
  },
];

function SignIn() {
  const { signIn, user, ready } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("inventory");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: ROLE_META[user.role]?.home || "/", replace: true });
  }, [ready, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    signIn(selected);
    navigate({ to: ROLE_META[selected].home });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <section className="gradient-brand relative flex flex-col justify-between px-6 py-10 text-sidebar-foreground sm:px-10 lg:px-14 lg:py-14">
        <BrandMark />
        <div className="mt-10 max-w-xl lg:mt-0">
          <p className="label-eyebrow text-sidebar-primary">Built for the field</p>
          <h1 className="mt-4 text-3xl leading-[1.08] font-black sm:text-4xl lg:text-5xl">
            Inventory is just{" "}
            <span className="text-sidebar-primary">MONEY laying around</span> that doesn&apos;t look
            like dollar bills.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-sidebar-foreground/75 sm:text-base">
            Retire the carbon-copy PO book. Lavaant links construction companies, their suppliers,
            and the sales pros between them on one centralized record — from the stock room to the
            lay-down yard.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Digital purchase orders",
              "Verified supplier catalogs",
              "Budget vs. actual forecasting",
              "Ship-to & by-person reporting",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="size-4 shrink-0 text-sidebar-primary" />
                <span className="min-w-0">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-xs text-sidebar-foreground/50">
          Connected to Firebase Auth, Firestore, Storage & Functions.
        </p>
      </section>

      {/* Auth panel */}
      <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-2xl font-bold sm:text-3xl">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose your portal — you&apos;ll be routed by role.
          </p>

          <div className="mt-6 space-y-3">
            {ROLE_CARDS.map(({ role, icon: Icon, blurb }) => {
              const active = selected === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelected(role)}
                  aria-pressed={active}
                  className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/[0.04] shadow-panel"
                      : "border-border hover:border-primary/40 hover:bg-muted/60"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-lg ${
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold">
                      {ROLE_META[role].name}
                    </span>
                    <span className="block text-xs text-muted-foreground">{blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-3">
            <div>
              <label htmlFor="email" className="label-eyebrow">
                Work email
              </label>
              <input
                id="email"
                type="email"
                readOnly
                value={DEMO_USERS[selected]?.email || ""}
                className="mt-1.5 w-full rounded-md border border-input bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="password" className="label-eyebrow">
                Password
              </label>
              <input
                id="password"
                type="password"
                defaultValue="demo-password"
                className="mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full font-bold" disabled={pending}>
            Enter {ROLE_META[selected].name}
            <ArrowRight className="ml-1 size-4" />
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Firebase Auth session initialized. Any password logs in demo role.
          </p>
        </form>
      </section>
    </div>
  );
}
