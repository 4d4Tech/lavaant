import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { initialInventoryItems, usdCents } from "@/lib/mock-firebase";
import { useFirestoreCollection } from "@/lib/firebase-service";

export const Route = createFileRoute("/inventory/items")({
  head: () => ({
    meta: [
      { title: "Custom Inventory List | Lavaant Inventory" },
      {
        name: "description",
        content:
          "A verified inventory list linked to specific suppliers, with par levels, on-hand counts, and yard locations.",
      },
      { property: "og:title", content: "Custom Inventory List | Lavaant Inventory" },
      {
        property: "og:description",
        content: "Verified items, supplier links, par levels, and where each item actually sits.",
      },
    ],
  }),
  component: InventoryList,
});

function InventoryList() {
  const { data: inventoryItems } = useFirestoreCollection("inventoryItems", initialInventoryItems);
  const [query, setQuery] = useState("");
  const [supplier, setSupplier] = useState("All suppliers");

  const suppliers = useMemo(
    () => ["All suppliers", ...new Set(inventoryItems.map((i) => i.supplier))],
    [inventoryItems]
  );

  const rows = inventoryItems.filter((i) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || (i.name && i.name.toLowerCase().includes(q)) || (i.sku && i.sku.toLowerCase().includes(q));
    const matchesSupplier = supplier === "All suppliers" || i.supplier === supplier;
    return matchesQuery && matchesSupplier;
  });

  return (
    <AppShell
      role="inventory"
      title="Custom inventory list"
      subtitle="Verified items linked to your approved suppliers"
      actions={
        <Button asChild className="font-bold">
          <Link to="/inventory/orders/new">Reorder</Link>
        </Button>
      }
    >
      <Panel bodyClassName="p-3 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative min-w-0">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search item or SKU"
              aria-label="Search inventory"
              className="w-full rounded-md border border-input bg-card py-2.5 pr-3 pl-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
            />
          </div>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            aria-label="Filter by supplier"
            className="rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            {suppliers.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </Panel>

      {/* Mobile cards */}
      <div className="grid gap-3 lg:hidden">
        {rows.map((i) => (
          <article key={i.id} className="surface p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-bold">{i.name}</h3>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{i.sku}</p>
              </div>
              <StatusPill status={i.verified ? "Verified" : "Unverified"} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
              <div>
                <dt className="text-muted-foreground">On hand</dt>
                <dd className="font-bold">
                  {i.onHand} {i.unit}{" "}
                  <span className="font-normal text-muted-foreground">/ par {i.par}</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Unit cost</dt>
                <dd className="font-bold">{usdCents(i.unitCost)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Supplier</dt>
                <dd className="truncate font-medium">{i.supplier}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Location</dt>
                <dd className="truncate font-medium">{i.location}</dd>
              </div>
            </dl>
            {Number(i.onHand) < Number(i.par) ? (
              <p className="mt-3 text-xs font-bold text-destructive">
                Below par — reorder {Number(i.par) - Number(i.onHand)} {i.unit}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <Panel className="hidden lg:block" title={`${rows.length} items`}>
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Item</Th>
                <Th>Supplier</Th>
                <Th className="text-right">On hand</Th>
                <Th className="text-right">Par</Th>
                <Th className="text-right">Unit cost</Th>
                <Th>Location</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.id} className="hover:bg-muted/50">
                  <Td>
                    <div className="flex items-center gap-2">
                      {i.verified ? (
                        <BadgeCheck className="size-4 shrink-0 text-success" aria-label="Verified" />
                      ) : null}
                      <div className="min-w-0">
                        <p className="font-semibold">{i.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">{i.sku}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-muted-foreground">{i.supplier}</Td>
                  <Td
                    className={`text-right font-bold ${Number(i.onHand) < Number(i.par) ? "text-destructive" : ""}`}
                  >
                    {i.onHand} {i.unit}
                  </Td>
                  <Td className="text-right text-muted-foreground">{i.par}</Td>
                  <Td className="text-right font-semibold">{usdCents(i.unitCost)}</Td>
                  <Td className="text-muted-foreground">{i.location}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </AppShell>
  );
}
