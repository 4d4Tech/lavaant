/**
 * Firebase Data Layer & Demo Defaults for Lavaant
 */

export const DEMO_USERS = {
  inventory: {
    uid: "uid_inv_001",
    displayName: "Marcus Hale",
    email: "superintendent@ridgelinebuilders.com",
    company: "Ridgeline Builders",
    role: "inventory",
  },
  vendor: {
    uid: "uid_ven_002",
    displayName: "Dana Whitfield",
    email: "sales@gulfcoastsupply.com",
    company: "Gulf Coast Industrial Supply",
    role: "vendor",
  },
  crm: {
    uid: "uid_crm_003",
    displayName: "Tyler Boone",
    email: "tboone@gulfcoastsupply.com",
    company: "Gulf Coast Industrial Supply",
    role: "crm",
  },
};

export const ROLE_META = {
  inventory: {
    name: "Lavaant Inventory",
    tagline: "For construction companies",
    home: "/inventory",
  },
  vendor: { name: "Lavaant Vendor", tagline: "For suppliers & distributors", home: "/vendor" },
  crm: { name: "Lavaant CRM", tagline: "For construction sales pros", home: "/crm" },
};

/* ---------------------------------- money --------------------------------- */

export const usd = (n) =>
  Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const usdCents = (n) =>
  Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });

/* ------------------------- collection: inventoryItems ---------------------- */

export const initialInventoryItems = [
  {
    id: "itm_01",
    sku: "EMT-075-10",
    name: '3/4" EMT Conduit — 10 ft',
    supplier: "Gulf Coast Industrial Supply",
    verified: true,
    onHand: 340,
    par: 250,
    unit: "ea",
    unitCost: 9.42,
    location: "Yard B — Rack 3",
  },
  {
    id: "itm_02",
    sku: "THHN-12-BLK",
    name: "#12 THHN Wire — Black (500 ft)",
    supplier: "Gulf Coast Industrial Supply",
    verified: true,
    onHand: 42,
    par: 60,
    unit: "spool",
    unitCost: 78.5,
    location: "Stock Room A",
  },
  {
    id: "itm_03",
    sku: "ANCH-38-WEDGE",
    name: '3/8" Wedge Anchors (Box of 50)',
    supplier: "Delta Fastener Co.",
    verified: true,
    onHand: 18,
    par: 40,
    unit: "box",
    unitCost: 46.0,
    location: "Stock Room A",
  },
  {
    id: "itm_04",
    sku: "SIL-CAUL-WHT",
    name: "Silicone Caulk — White",
    supplier: "Delta Fastener Co.",
    verified: false,
    onHand: 96,
    par: 72,
    unit: "tube",
    unitCost: 6.85,
    location: "Gang Box 12",
  },
  {
    id: "itm_05",
    sku: "STRUT-15-10",
    name: '1-5/8" Strut Channel — 10 ft',
    supplier: "Ironline Steel",
    verified: true,
    onHand: 74,
    par: 90,
    unit: "ea",
    unitCost: 21.3,
    location: "Lay-Down Yard",
  },
  {
    id: "itm_06",
    sku: "GLV-CUT-A4",
    name: "Cut-Resistant Gloves A4 (L)",
    supplier: "Sentry Safety Group",
    verified: true,
    onHand: 210,
    par: 120,
    unit: "pair",
    unitCost: 8.15,
    location: "Trailer 2",
  },
];

/* ---------------------------- collection: orders -------------------------- */

export const initialOrders = [
  {
    id: "ord_01",
    po: "PO-10428",
    vendor: "Gulf Coast Industrial Supply",
    customer: "Ridgeline Builders",
    requestedBy: "Marcus Hale",
    shipTo: "Northgate Medical — Gate 4",
    job: "Northgate Medical Tower",
    total: 12480,
    lines: 9,
    status: "Shipped",
    placedAt: "Jul 27",
    needBy: "Aug 03",
  },
  {
    id: "ord_02",
    po: "PO-10427",
    vendor: "Delta Fastener Co.",
    customer: "Ridgeline Builders",
    requestedBy: "Angela Ruiz",
    shipTo: "Yard B — Lay-Down",
    job: "Harborview Phase 2",
    total: 3260,
    lines: 4,
    status: "Acknowledged",
    placedAt: "Jul 26",
    needBy: "Jul 31",
  },
  {
    id: "ord_03",
    po: "PO-10426",
    vendor: "Ironline Steel",
    customer: "Ridgeline Builders",
    requestedBy: "Marcus Hale",
    shipTo: "Harborview — Dock 1",
    job: "Harborview Phase 2",
    total: 28115,
    lines: 14,
    status: "Submitted",
    placedAt: "Jul 25",
    needBy: "Aug 08",
  },
  {
    id: "ord_04",
    po: "PO-10425",
    vendor: "Sentry Safety Group",
    customer: "Ridgeline Builders",
    requestedBy: "Devin Cross",
    shipTo: "Trailer 2 — Northgate",
    job: "Northgate Medical Tower",
    total: 1845,
    lines: 6,
    status: "Received",
    placedAt: "Jul 22",
    needBy: "Jul 26",
  },
  {
    id: "ord_05",
    po: "PO-10424",
    vendor: "Gulf Coast Industrial Supply",
    customer: "Ridgeline Builders",
    requestedBy: "Angela Ruiz",
    shipTo: "Stock Room A",
    job: "Service & Small Works",
    total: 940,
    lines: 3,
    status: "Received",
    placedAt: "Jul 21",
    needBy: "Jul 24",
  },
];

