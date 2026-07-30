import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Phone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel, StatusPill, TableWrap, Td, Th } from "@/components/data-bits";
import { Button } from "@/components/ui/button";
import { usd, initialVendorCustomers } from "@/lib/mock-firebase";
import { useFirestoreCollection } from "@/lib/firebase-service";

export const Route = createFileRoute("/vendor/customers")({
  head: () => ({
    meta: [
      { title: "Customer Roster | Lavaant Vendor" },
      {
        name: "description",
        content:
          "Manage linked, verified construction customers — terms, open orders, and year-to-date revenue.",
      },
      { property: "og:title", content: "Customer Roster | Lavaant Vendor" },
      {
        property: "og:description",
        content: "Every linked account, verified and ready to order.",
      },
    ],
  }),
  component: CustomerRoster,
});

function CustomerRoster() {
  const { data: vendorCustomers } = useFirestoreCollection("vendorCustomers", initialVendorCustomers);

  return (
    <AppShell
      role="vendor"
      title="Customer roster"
      subtitle="Linked and verified Lavaant Inventory accounts"
      actions={<Button className="font-bold">Invite customer</Button>}
    >
      <div className="grid gap-3 lg:hidden">
        {vendorCustomers.map((c) => (
          <article key={c.id} className="surface p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold">{c.name}</h3>
                <p className="truncate text-xs text-muted-foreground">
                  {c.contact} · {c.phone}
                </p>
              </div>
              <StatusPill status={c.verified ? "Verified" : "Unverified"} />
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground">YTD</dt>
                <dd className="font-bold">{usd(c.ytd)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Open</dt>
                <dd className="font-bold">{c.openOrders}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Terms</dt>
                <dd className="font-bold">{c.terms}</dd>
              </div>
            </dl>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              <Phone className="mr-1 size-4" /> Call {c.contact ? c.contact.split(" ")[0] : "contact"}
            </Button>
          </article>
        ))}
      </div>

      <Panel className="hidden lg:block" title={`${vendorCustomers.length} linked customers`}>
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Primary contact</Th>
                <Th>Terms</Th>
                <Th className="text-right">Open orders</Th>
                <Th className="text-right">YTD revenue</Th>
                <Th>Last order</Th>
              </tr>
            </thead>
            <tbody>
              {vendorCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/50">
                  <Td>
                    <div className="flex items-center gap-2">
                      {c.verified ? (
                        <BadgeCheck className="size-4 shrink-0 text-success" aria-label="Verified" />
                      ) : null}
                      <span className="font-semibold">{c.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <p>{c.contact}</p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </Td>
                  <Td className="text-muted-foreground">{c.terms}</Td>
                  <Td className="text-right font-semibold">{c.openOrders}</Td>
                  <Td className="text-right font-bold">{usd(c.ytd)}</Td>
                  <Td className="text-muted-foreground">{c.lastOrder}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </AppShell>
  );
}
