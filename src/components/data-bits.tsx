import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("surface overflow-hidden", className)}>
      {title ? (
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold sm:text-base">{title}</h2>
            {description ? (
              <p className="truncate text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </header>
      ) : null}
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  delta,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  tone?: "default" | "accent" | "success" | "destructive";
}) {
  return (
    <div className="surface p-4 sm:p-5">
      <p className="label-eyebrow truncate">{label}</p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl",
          tone === "accent" && "text-accent",
          tone === "success" && "text-success",
          tone === "destructive" && "text-destructive",
        )}
      >
        {value}
      </p>
      {delta ? <p className="mt-1 text-xs font-semibold text-success">{delta}</p> : null}
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const STATUS_TONE: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Submitted: "bg-accent/20 text-accent-foreground",
  Acknowledged: "bg-primary/10 text-primary",
  Shipped: "bg-primary/15 text-primary",
  Received: "bg-success/15 text-success",
  Verified: "bg-success/15 text-success",
  Unverified: "bg-muted text-muted-foreground",
  Low: "bg-destructive/12 text-destructive",
  "In stock": "bg-success/15 text-success",
  Backordered: "bg-destructive/12 text-destructive",
  Hot: "bg-destructive/12 text-destructive",
  Warm: "bg-accent/20 text-accent-foreground",
  Cold: "bg-muted text-muted-foreground",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap",
        STATUS_TONE[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

/** Scrollable table wrapper: horizontal scroll on mobile, never clipped text. */
export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto sm:-mx-5">
      <div className="min-w-[640px] px-4 sm:px-5">{children}</div>
    </div>
  );
}

export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "border-b border-border px-3 py-2 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn("border-b border-border/70 px-3 py-3 text-sm align-middle", className)}>
      {children}
    </td>
  );
}