/* --------------------- collection: vendor inbox / roster ------------------ */

export const initialVendorInbox = [
  {
    id: "vo_01",
    po: "PO-10431",
    customer: "Ridgeline Builders",
    contact: "Marcus Hale",
    total: 8420,
    lines: 7,
    needBy: "Aug 04",
    received: "12 min ago",
    status: "Submitted",
  },
  {
    id: "vo_02",
    po: "PO-88120",
    customer: "Trestle Mechanical",
    contact: "Priya Nandan",
    total: 21980,
    lines: 18,
    needBy: "Aug 06",
    received: "1 hr ago",
    status: "Submitted",
  },
  {
    id: "vo_03",
    po: "PO-4471",
    customer: "Copperhead Electric",
    contact: "Luis Arredondo",
    total: 5310,
    lines: 5,
    needBy: "Jul 31",
    received: "3 hrs ago",
    status: "Acknowledged",
  },
  {
    id: "vo_04",
    po: "PO-10428",
    customer: "Ridgeline Builders",
    contact: "Marcus Hale",
    total: 12480,
    lines: 9,
    needBy: "Aug 03",
    received: "Yesterday",
    status: "Shipped",
  },
  {
    id: "vo_05",
    po: "PO-2290",
    customer: "Basin Concrete Group",
    contact: "Sam Ottley",
    total: 3075,
    lines: 4,
    needBy: "Jul 30",
    received: "Yesterday",
    status: "Received",
  },
];

export const initialVendorCustomers = [
  {
    id: "vc_01",
    name: "Ridgeline Builders",
    contact: "Marcus Hale",
    phone: "(281) 555-0114",
    verified: true,
    ytd: 418500,
    openOrders: 3,
    terms: "Net 30",
    lastOrder: "Today",
  },
  {
    id: "vc_02",
    name: "Trestle Mechanical",
    contact: "Priya Nandan",
    phone: "(713) 555-0182",
    verified: true,
    ytd: 265900,
    openOrders: 2,
    terms: "Net 30",
    lastOrder: "1 hr ago",
  },
  {
    id: "vc_03",
    name: "Copperhead Electric",
    contact: "Luis Arredondo",
    phone: "(409) 555-0143",
    verified: true,
    ytd: 197300,
    openOrders: 1,
    terms: "Net 45",
    lastOrder: "3 hrs ago",
  },
  {
    id: "vc_04",
    name: "Basin Concrete Group",
    contact: "Sam Ottley",
    phone: "(832) 555-0176",
    verified: false,
    ytd: 88400,
    openOrders: 0,
    terms: "COD",
    lastOrder: "Yesterday",
  },
];

export const initialCatalog = [
  {
    id: "cp_01",
    sku: "EMT-075-10",
    name: '3/4" EMT Conduit — 10 ft',
    category: "Raceway",
    price: 9.42,
    unit: "ea",
    stock: "In stock",
    specSheet: "storage://specs/emt-075.pdf",
    msds: "storage://msds/emt-075.pdf",
  },
  {
    id: "cp_02",
    sku: "THHN-12-BLK",
    name: "#12 THHN Wire — Black (500 ft)",
    category: "Wire & Cable",
    price: 78.5,
    unit: "spool",
    stock: "Low",
    specSheet: "storage://specs/thhn-12.pdf",
    msds: "storage://msds/thhn-12.pdf",
  },
  {
    id: "cp_03",
    sku: "SIL-CAUL-WHT",
    name: "Silicone Caulk — White",
    category: "Chemicals",
    price: 6.85,
    unit: "tube",
    stock: "In stock",
    specSheet: "storage://specs/silicone.pdf",
    msds: "storage://msds/silicone.pdf",
  },
  {
    id: "cp_04",
    sku: "STRUT-15-10",
    name: '1-5/8" Strut Channel — 10 ft',
    category: "Supports",
    price: 21.3,
    unit: "ea",
    stock: "Backordered",
    specSheet: "storage://specs/strut.pdf",
    msds: "storage://msds/strut.pdf",
  },
  {
    id: "cp_05",
    sku: "GLV-CUT-A4",
    name: "Cut-Resistant Gloves A4 (L)",
    category: "Safety",
    price: 8.15,
    unit: "pair",
    stock: "In stock",
    specSheet: "storage://specs/gloves-a4.pdf",
    msds: "storage://msds/gloves-a4.pdf",
  },
];

/* --------------------------- collection: crm ------------------------------ */

