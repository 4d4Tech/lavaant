Github repo: https://github.com/4d4Tech/lavaant.git

**Project Overview & Core Philosophy**
Build a modern, sleek, and professional web application template for "Lavaant," a multi-portal SaaS platform designed specifically for the construction and industrial markets. The construction industry is heavily underserved by technology, often relying on antiquated paper Purchase Order books, carbon copies, and fragmented communication. Lavaant eliminates this friction. The guiding philosophy of the app is: "Inventory is just MONEY laying around that doesn't look like dollar bills". The goal is to turn stagnant inventory into visible, trackable digital assets.

**Tech Stack Requirements**
The template must be scaffolded using the following technologies:

* Frontend: React.JS using vanilla JavaScript and vanilla CSS.


* Backend Ecosystem (Mocked for now, structured for future integration): Google Firebase Product Suite.


* Services to account for in state management: Firebase Functions (headless), Firebase Firestore (database), Firebase Storage, Firebase Authentication, and Firebase Hosting.



**Design System & UI/UX Guidelines**

* **Aesthetic:** Modern, sleek, professional, and highly trustworthy. Use a clean color palette (e.g., deep slate blues, stark whites, and high-contrast accent colors for calls-to-action).
* **Responsiveness:** A mobile-first approach is mandatory. The app must function seamlessly in the field, at the stock room, and in the lay-down yard. Use responsive CSS grids and flexbox.


* **Typography:** Professional, highly readable sans-serif fonts suitable for data-heavy dashboards.
* **Navigation:** A persistent, intuitive sidebar or bottom tab bar (on mobile) that adapts based on the user's role.

**Core Application Architecture (Role-Based Access)**
The application requires three distinct portals based on user roles, operating from a centralized database concept. Scaffold the routing and layout wrappers for these three experiences:

**1. Lavaant Inventory (For Construction Companies)**
This portal is for small to medium-sized construction companies (Superintendents or Purchasing Agents) to track purchases and manage inventory.

* 
**Dashboard:** A high-level view showing forecasting, budget vs. actuals, and recent orders.


* 
**Custom Inventory List:** A verified view of inventory items linked to specific suppliers.


* 
**Order Creation:** A digital Purchase Order generator to order directly from vendors.


* 
**Tracking View:** Detailed reporting of purchases by item, person, and ship-to location.



**2. Lavaant Vendor (For Suppliers/Sales Professionals)**
This portal allows vendors to receive orders from customers who use Lavaant Inventory.

* 
**Order Inbox:** A unified, real-time interface for receiving digital orders directly from construction customers.


* 
**Customer Roster:** A list of linked, verified customers to manage relationships.


* 
**Digital Catalog View:** A space to display products, spec sheets, and MSDS sheet access.


* 
**Reporting:** Customer-based reporting to track sales trends.



**3. Lavaant CRM (For Sales Professionals)**
An inclusive, all-in-one suite specifically designed for construction sales pros.

* 
**Daily Planner:** A specialized tool to plan the day, organize tasks, and increase in-person stops.


* 
**Customer Tracking:** Detailed logs knowing who customers are, visit history, next required visit, quote deadlines, and personal preferences (e.g., where they like to eat).


* 
**Order Integration:** Seamlessly take and track customer orders directly within the CRM.



**Deliverables for this Scaffold**

* Create a global authentication login screen routing users to the correct portal based on role (Inventory, Vendor, or CRM).
* Build the primary dashboard views for all three roles using placeholder data.
* Implement the "Daily Planner" UI for the CRM role.
* Implement the "Digital Purchase Order" creation flow for the Inventory role.
* Ensure all data tables and lists are mobile-responsive and easily scannable.

---
