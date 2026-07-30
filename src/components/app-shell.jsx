import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  BarChart3,
  BookOpen,
  Boxes,
  CalendarCheck,
  ClipboardList,
  FilePlus2,
  Inbox,
  LayoutDashboard,
  LineChart,
  LogOut,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ROLE_META } from "@/lib/mock-firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = {
  inventory: [
    { to: "/inventory", label: "Dashboard", short: "Home", icon: LayoutDashboard },
    { to: "/inventory/items", label: "Inventory List", short: "Items", icon: Boxes },
    { to: "/inventory/orders/new", label: "New Purchase Order", short: "New PO", icon: FilePlus2 },
    { to: "/inventory/tracking", label: "Tracking & Reports", short: "Track", icon: BarChart3 },
  ],
  vendor: [
    { to: "/vendor", label: "Dashboard", short: "Home", icon: LayoutDashboard },
    { to: "/vendor/inbox", label: "Order Inbox", short: "Inbox", icon: Inbox },
    { to: "/vendor/customers", label: "Customer Roster", short: "Roster", icon: Users },
    { to: "/vendor/catalog", label: "Digital Catalog", short: "Catalog", icon: BookOpen },
    { to: "/vendor/reports", label: "Reporting", short: "Reports", icon: LineChart },
  ],
  crm: [
    { to: "/crm", label: "Dashboard", short: "Home", icon: LayoutDashboard },
    { to: "/crm/planner", label: "Daily Planner", short: "Planner", icon: CalendarCheck },
    { to: "/crm/customers", label: "Customer Tracking", short: "Accounts", icon: Users },
    { to: "/crm/orders", label: "Orders", short: "Orders", icon: ClipboardList },
  ],
};

export function AppShell({ role, title, subtitle, actions, children }) {
  const { user, ready, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV[role] || [];

  useEffect(() => {
    if (ready && !user) navigate({ to: "/", replace: true });
  }, [ready, user, navigate]);

  const isActive = (to) =>
    to === ROLE_META[role]?.home ? pathname === to : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-5">
          <BrandMark />
          <p className="mt-3 text-xs font-semibold tracking-wide text-sidebar-primary">
            {ROLE_META[role]?.name}
          </p>
          <p className="text-xs text-sidebar-foreground/60">{ROLE_META[role]?.tagline}</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.to)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <PortalSwitcher current={role} />
          <div className="mt-3 flex items-center gap-3 rounded-md px-2 py-2">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary font-display text-sm font-bold text-sidebar-primary-foreground">
              {(user?.displayName ?? "L")
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.displayName ?? "Signed out"}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{user?.company}</p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-sidebar text-sidebar-foreground lg:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
            <div className="min-w-0">
              <BrandMark compact />
              <p className="truncate text-[11px] font-semibold text-sidebar-primary">
                {ROLE_META[role]?.name}
              </p>
            </div>
            <button
              onClick={() => {
                signOut();
                navigate({ to: "/" });
              }}
              aria-label="Sign out"
              className="grid size-9 shrink-0 place-items-center rounded-md bg-sidebar-accent"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </header>

        <main className="px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold sm:text-3xl">{title}</h1>
                {subtitle ? (
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
                ) : null}
              </div>
              {actions ? <div className="shrink-0">{actions}</div> : null}
            </div>
            <div className="mt-6 space-y-6">{children}</div>
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card lg:hidden">
        <ul className="flex">
          {items.map((item) => (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-semibold transition-colors",
                  isActive(item.to)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="size-5" />
                <span className="truncate">{item.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function PortalSwitcher({ current }) {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const roles = ["inventory", "vendor", "crm"];
  return (
    <div>
      <p className="px-2 text-[10px] font-bold tracking-[0.14em] text-sidebar-foreground/50 uppercase">
        Switch portal
      </p>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => {
              signIn(r);
              navigate({ to: ROLE_META[r].home });
            }}
            className={cn(
              "rounded-md px-1 py-1.5 text-[11px] font-semibold capitalize transition-colors",
              r === current
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "bg-sidebar-accent/60 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"
            )}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid size-7 place-items-center rounded-md bg-sidebar-primary font-display text-sm font-black text-sidebar-primary-foreground">
        L
      </span>
      <span
        className={cn(
          "font-display font-black tracking-tight",
          compact ? "text-base" : "text-lg"
        )}
      >
        LAVAANT
      </span>
    </div>
  );
}

export { Button };