export const initialPlannerStops = [
  {
    id: "ps_01",
    time: "7:00 AM",
    customer: "Ridgeline Builders",
    contact: "Marcus Hale",
    address: "Northgate Medical Tower — Gate 4",
    purpose: "Drop donuts, walk the deck, confirm PO-10431",
    type: "Stop",
    done: true,
  },
  {
    id: "ps_02",
    time: "8:45 AM",
    customer: "Copperhead Electric",
    contact: "Luis Arredondo",
    address: "1420 Wharf Rd, Bay 3",
    purpose: "Quote due today — strut + anchors takeoff",
    type: "Quote",
    done: true,
  },
  {
    id: "ps_03",
    time: "10:30 AM",
    customer: "Trestle Mechanical",
    contact: "Priya Nandan",
    address: "Harborview Phase 2 — Dock 1",
    purpose: "Hot-shot delivery of #12 THHN, get signature",
    type: "Delivery",
    done: false,
  },
  {
    id: "ps_04",
    time: "12:00 PM",
    customer: "Basin Concrete Group",
    contact: "Sam Ottley",
    address: "Taqueria El Norte (his favorite)",
    purpose: "Lunch — pitch verified inventory list onboarding",
    type: "Stop",
    done: false,
  },
  {
    id: "ps_05",
    time: "2:15 PM",
    customer: "Ridgeline Builders",
    contact: "Angela Ruiz",
    address: "Purchasing office, 2nd floor",
    purpose: "Review par levels, set up auto-reorder",
    type: "Call",
    done: false,
  },
];

export const initialCrmCustomers = [
  {
    id: "cc_01",
    name: "Ridgeline Builders",
    contact: "Marcus Hale",
    title: "Superintendent",
    phone: "(281) 555-0114",
    lastVisit: "Today, 7:00 AM",
    nextVisit: "Aug 03",
    quoteDeadline: null,
    ytd: 418500,
    preferences: "Black coffee, no cream. Kolaches beat donuts. Text, never email.",
    temp: "Hot",
  },
  {
    id: "cc_02",
    name: "Copperhead Electric",
    contact: "Luis Arredondo",
    title: "Purchasing Agent",
    phone: "(409) 555-0143",
    lastVisit: "Today, 8:45 AM",
    nextVisit: "Jul 31",
    quoteDeadline: "Today, 5:00 PM",
    ytd: 197300,
    preferences: "Astros fan. Prefers PDFs with line-item pricing broken out.",
    temp: "Hot",
  },
  {
    id: "cc_03",
    name: "Trestle Mechanical",
    contact: "Priya Nandan",
    title: "Project Manager",
    phone: "(713) 555-0182",
    lastVisit: "Jul 24",
    nextVisit: "Today, 10:30 AM",
    quoteDeadline: "Aug 01",
    ytd: 265900,
    preferences: "Early riser — on site by 6. Loves the breakfast tacos on Navigation.",
    temp: "Warm",
  },
  {
    id: "cc_04",
    name: "Basin Concrete Group",
    contact: "Sam Ottley",
    title: "Owner",
    phone: "(832) 555-0176",
    lastVisit: "Jul 18",
    nextVisit: "Today, 12:00 PM",
    quoteDeadline: null,
    ytd: 88400,
    preferences: "Taqueria El Norte. Still on paper POs — prime Lavaant candidate.",
    temp: "Warm",
  },
];

/* ---------------------------- charts / rollups ---------------------------- */

export const budgetVsActual = [
  { month: "Feb", budget: 62000, actual: 58400 },
  { month: "Mar", budget: 68000, actual: 71200 },
  { month: "Apr", budget: 74000, actual: 69800 },
  { month: "May", budget: 81000, actual: 84600 },
  { month: "Jun", budget: 86000, actual: 79300 },
  { month: "Jul", budget: 92000, actual: 88150 },
];

export const forecast = [
  { month: "Aug", spend: 95000 },
  { month: "Sep", spend: 102000 },
  { month: "Oct", spend: 98500 },
  { month: "Nov", spend: 88000 },
];

export const spendByJob = [
  { job: "Northgate Medical Tower", spend: 214800 },
  { job: "Harborview Phase 2", spend: 168300 },
  { job: "Eastline Warehouse", spend: 96400 },
  { job: "Service & Small Works", spend: 41200 },
];

export const spendByPerson = [
  { person: "Marcus Hale", role: "Superintendent", orders: 38, spend: 246300 },
  { person: "Angela Ruiz", role: "Purchasing Agent", orders: 52, spend: 198700 },
  { person: "Devin Cross", role: "Foreman", orders: 21, spend: 62400 },
  { person: "Hannah Pike", role: "Foreman", orders: 14, spend: 33800 },
];

export const shipToBreakdown = [
  { location: "Northgate — Gate 4", orders: 41, spend: 152400 },
  { location: "Harborview — Dock 1", orders: 28, spend: 131900 },
  { location: "Yard B — Lay-Down", orders: 19, spend: 74600 },
  { location: "Stock Room A", orders: 24, spend: 48200 },
];

export const vendorSalesTrend = [
  { month: "Feb", sales: 121000 },
  { month: "Mar", sales: 138500 },
  { month: "Apr", sales: 129800 },
  { month: "May", sales: 156200 },
  { month: "Jun", sales: 149400 },
  { month: "Jul", sales: 171900 },
];
