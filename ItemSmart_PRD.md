# PRD for ItemSmart

**PRD Title:** Product Requirements Document for ItemSmart  
**Document Version:** 2.0  
**Last Updated:** February 2026  

---

## Author & Sign-Off

| Role | Name | Sign-Off |
|------|------|----------|
| **Product Manager** | _[To be assigned]_ | |
| **Engineering Lead / Team Lead** | _[To be assigned]_ | |
| **Designer** | _[To be assigned]_ | |
| **Approvers / Sign-Off** | _[To be assigned]_ | |

**PM Epic:** [MTP Project – Jira Software](https://impactanalytics.atlassian.net/jira/software/c/projects/MTP/summary)  

**Status of PRD:** Backlog / In Progress  

**Related Documentation:**  
- [Data Flow in ItemSmart](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1090716817)  
- [ItemSmart Integration (Confluence)](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1250066535)  
- [ItemSmart Aggregation & Disaggregation Logic](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1081376882)  

---

# One Pager for ItemSmart

## Overview

ItemSmart is an **SKU-level sales planning tool** within the Impact Analytics (IA) Smart Platform. It gives planners a single place to view past, present, and future demand; apply forecast and planning metrics (e.g. WOS, ST%); and use receipt recommendations to support buy placement. The product serves retailers who plan at item/week level (bottom-up, pre-season) and need consistency across hierarchy levels (SKU, class, department) and time (week, month), with clear handoff to Ordering, OMS, AssortSmart, and PlanSmart.

The vision for ItemSmart is to be the **default planning workspace** for item planners: they land in ItemSmart from the IA platform, see the right data for their role, edit KPIs with predictable aggregation and disaggregation, and rely on integrated flows to and from other MTP products (Ordering, AssortSmart, PlanSmart) and, where applicable, client PIM systems (e.g. Arhaus).

*Note: This PRD describes the product vision and scope for ItemSmart. Specific release milestones and priorities will be agreed with Engineering and Design and tracked in the PM Epic and related Jira stories.*

## Objectives

1. **Be the primary item-planning workspace** — Planners open ItemSmart from the IA Smart Platform and reach their planning context (filters, product groups, last location) with minimal steps.
2. **Keep plan data consistent across levels** — Edits at any level (SKU/class/department; week/month) propagate correctly via defined editable flows, aggregation, and disaggregation so that totals and details always align.
3. **Support ecosystem integration** — Clear, documented data flows and cadence for Ordering ↔ ItemSmart, ItemSmart → AssortSmart, and ItemSmart → PlanSmart so that clients can run combined workflows (e.g. PlanSmart + ItemSmart, or PlanSmart + AssortSmart + ItemSmart/OMS as with Carter’s).
4. **Enable proactive management** — Dashboards, filters, KPI cards, product groups, and alert groups help planners focus on the right items and act on exceptions (e.g. low inventory, KPI deviations) in a timely way.

## GTM Approach

ItemSmart is part of the broader IA Smart Platform and MTP. GTM will emphasize:

- **Unified platform entry** — Users discover and access ItemSmart from the IA Smart Platform homepage with clear navigation and role-based access.
- **Value for item planners** — Messaging focuses on one place for forecast, plan, and receipt recommendations; controlled edits with automatic roll-up/roll-down; and handoff to ordering and assortment.
- **Integration story** — For clients using multiple MTP products, positioning ItemSmart as the item-planning hub that feeds and is fed by Ordering, AssortSmart, and PlanSmart with defined requirements, level, and cadence.

## Success Metrics

| Metric | Description | Target (TBD) |
|--------|-------------|--------------|
| **Time to planning view** | From IA login to useful ItemSmart view (e.g. filtered dashboard or grid) | _TBD_ |
| **Edit consistency** | % of edit sessions where aggregation/disaggregation matches spec (no data integrity bugs) | _TBD_ |
| **Integration reliability** | Success rate / latency for Ordering ↔ ItemSmart and ItemSmart → downstream sync | _TBD_ |
| **Planner adoption** | Active ItemSmart users (e.g. weekly) as % of licensed planners | _TBD_ |

*Metrics will be refined with Product, Engineering, and client teams as part of release planning.*

---

# Scenarios

The following scenarios describe how different users interact with ItemSmart in real workflows. They inform prioritization and acceptance criteria for the features listed later.

---

## Scenario 1: Planner lands in ItemSmart and starts weekly planning

**Priya** is an item planner. She logs into the IA Smart Platform with her email and password. After authentication, she sees the platform homepage with clear navigation. She clicks the ItemSmart entry point (link or tile). The app opens without unnecessary redirects, and because the system remembers her last location, she returns to the same planning view she was in yesterday—e.g. a department-level grid for “Women’s Apparel” with a specific time range and channel.

She applies saved filter settings (e.g. “Q1 FY26 – Full Price – E‑comm”) so the dashboard and grid show only the data she cares about. KPI cards at the top reflect the same filters and show her at-a-glance metrics (e.g. W Sls $, W Sls U, forecast accuracy). One card is red against target; she clicks through to the underlying report to investigate. She then goes into the planning grid, edits Weekly Sales $ at the month level for a class, and sees the system disaggregate the change to weeks proportionally and update dependent KPIs (e.g. AUR, Receipts). She reviews the preview, then clicks Update so changes persist. When she leaves ItemSmart and comes back later, she is again on the same view so she can continue without re-applying filters or navigating from scratch.

*This scenario drives requirements for: authentication, navigation, “remember last location,” dashboard filters, saved filters, KPI cards with drill-down, and KPI edit with aggregation/disaggregation and persist.*

---

## Scenario 2: DPM reviews performance using product groups and alerts

**Marcus** is a Demand Planning Manager. He uses ItemSmart to review performance and exceptions rather than to edit every SKU. He opens ItemSmart from the IA platform and goes to the dashboard. He has configured product groups (e.g. “High velocity – Core,” “New launches,” “Markdown candidates”) based on criteria like product type, brand, and sales velocity. He toggles visibility so only “High velocity – Core” and “New launches” are visible, and he uses the product group table to see aggregated KPIs per group. He drills into one group to see the detailed SKU list and associated metrics.

He has also set up alert groups (e.g. “Inventory Alerts,” “Sales Performance”) with thresholds and severity. When inventory for a key SKU drops below his threshold, he gets an in-dashboard notification (and optionally email). He opens the alert, jumps to the relevant grid or report, and either adjusts the plan or delegates to a planner. He uses the same dashboard and filters on his tablet when he is in a meeting, and the layout remains usable and accessible.

*This scenario drives requirements for: product groups (create, criteria, visibility, analytics, drill to SKU list), alert groups (create, conditions, severity, notifications), and responsive/accessible dashboard.*

---

## Scenario 3: Planning team edits at different levels and uses row lock

**The planning team** works on the same assortment but at different granularities. One planner edits at class/month level; another fine-tunes at SKU/week. When the class/month value is edited, the system disaggregates to SKU/week using each week’s contribution to the month so that class and SKU totals stay aligned. When a planner edits at SKU/week, the system aggregates back up so class and department totals update.

For a subset of rows that are already agreed with Merchandising, the team locks those rows. Once locked, the row values are not editable, and when someone edits a higher-level subtotal (e.g. department month), the system redistributes the change only across *unlocked* rows so that locked assumptions are never overwritten. The grid clearly shows which rows are locked (e.g. lock icon, distinct styling). This keeps data integrity and avoids accidental overwrites during collaborative planning.

*This scenario drives requirements for: aggregation/disaggregation (both directions), editable flow logic, row lock (visual control, uneditable locked rows, redistribution only to unlocked rows), and clear lock state in the UI.*

---

## Scenario 4: Hard Kit (HKT) planner edits master and components stay in sync

**Jordan** plans Hard Kits (e.g. gift sets) where one HKT SKU is made of multiple component SKUs. When Jordan edits the HKT’s Weekly Sales $ in ItemSmart, the system prorates the new value to each component based on that component’s share of the total HKT AUC (e.g. 60% / 40%), then runs the standard editable flow for each component. When Jordan edits Weekly Sales Units on the HKT, the same unit value is replicated to all components (e.g. 20 → 15 units on HKT means 15 units on each component), and dependent KPIs are updated via the editable flow. Discount %, Inv Adjusted Units, and On Order Unplaced receipt units also replicate from HKT to components; Inv Adjusted $ and AIR use the same AUC-based proration as Sales $. Jordan can rely on the fact that HKT and component numbers stay consistent without manual component-level edits.

*This scenario drives requirements for: Hard Kit editing rules (prorate by AUC vs replicate, per KPI) and application of the standard editable flow after HKT→component distribution.*

---

## Scenario 5: Item facts stay in sync with client PIM (e.g. Arhaus)

**The client (Arhaus)** sends a daily data feed of item facts from their PIM. For **new items**, ItemSmart has no prior version; the ingestion process applies the feed and updates item facts and any dependent KPIs during the daily refresh. For **existing items** that no one has edited in ItemSmart, the PIM remains the source of truth: the daily feed updates item facts and KPIs as usual.

For **existing items** where a planner has already edited an item fact in ItemSmart (e.g. cost or lead time), ItemSmart treats that edited value as the source of truth. Incoming feed values for that same item fact (or that item fact × week for time-phased facts) are ignored so planner overrides are never overwritten. The system produces a **daily deviation report** (e.g. via Bitbucket or configured channel) listing all item facts edited in ItemSmart for active/markdown items. Arhaus uses this report to update their PIM so both systems stay aligned. If the feed and ItemSmart ever disagree, the system handles the conflict by keeping ItemSmart’s edited value and surfacing it in the deviation report.

*This scenario drives requirements for: PIM sync (new vs existing, edited vs unedited), source-of-truth rules, daily deviation report, and conflict handling.*

---

## Scenario 6: Data flows to and from Ordering, AssortSmart, and PlanSmart

**The client** uses ItemSmart for core item planning and also Ordering (for recommendations), AssortSmart (for assortment), and PlanSmart (for assortment plan and PO-level inputs). Requirements and technical design define:

- **Ordering → ItemSmart:** What data and KPIs flow from Ordering into ItemSmart; the flow (e.g. CDC/outbox, events); cadence; and format so ItemSmart has up-to-date order/recommendation context.
- **ItemSmart → Ordering:** What plan and receipt data ItemSmart sends to Ordering; format and cadence so Ordering can consume ItemSmart output.
- **ItemSmart → AssortSmart:** What data flows to Assort; logic (e.g. level, filters); and cadence.
- **ItemSmart → PlanSmart:** What data flows to PlanSmart; at what level (e.g. item/week, class/month); and cadence so PlanSmart can use ItemSmart plans in its processes.

Implementation follows the agreed Technical Design Documents (e.g. Ordering ↔ ItemSmart sync). Until those are fully defined, the product requirement is that **requirements, flow, cadence, and format are documented and implemented** for each integration so that multi-product clients get a consistent, supportable workflow.

*This scenario drives requirements for: integration stories MTP-128037, MTP-128036, MTP-128018, MTP-128010 and linkage to TDDs.*

---

## Scenario 7: Planner uses data versions (IAF, LY, LLY, WP, Actual) as designed

**Sam** understands that ItemSmart shows different “versions” of data. **IAF** is the forecast-driven demand (e.g. from 8 weeks before launch to 26 weeks past exit or 18 months); it’s filtered by baseline discount and refreshed weekly or daily. **LY** and **LLY** are historical (e.g. 1y+9m and 2y+9m from current week); they’re read-only in the tool and refreshed weekly for full weeks. **Actual** is past actuals (e.g. 9 months prior to current week); when Sam selects an actualized period, he sees actuals in the grid (non-editable), and for completed full weeks the system can replace WP with actuals so history is clean. **WP** (working plan) is where he edits: seeded from IAF, updated only by seeding, Match With, or his manual edits. Weekly refresh does not overwrite WP; only actualization replaces WP for completed weeks. Receipt recommendations are calculated from the plan (e.g. on the fly from WP). Sam can rely on this behavior so that his edits are never lost to a background refresh and so that IAF/LY/LLY/Actual remain consistent for comparison and reporting.

*This scenario drives requirements for: data flow and version behavior (IAF, LY, LLY, WP, Actual) as documented in Confluence “Data Flow in ItemSmart.”*

---

# Features In

**[M]** = Minimum viable experience for the current roadmap scope.  
*(Many of these features have detailed process and acceptance criteria in the sections below and in linked Jira stories. This list gives a high-level view; prioritization within each category should align with the PM Epic and sprint planning.)*

---

## Authentication & Access

- [M] Secure authentication using email and password; verification against stored credentials; secure transmission and storage (MTP-50997).
- [M] Session management: session remains active until logout or configurable inactivity timeout.
- [M] Clear feedback on login failure without revealing whether email or password was wrong.
- [M] Password reset via verified email link.
- [M] Role-based access control: users see only features and data allowed for their role.

## Navigation & Entry

- [M] Direct access to ItemSmart from the IA Smart Platform homepage via a clearly labeled link or button (MTP-50998).
- [M] Minimal load time and no unnecessary redirects when opening ItemSmart.
- [M] Remember last location: when the user returns to ItemSmart, restore the last page/context.
- Intuitive icons and tooltips for the ItemSmart entry point.
- Navigation accessible and responsive across supported devices and screen sizes.

## Dashboard & Filters

- [M] Customizable dashboard filters: time period, product category, department, KPI-related dimensions (MTP-50999).
- [M] Real-time dashboard updates when filters are applied or changed.
- [M] Multi-select within filter categories (e.g. multiple departments) with aggregated data.
- Save filter configurations for future sessions; reload saved filter sets.
- Clear-all-filters action to return to default dashboard view.
- Intuitive filter UI (e.g. dropdowns, checkboxes, toggles); accessible and responsive.

## KPI Cards & At-a-Glance Insights

- [M] Configurable KPI cards: users select which KPIs appear on the dashboard (MTP-51000).
- [M] Data in KPI cards updated in real time or on a defined schedule.
- Customizable layout: arrange, add, or remove KPI cards.
- Tooltips and drill-down from a card to detailed reports or analysis.
- Visual indicators (e.g. color) for performance vs target (e.g. on target / below target).
- KPI cards accessible and responsive across devices.

## Product Groups

- [M] Create and edit product groups with configurable criteria (e.g. product type, brand, sales velocity, inventory status) (MTP-51001, MTP-51031).
- [M] View SKUs for a hierarchy and reference period as product groups with associated KPIs; drill from product group table to detailed SKU list.
- Add or remove products from a group; change group name and criteria.
- Organize and prioritize product groups (e.g. drag-and-drop) for display.
- Integrate product groups with dashboard filters (filter view by selected group(s)).
- Toggle visibility of product groups on the dashboard.
- Aggregated analytics per product group (e.g. total sales, inventory, KPIs).
- Product groups management accessible and responsive.

## Alert Groups & Proactive Management

- [M] Create custom alerts based on configurable conditions (e.g. inventory thresholds, sales trends, KPI deviations) (MTP-51003).
- Group alerts by category (e.g. Inventory Alerts, Sales Performance, Planning Milestones).
- Real-time in-dashboard notifications; optional email or mobile notifications.
- Assign severity levels (e.g. Low, Medium, High) to alerts.
- Configure parameters per alert (thresholds, time frames, target metrics).
- Full alert management: create, edit, disable, delete; filter and sort active alerts.
- Alert Group Table shows groups and KPIs per pre-determined criteria (MTP-51062).
- Documentation or in-app help for configuring and using alert groups.

## KPI Editing & Dependent Updates

- [M] Edit these KPIs: W Sls $, W Sls U, W DR%, OO U (TTL-UP), Net Inv Adj U; system updates dependent KPIs per predefined formulas and editable flow (MTP-51032).
- [M] Updates reflect across SKU, Class, and Department; editable flow logic applied in the specified order.
- Preview changes before save; undo, redo, or reset edits.
- Warn on unsaved changes; options to continue editing, discard, or save.
- On user confirm (e.g. Update button), call update API and persist changes to all affected levels.

## Aggregation & Disaggregation

- [M] When a higher-level KPI (e.g. month) is edited, disaggregate to lower levels (e.g. week) proportionally (e.g. by lower-level contribution) (MTP-51033, MTP-51052).
- [M] When a lower-level KPI is edited, aggregate to higher levels (e.g. W Sls $ = sum(lower); W AUR = W Sls $ / W Sls U; W DR% from AIR/AUR as specified).
- Disaggregation order: Product hierarchy → Channel → Time (down to SKU-week-channel).
- Handle edge case where higher-level value is zero (e.g. distribute equally to lower levels).
- Option to lock higher- or lower-level numbers to prevent automatic scaling (lock/hold).
- All updates reflected in the UI immediately for visible levels; persisted when user confirms.

## Hard Kit (HKT) Editing

- [M] When W/D Sls $ or AIR is edited on HKT, prorate to components by % contribution of component AUC to total HKT AUC; then apply editable flow (MTP-51050, MTP-51051).
- [M] When W/D Sls U, Discount %, Inv Adjusted Units, or On Order Unplaced receipt units are edited on HKT, replicate same value to all components; then apply editable flow.
- When Inv Adjusted $ is edited on HKT, split to components by AUC proportion; then apply editable flow.

## Data Flow & Versions (IAF, LY, LLY, WP, Actual)

- [M] IAF: generation and refresh per defined rules (SKU selection, horizon, baseline discount); weekly/daily refresh as configured; no WP edits copied back to IAF (per Confluence Data Flow).
- [M] WP: seeded from IAF; updated only by seeding, Match With, or manual edits; receipt calculated as specified; weekly refresh does not overwrite WP.
- [M] Actualized weeks: for completed full weeks, actuals replace WP in UI (and optionally in DB); actuals non-editable.
- LY/LLY: read-only in tool; weekly refresh for full weeks only.
- All date logic follows Gregorian calendar.

## Item Facts & PIM Sync (e.g. Arhaus)

- [M] New items: item facts from PIM daily feed; ingestion updates ItemSmart and KPIs (MTP-51042).
- [M] Existing items, no ItemSmart edit: PIM feed continues to update item facts and KPIs.
- [M] Existing items, edited in ItemSmart: ItemSmart is source of truth for edited facts; feed updates for those facts ignored.
- [M] Daily deviation report listing edited item facts (all active/markdown items) for client to sync PIM.
- Conflict handling: when feed and ItemSmart differ, treat ItemSmart edited value as source of truth and include in deviation report.
- (Future) Option for user to choose source of truth after PIM is updated from deviation report (MTP-51043).

## Integrations (Cross-Product)

- [M] Ordering → ItemSmart: requirements, flow, cadence, and format defined and implemented (MTP-128037); align with TDD (e.g. Ordering → ItemSmart Data Sync).
- [M] ItemSmart → Ordering: requirements, format, and cadence defined and implemented (MTP-128036).
- ItemSmart → AssortSmart: requirements, logic, and cadence defined and implemented (MTP-128018).
- ItemSmart → PlanSmart: requirements, level, and cadence defined and implemented (MTP-128010).

## Row Lock & Data Integrity

- [M] Visual control (e.g. toggle or lock icon) on each grid row to apply row lock (MTP-111854).
- [M] Locked row: plan values uneditable; higher-level subtotal edits and bulk edits must not propagate to locked rows; difference redistributed only to unlocked rows.
- Clear visual distinction between locked and unlocked rows.

---

# Detailed Requirements & Process Specifications

The following sections spell out business process and acceptance criteria for each feature area. They are the place to look for step-by-step behavior, edge cases, and traceability to Jira and Confluence.

---

## 1. Authentication & Access Control (MTP-50997)

**User story:** As a user, I want to securely authenticate using my email and password when accessing ItemSmart so that I can access my personalized dashboard and functionalities with data protected and access controlled by role.

**Process:**

1. User opens the IA Smart Platform and is presented with the login screen (or redirected there if not authenticated).
2. User enters email and password and submits.
3. System verifies credentials against stored credentials in a secure manner (e.g. hashed passwords, secure comparison). Credentials are transmitted over a secure channel (e.g. HTTPS).
4. If verification fails: system returns a single, generic message (e.g. “Invalid email or password”) and does not indicate whether the email exists or the password was wrong.
5. If verification succeeds: system creates a session and redirects the user to the platform (or last location). Session remains active until the user explicitly logs out or until an inactivity timeout (if configured).
6. Password reset: user can request a reset; system sends a time-limited link to the registered email; user sets a new password via that link; system updates stored credentials and invalidates the link.
7. After authentication, every request is evaluated for role-based access: the user can only access features and data permitted for their role (e.g. Planner, DPM, Admin).

**Acceptance criteria:**

- Email and password are verified securely; session is created on success.
- Session remains active until logout or inactivity timeout.
- Stored passwords are encrypted; transmission is secure.
- Login failure message is generic and does not leak information.
- Password reset is available and completes via verified email link.
- RBAC is enforced for all ItemSmart features and data.

---

## 2. Navigation to ItemSmart (MTP-50998)

**User story:** As a logged-in user, I want to easily navigate from the IA Smart Platform homepage to ItemSmart so that I can quickly access item planning without searching through multiple pages or menus.

**Process:**

1. User is logged in and on the IA Smart Platform homepage.
2. Homepage displays a clearly labeled link or button for ItemSmart (with intuitive icon and optional tooltip).
3. User clicks the ItemSmart entry point. System routes to ItemSmart without unnecessary redirects; load time is minimized.
4. If the user had a previous ItemSmart session, system restores the last page/context (e.g. same screen, filters, product group selection) so they can continue where they left off.
5. Navigation is accessible (e.g. keyboard, screen reader) and works across supported devices and screen sizes (desktop, tablet, smartphone as applicable).

**Acceptance criteria:**

- Direct access link/button is present and clearly labeled; icons/tooltips support quick identification.
- Transition to ItemSmart is smooth with minimal load time and no unnecessary redirects.
- Last location within ItemSmart is remembered and restored on return.
- Navigation is accessible and responsive as specified.

---

## 3. Dashboard Filters (MTP-50999)

**User story:** As a planner, I want to apply customizable filters on the ItemSmart dashboard so that I can narrow down and view the data most relevant to my planning activities (e.g. product lines, time periods, performance metrics).

**Process:**

1. User is on the ItemSmart dashboard. Dashboard exposes filter controls for dimensions such as time period, product category, department, and KPI-related attributes.
2. User selects one or more values per dimension (multi-select where applicable). Interface is intuitive (e.g. dropdowns, checkboxes, toggles).
3. As soon as filters are applied or changed, the dashboard view (tables, charts, KPI cards) updates to reflect the filtered dataset—no separate “Apply” step required for basic behavior, unless design specifies otherwise.
4. User can save the current filter configuration under a name (e.g. “Q1 FY26 – Full Price – E‑comm”) for future sessions. Saved configurations can be listed and selected to reapply in one action.
5. User can clear all filters in one action to return to the default dashboard view.
6. Filtering works with product groups and other dashboard features; when a product group is selected, it may act as or interact with filters as designed.
7. Filter UI is accessible and responsive across supported devices.

**Acceptance criteria:**

- Multiple filter types (time, category, department, KPI-related) available.
- Intuitive apply/remove and multi-select; real-time (or near real-time) view updates.
- Save and reload filter configurations.
- Clear-all-filters option.
- Accessibility and responsiveness as specified.

---

## 4. Dynamic KPI Cards (MTP-51000)

**User story:** As a planner, I want to view dynamic KPI cards on my ItemSmart dashboard so that I can get at-a-glance insights into key performance indicators and make informed decisions.

**Process:**

1. User configures which KPIs appear as cards (e.g. sales performance, inventory levels, forecast accuracy). Selection is role- and permission-aware.
2. User can customize layout: arrange, add, or remove cards. Layout preference can be persisted.
3. Data in each card is updated in real time or on a defined schedule so that the dashboard reflects current (or recently refreshed) data.
4. Cards support interaction: tooltips for definitions or breakdowns; links or actions to drill down to detailed reports or analysis pages.
5. Where applicable, cards show visual indicators (e.g. color) for performance vs target (e.g. green = on target, red = below target) so that exceptions are visible at a glance.
6. KPI cards are accessible (e.g. WCAG-aligned) and responsive across supported devices.

**Acceptance criteria:**

- Users can select which KPIs are shown on the dashboard.
- Layout is customizable (arrange, add, remove cards); data refreshes per policy.
- Tooltips and drill-down are available where specified.
- Visual indicators for performance vs target.
- Accessibility and responsiveness as specified.

---

## 5. Product Groups (MTP-51001, MTP-51031)

**User story:** As a planner, I want to create, edit, and organize product groups so that I can categorize items by criteria (e.g. product type, sales performance, inventory levels) and quickly access and analyze grouped data. I also want to see SKUs for a hierarchy and reference period as product groups with KPIs and drill to the detailed SKU list.

**Process:**

1. **Create / edit:** User can create a new product group and set criteria (e.g. product type, brand, sales velocity, inventory status). User can edit existing groups: change name, criteria, and membership (add/remove products).
2. **Organize:** User can reorder product groups (e.g. drag-and-drop) so that the most important groups appear first or in a preferred order on the dashboard.
3. **Filter integration:** When the user selects a product group (or multiple groups), the dashboard and grid can be filtered to show only data for those groups, as per product design.
4. **Visibility:** User can show or hide specific product groups on the dashboard so they can focus on a subset.
5. **Analytics:** For each product group, the system shows aggregated metrics (e.g. total sales, average inventory, other configured KPIs).
6. **Back-end / table view (MTP-51031):** For a chosen hierarchy and reference period, the system can display SKUs as product groups based on pre-determined criteria, with relevant KPIs in the product group table. User can open the detailed SKU list for a selected product group.
7. Product groups management is accessible and responsive.

**Acceptance criteria:**

- Create and edit product groups with configurable criteria and membership.
- Organize (e.g. drag-and-drop) and toggle visibility.
- Filter integration and aggregated analytics per group.
- View SKUs as product groups with KPIs and drill to SKU list (MTP-51031).
- Accessibility and responsiveness as specified.

---

## 6. Alert Groups (MTP-51003, MTP-51062)

**User story:** As a planner, I want to configure and customize alert groups so that I can proactively manage items based on conditions (e.g. low inventory, high sales velocity, upcoming restock) and take timely action.

**Process:**

1. User creates an alert by defining conditions (e.g. inventory below X, sales trend above Y, KPI deviation beyond Z). User sets parameters: thresholds, time frames, target metrics. User can assign a severity (e.g. Low, Medium, High) and assign the alert to a category (e.g. Inventory Alerts, Sales Performance, Planning Milestones).
2. When data satisfies the alert condition, the system triggers a notification. Notifications appear in the dashboard; optionally they are also sent by email or mobile as configured.
3. User can manage alerts: create, edit, disable, delete. User can filter and sort the list of active alerts to work through them.
4. Alert Group Table displays alert groups and associated KPIs per pre-determined criteria; QA validates behavior per MTP-51062.
5. Documentation or in-app help explains how to configure and use alert groups.

**Acceptance criteria:**

- Custom alerts with configurable conditions, parameters, and severity.
- Grouping by category; real-time (or near real-time) notifications; optional email/mobile.
- Full CRUD and list management (filter, sort).
- Alert Group Table behavior as specified and validated.
- Documentation or help available.

---

## 7. KPI Editing & Dependent Updates (MTP-51032)

**User story:** As a user, I want to edit specific KPI values and have the system automatically update dependent KPIs across all relevant levels so that data stays consistent and accurate.

**Process:**

1. User can edit the following KPIs in the planning grid: W Sls $, W Sls U, W DR%, OO U (TTL-UP), Net Inv Adj U (and any other KPIs explicitly defined as editable).
2. When the user edits one of these KPIs, the system applies the predefined editable flow for that KPI: it recalculates dependent KPIs in the specified order (e.g. revenue, AUR, receipts) using the documented formulas. Updates apply across the relevant data levels (SKU, Class, Department) so that totals and details remain aligned.
3. Before saving, the user can preview the resulting values. The user can undo, redo, or reset edits within the session.
4. If the user tries to leave or perform an action that would discard edits, the system warns about unsaved changes and offers: continue editing, discard changes, or save.
5. When the user confirms (e.g. clicks Update), the system calls the update API and persists all affected levels. The UI reflects the saved state.

**Acceptance criteria:**

- Editable KPIs are as specified; dependent KPIs update per editable flow logic.
- Updates reflect across SKU/Class/Department; flow order and formulas as documented.
- Preview; undo/redo/reset; unsaved-change warning with continue/discard/save.
- Update API is invoked on confirm; data persisted and UI updated.

*Reference: [ItemSmart Aggregation & Disaggregation Logic](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1081376882).*

---

## 8. Aggregation & Disaggregation (MTP-51033, MTP-51052)

**User story:** As a user, I want edits at any level to correctly aggregate or disaggregate so that higher and lower levels stay accurate and consistent.

**Process:**

1. **Disaggregation (higher → lower):** When the user edits a higher-level KPI (e.g. monthly W Sls $), the system splits the new value to lower levels (e.g. weeks) proportionally. Proportion is based on each lower level’s contribution to the higher-level total before the edit. Example: Month had 100k W Sls $; Week 1 had 25k. User sets month to 120k → Week 1 becomes 120k × (25k/100k) = 30k. All affected levels then follow the editable flow for that KPI. Disaggregation order is: Product hierarchy → Channel → Time (down to SKU-week-channel). For W DR%: same value is copied to all lower levels, then editable flow is applied. For OO U and Net Inv Adj U: value is copied to the first lower level (e.g. week 1, month 1), then editable flow is applied to all lower and higher levels.
2. **Aggregation (lower → higher):** When the user edits a lower-level KPI, the system first updates the edited cell, then recomputes higher levels (e.g. W Sls $ = sum(lower W Sls $); W Sls U = sum(lower W Sls U); W AUR = W Sls $ / W Sls U; W DR% = (W AIR − W AUR)/W AIR as specified). Other KPIs follow the same flow as the edited KPI’s editable flow.
3. **Edge case:** If the higher-level value is zero before the edit, the system distributes to lower levels in a defined way (e.g. equally) so that no division-by-zero or undefined behavior occurs.
4. **Lock/hold:** Users can lock specific levels so that automatic scaling does not change those values (detailed in lock/hold spec).
5. All aggregation and disaggregation updates are reflected in the UI immediately for visible levels and are persisted when the user confirms.

**Acceptance criteria:**

- Higher-level edit disaggregates to lower levels proportionally (or as specified for each KPI type).
- Lower-level edit aggregates to higher levels using the specified formulas.
- Disaggregation order: Product → Channel → Time.
- Zero higher-level case handled; lock/hold available; UI and persistence as specified.

*Reference: [ItemSmart Aggregation & Disaggregation Logic](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1081376882).*

---

## 9. Hard Kit (HKT) Editing (MTP-51050, MTP-51051)

**User story:** When a user edits a Hard Kit (HKT) SKU, edits must flow to component SKUs in a consistent way so that HKT and components stay in sync.

**Process (assume HKT = SKU a, components = SKU b, c):**

1. **W/D Sls $:** Prorate to components by each component’s % contribution of AUC to total HKT AUC. E.g. if HKT goes from 100 to 200 and component AUC shares are 60% and 40%, then 60% of 200 and 40% of 200 go to the two components. Then apply the standard editable flow for each component.
2. **W/D Sls U:** Replicate the HKT value to all components (e.g. 20 → 15 on HKT means 15 on each component). Then apply editable flow.
3. **AIR:** Prorate by component % contribution to total HKT W AUC; then apply editable flow.
4. **Discount %:** Replicate same value to all components; then apply editable flow.
5. **Inv Adjusted Units:** Replicate same value to all components; then apply editable flow.
6. **Inv Adjusted $:** Split by AUC proportion (same logic as W/D Sls $); then apply editable flow.
7. **On Order Unplaced receipt units:** Replicate same value to all components; then apply editable flow.

**Acceptance criteria:**

- Each HKT edit type (above) follows the correct rule (prorate by AUC or replicate) and then applies the standard editable flow to components (and HKT where applicable).

---

## 10. Data Flow & Versions (Confluence: Data Flow in ItemSmart)

**Process summary:**

- **IAF:** Forecast-driven demand. SKU universe and horizon as defined (e.g. 8 weeks before launch to max date; 26 weeks past exit or 18 months). Filtered by baseline discount; stored and refreshed weekly/daily. Other KPIs (e.g. revenue, AUR, receipts) calculated and stored. No WP edits are written back to IAF.
- **LY / LLY:** Historical data at SKU-week level for all channels; read-only in tool; refreshed weekly for full weeks only.
- **Actual:** Past actuals (e.g. 9 months prior to current week); non-editable; for completed full weeks, actuals replace WP in the UI (and optionally in DB); refreshed weekly.
- **WP:** Working plan. Seeded from IAF (one-time or on demand). Updated only by seeding, Match With, or manual edits. Receipt recommendations calculated (e.g. on the fly). Weekly refresh does not overwrite WP. Actualization replaces WP for completed full weeks only.
- All date logic uses the Gregorian calendar.

**Acceptance criteria:** Behavior matches [Data Flow in ItemSmart](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1090716817) for each version and refresh rule.

---

## 11. Item Facts & PIM Sync (MTP-51042)

**Process:**

1. **New item, no prior edit in ItemSmart:** Item facts come from the client PIM (e.g. Arhaus) via the daily feed. Ingestion updates ItemSmart; dependent KPIs are updated during the daily refresh.
2. **Existing item, no edit in ItemSmart:** All item facts (and item fact × week for time-phased facts) continue to be updated from the daily feed; KPIs updated on refresh.
3. **Existing item, edited in ItemSmart:** For any item fact (or item fact × week) that has been edited in ItemSmart, ItemSmart is the source of truth. Incoming feed values for that fact are ignored and not written. No overwrite of planner overrides.
4. **Deviation report:** System generates a daily report (e.g. via Bitbucket or configured channel) listing all item facts (and item fact × week) that have been edited in ItemSmart for active/markdown items. Report is cumulative (all such edits to date). The client uses this to update their PIM so both systems stay in sync.
5. **Conflict handling:** When the feed and ItemSmart disagree for an edited fact, the system keeps the ItemSmart value and reports it in the deviation report.

**Acceptance criteria:**

- New items and unedited existing items receive PIM updates; edited facts are not overwritten.
- Daily deviation report is produced and delivered; conflict handling as above.

*Future (MTP-51043):* Option for user to choose source of truth after PIM is updated from the deviation report.

---

## 12. Integrations (MTP-128037, MTP-128036, MTP-128018, MTP-128010)

**Process:**

- For **Ordering ↔ ItemSmart** and **ItemSmart → AssortSmart / PlanSmart**, the product requirement is that the following are defined and implemented:
  - **Requirements:** What data and KPIs flow; business rules and level (e.g. item/week, class/month).
  - **Flow:** Technical flow (e.g. CDC, outbox, events, APIs) per Technical Design Documents.
  - **Cadence:** How often data is synced (e.g. real-time, hourly, daily).
  - **Format:** Payload and schema for each integration.

Implementation must align with the agreed TDDs (e.g. [Ordering → ItemSmart Data Sync (v3.0)](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/2327543811), [OMS to ItemSmart Data Sync](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/2265284610)).

**Acceptance criteria:** Requirements, flow, cadence, and format are documented and implemented for each integration; behavior matches TDDs.

---

## 13. Row Lock (MTP-111854)

**User story:** As a planner, I want to lock specific rows in the planning grid so that agreed plan assumptions are secured and higher-level subtotal edits do not unintentionally change locked line items.

**Process:**

1. Each grid row has a visual control (e.g. toggle or lock icon) to apply or remove a lock.
2. When a row is locked, its plan values become read-only. The user cannot edit those cells directly.
3. When the user edits a higher-level subtotal (e.g. department month) and some child rows are locked and some unlocked, the system redistributes the change only across **unlocked** rows. Locked rows are excluded from propagation. The math is adjusted so that the subtotal equals the sum of unlocked rows plus the (unchanged) locked rows.
4. Bulk Edit actions also must not overwrite locked rows; only unlocked rows are updated (and redistribution logic applies as above).
5. The UI clearly distinguishes locked vs unlocked rows (e.g. icon, styling, or both).

**Acceptance criteria:**

- Visual control for row lock on each row; locked rows are uneditable.
- Subtotal and bulk edits redistribute only to unlocked rows; locked row values do not change.
- Clear visual indication of lock state.

*Design reference: [Figma – Row Lock](https://www.figma.com/proto/LHeXzFSqMoimKclEZJuQqK/Itemsmart_V3_May2025).*

---

# Non-Functional Requirements

- **Performance:** Dashboard and grid load within agreed SLAs; no material increase in login or refresh latency.
- **Security:** Passwords stored and transmitted securely; sessions and RBAC enforced.
- **Availability:** Align with MTP/platform availability targets.
- **Scalability:** Architecture supports read replica for reporting and offload of heavy queries ([Itemsmart Architecture](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1611431940)).
- **Accessibility:** Features meet agreed web accessibility standards where specified.
- **Responsiveness:** Core workflows usable on supported desktop and tablet (and mobile where in scope).

---

# Architecture & Technical Context

- **Front-end:** React; NGINX for load balancing and static assets.
- **Backend:** FastAPI (Python); Core Service (auth, orchestration) + ItemSmart Backend (item/inventory operations).
- **Database:** PostgreSQL (primary + read replica); BigQuery for analytics/warehouse.
- **Data sync:** Ordering/OMS ↔ ItemSmart via CDC/outbox and event-driven sync per TDDs.
- **Application ID:** ItemSmart uses `APPLICATION_ID` and app-level DB segregation (e.g. `item`) per MTP.

---

# Out of Scope for This PRD

- Client-specific forecasting methodology (e.g. Arhaus, Balsam)—documented elsewhere.
- Detailed ingestion pipeline and derived-table logic—see [ItemSmart - Derived Tables](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1348337760).
- Supersession (primary/secondary style mapping)—see [Supersession - Process in ItemSmart](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1446772801).
- Notification service prerequisites for Edits and Match With—see [Notification Service Prerequisites for ItemSmart](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1521221637).

---

# Appendix A — Jira Story Index (ItemSmart-Related)

| Key | Summary |
|-----|---------|
| MTP-50997 | Secure User Authentication and Access Control |
| MTP-50998 | Intuitive Navigation to ItemSmart from IA Smart Platform |
| MTP-50999 | Customizable Dashboard Filters for Enhanced Data Visibility |
| MTP-51000 | Dynamic KPI Cards for At-a-Glance Performance Insights |
| MTP-51001 | Efficient Management and Customization of Product Groups |
| MTP-51003 | Customizable Alert Groups for Proactive Management |
| MTP-51031 | ItemSmart ---->> Product Groups ----> BE |
| MTP-51032 | Edit KPI Values and Update Dependent KPIs |
| MTP-51033 | Aggregation and Disaggregation of KPIs |
| MTP-51042 | Data Syncing with Arhaus PIM System |
| MTP-51043 | Future Enhancement (Post first release) — PIM source of truth |
| MTP-51050, MTP-51051 | Editing on HardKit |
| MTP-51052 | KPI Edits: Disaggregation of KPI Edits |
| MTP-51062 | [QA] Alert Groups related features |
| MTP-128010 | Integration from ItemSmart to PlanSmart |
| MTP-128018 | Integration from ItemSmart to AssortSmart |
| MTP-128036 | Integration from ItemSmart to Ordering |
| MTP-128037 | Integration from Ordering to ItemSmart |
| MTP-111854 | Grid Actions: Row Lock for Data Integrity |

---

# Appendix B — References

- [MTP Jira Project — Summary](https://impactanalytics.atlassian.net/jira/software/c/projects/MTP/summary)
- [Data Flow in ItemSmart](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1090716817)
- [Itemsmart Architecture](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1611431940)
- [2. ItemSmart Integration](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1250066535)
- [ItemSmart Aggregation & Disaggregation Logic](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1081376882)
- [Ordering → ItemSmart Data Sync Solution (v3.0)](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/2327543811)
- [Technical Design Document: OMS to ItemSmart Data Sync](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/2265284610)
- [1.0 - ItemSmart Functional Design - Feature Detail and User Stories](https://impactanalytics.atlassian.net/wiki/spaces/ISP/pages/1037238442)

---

*This PRD is derived from MTP Jira user stories and Confluence documentation. For latest story status and implementation details, refer to Jira and the linked Confluence pages.*
