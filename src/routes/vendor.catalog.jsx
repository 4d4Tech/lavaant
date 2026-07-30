import { createFileRoute } from "@tanstack/react-router";
import { FileText, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Panel, StatusPill } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { initialCatalog, usdCents } from "@/lib/mock-firebase";
import { useFirestoreCollection, getStorageAssetUrl } from "@/lib/firebase-service";

export const Route = createFileRoute("/vendor/catalog")({
  head: () => ({
    meta: [
      { title: "Digital Catalog | Lavaant Vendor" },
      {
        name: "description",
        content:
          "Publish products with pricing, spec sheets, and MSDS documents your construction customers can order from directly.",
      },
      { property: "og:title", content: "Digital Catalog | Lavaant Vendor" },
      {
        property: "og:description",
        content: "Products, spec sheets, and MSDS access in one shared catalog.",
      },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { data: catalog } = useFirestoreCollection("catalog", initialCatalog);

  const openDoc = async (label, path) => {
    toast.loading(`Fetching ${label} from Firebase Storage...`, { id: "storage" });
    const url = await getStorageAssetUrl(path);
    toast.success(`Firebase Storage ${label} resolved`, {
      id: "storage",
      description: url,
    });
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return (
    <AppShell
      role="vendor"
      title="Digital catalog"
      subtitle="What your customers see when they build a PO"
      actions={<Button className="font-bold">Add product</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {catalog.map((p) => (
          <article key={p.id} className="surface flex flex-col p-4 sm:p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="label-eyebrow truncate">{p.category}</p>
                <h3 className="mt-1 text-sm font-bold">{p.name}</h3>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{p.sku}</p>
              </div>
              <StatusPill status={p.stock} />
            </div>
            <p className="mt-4 font-display text-2xl font-black">
              {usdCents(p.price)}
              <span className="ml-1 text-sm font-semibold text-muted-foreground">/ {p.unit}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openDoc("Spec sheet", p.specSheet)}
              >
                <FileText className="mr-1 size-4" /> Spec sheet
              </Button>
              <Button variant="outline" size="sm" onClick={() => openDoc("MSDS", p.msds)}>
                <ShieldAlert className="mr-1 size-4" /> MSDS
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Panel title="Catalog health" description="Keep documents current for verified buyers">
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            ["Products published", String(catalog.length)],
            ["Spec sheets on file", String(catalog.length)],
            ["MSDS coverage", "100%"],
          ].map(([k, v]) => (
            <li key={k} className="rounded-lg bg-muted/60 px-3 py-3">
              <p className="label-eyebrow">{k}</p>
              <p className="mt-1 font-display text-xl font-black">{v}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </AppShell>
  );
}
