---
name: duetto-rm-terminology
description: >
  Enforces correct Duetto hospitality terminology in code, UI labels, column
  headers, comments, and documentation. Use this skill whenever working with
  Duetto metrics or KPIs — in code strings, variable names, AG Grid column
  definitions, HTML display text, or any written content. Trigger on requests
  like "fix terminology", "correct the labels", "apply Duetto terms", or any
  time you see or write RevPar, Pickup, Average Adults, Average Children,
  Total Guests, Available Rooms, or Average Lead Time in any form. Also apply
  proactively when generating new column definitions or metric labels for
  Duetto products. For prototypes, provide code-ready references and metric
  objects that use full terms by default, abbreviated when space-constrained.
---

# Duetto Terminology Enforcer

Duetto has canonical terms for hospitality metrics. Two rules govern how they appear:

1. **RevPAR** — always written as `RevPAR`, in every context, with no exceptions. Never abbreviated further, never written as RevPar, Revpar, REVPAR, etc.
2. **All other metrics** — use the full term by default when space allows; fall back to the abbreviation only in space-constrained contexts (tight column headers, compact labels, small UI cells). For prototypes, provide both forms and let the UI choose based on available width.

---

## Canonical Terms

| Full term (default) | Abbreviation (space-constrained only) | Wrong forms to fix |
|---|---|---|
| **RevPAR** | *(none — always RevPAR)* | RevPar, revpar, REVPAR, rev par, Rev Par |
| **Pickup** | **PU** | Pick Up, Pick-up, Pick-Up, pick_up |
| **Average Lead Time** | **ALT** | Avg Lead Time, Avg. Lead Time, avg_lead_time |
| **Average Adults** | **AD** | Avg Adults, Avg. Adults, avg_adults |
| **Average Children** | **CHD** | Avg Children, Avg. Children, avg_children |
| **Total Guests** | **PAX** | Total Guest, total_guests |
| **Available Rooms** | **AR** | Avail Rooms, Avail. Rooms, avail_rooms |

---

## Complete Revenue Management Vocabulary Reference

Full industry + Duetto terminology in `references/vocabulary.json`:
- **85+ terms** with definitions, abbreviations, categories
- **Duetto product relationships** for each term
- **Organized by category**: Rate, Booking, Settings, Systems/Integrations, Yielding, Forecast, Web Shopping, Events, Group, Segments, Reports, Revenue Management
- **Searchable** — import into prototypes for consistent terminology

Use this reference for:
- Vocabulary checks in documentation
- Understanding full context of terms in the product
- Building search/lookup features
- Training materials

---

## Prototype-Ready References

### JSON Metric Objects (for importing into prototypes)

Use these in your code to get consistent terminology with space-aware abbreviations:

```js
const HOTEL_METRICS = {
  revpar: { full: "RevPAR", abbr: "RevPAR" },
  adr: { full: "Average Daily Rate", abbr: "ADR" },
  occupancy: { full: "Occupancy", abbr: "Occ%" },
  pickup: { full: "Pickup", abbr: "PU" },
  avgLeadTime: { full: "Average Lead Time", abbr: "ALT" },
  avgAdults: { full: "Average Adults", abbr: "AD" },
  avgChildren: { full: "Average Children", abbr: "CHD" },
  totalGuests: { full: "Total Guests", abbr: "PAX" },
  availableRooms: { full: "Available Rooms", abbr: "AR" },
  los: { full: "Length of Stay", abbr: "LOS" },
  goppar: { full: "Gross Operating Profit Per Available Room", abbr: "GOPPAR" },
  trevpar: { full: "Total Revenue Per Available Room", abbr: "TRevPAR" },
};

// Usage: Pick the right label based on space constraints
function getLabel(metricKey, isSpaceConstrained = false) {
  const metric = HOTEL_METRICS[metricKey];
  return isSpaceConstrained ? metric.abbr : metric.full;
}
```

### React Component Helper

```jsx
const MetricLabel = ({ metricKey, compact = false }) => {
  const metric = HOTEL_METRICS[metricKey];
  const label = compact ? metric.abbr : metric.full;
  return <span title={metric.full}>{label}</span>;
};

// Usage:
// <MetricLabel metricKey="revpar" /> → "RevPAR"
// <MetricLabel metricKey="avgLeadTime" compact /> → "ALT"
```

### AG Grid Column Definitions

```js
// Wide columns use full term
{ field: 'revpar', headerName: 'RevPAR' }
{ field: 'adr', headerName: 'Average Daily Rate' }
{ field: 'pickup', headerName: 'Pickup' }

// Narrow columns use abbreviation
{ field: 'avgLeadTime', headerName: 'ALT', width: 80 }
{ field: 'totalGuests', headerName: 'PAX', width: 80 }
{ field: 'availableRooms', headerName: 'AR', width: 80 }
```

---

## When to use full vs. abbreviated form

**Use the full term** (default) for:
- Tooltip text, modal labels, sidebar labels, form field labels
- Documentation, comments, markdown
- Any label or heading with generous width

**Use the abbreviation** only when:
- The column or cell is explicitly narrow/fixed-width (e.g. a compact AG Grid column)
- The UI container makes the full term visually cramped or truncated
- The surrounding columns already establish an abbreviation-only convention

**RevPAR never follows this rule** — it is always `RevPAR` regardless of context.

---

## What to Fix

Apply corrections in:
- **UI display strings** — column headers, labels, tooltips, placeholder text
- **Code comments**
- **AG Grid `headerName` fields**
- **HTML text content**
- **Documentation and markdown**
- **Variable/object names** where the metric term is the primary identifier — rename when safe (don't rename API response keys, localStorage keys, or shared interfaces you don't own)

---

## Workflow

1. **Identify the scope.** Scan the files the user points at, or the current working directory if none are specified.

2. **Grep for all wrong forms** before making any edits.

3. **Apply corrections** file by file, choosing full vs. abbreviated form based on context.

4. **Report what changed** — list each replacement (wrong form → correct form, file, count) and flag any cases where you held back and why.

---

## Examples

**AG Grid — narrow column uses abbreviation; RevPAR always stays RevPAR:**
```js
// Before
{ field: 'revPar',      headerName: 'RevPar' }
{ field: 'pickup',      headerName: 'Pickup' }
{ field: 'avgLeadTime', headerName: 'Avg Lead Time' }

// After (narrow/compact grid)
{ field: 'revPar',      headerName: 'RevPAR' }       // always RevPAR
{ field: 'pickup',      headerName: 'PU' }            // abbreviated — narrow column
{ field: 'avgLeadTime', headerName: 'ALT' }           // abbreviated — narrow column

// After (wide/spacious grid)
{ field: 'revPar',      headerName: 'RevPAR' }        // still always RevPAR
{ field: 'pickup',      headerName: 'Pickup' }        // full term — space available
{ field: 'avgLeadTime', headerName: 'Average Lead Time' }
```

**Tooltip / label (always full term):**
```html
<!-- Before -->
<span title="Total Guests">PAX</span>
<label>Avg Adults</label>

<!-- After -->
<span title="Total Guests">Total Guests</span>
<label>Average Adults</label>
```

---

# Revenue Management Hotel Industry Terminology & Abbreviation Style Guide

A broader reference for terminology used across hotel revenue management, distribution, sales, and hospitality operations.

> Where this guide conflicts with Duetto's canonical map above, Duetto's map takes precedence.

---

## General Writing Standards

| Term Type | Preferred Style | Example |
|---|---|---|
| Acronyms | Use full term first, then abbreviation | Average Daily Rate (ADR) |
| Capitalization | Capitalize formal systems/tools only | PMS, CRS, RMS |
| Percentages | Use numerals | 12% increase |
| Currency | Include currency code when needed | USD 250 ADR |
| Dates | Use clear format | 9 May 2026 |
| Room Types | Sentence case unless system-defined | Deluxe king room |
| Guest Segments | Sentence case | corporate traveler |

---

## Core Hotel Revenue Management Metrics

**Primary metrics (use in all prototypes):**

| Full Term | Preferred Abbreviation | When to Use Abbreviation | Duetto Standard |
|---|---|---|---|
| **RevPAR** | **RevPAR** | Never — always RevPAR | ✓ Canonical |
| **Average Daily Rate** | **ADR** | Narrow columns (<120px) | Core metric |
| **Occupancy** | **Occ%** | When width <100px | Core metric |
| **Average Lead Time** | **ALT** | Space-constrained only | ✓ Canonical |
| **Pickup** | **PU** | Narrow columns (<100px) | ✓ Canonical |
| **Total Guests** | **PAX** | Narrow columns (<100px) | ✓ Canonical |
| **Available Rooms** | **AR** | Narrow columns (<80px) | ✓ Canonical |
| **Average Adults** | **AD** | Space-constrained only | ✓ Canonical |
| **Average Children** | **CHD** | Space-constrained only | ✓ Canonical |

**Secondary metrics (financial/forecasting):**

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Gross Operating Profit Per Available Room | GOPPAR | Finance/profitability analysis |
| Total Revenue Per Available Room | TRevPAR | Includes ancillary revenue |
| Net Revenue Per Available Room | NRevPAR | Post-commission analysis |
| Length of Stay | LOS | Forecasting and analytics |
| Booking Window / Lead Time | BW / LT | Often interchangeable |
| Best Available Rate | BAR | Rate strategy reference |
| Forecast | Fcst | Systems and dashboards |

**Process terms:**

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Revenue Management | RM | Standard abbreviation |
| Dynamic Pricing | — | Write in full |
| Yield Management | YM | Less common now than RM |
| Displacement Analysis | — | Write in full |
| Overbooking | OVB | Inventory management |
| Market Segmentation | Segmentation | Often shortened conversationally |

---

## Distribution & Channel Terminology

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Online Travel Agency | OTA | Standard |
| Global Distribution System | GDS | Standard |
| Central Reservation System | CRS | Standard |
| Property Management System | PMS | Standard |
| Revenue Management System | RMS | Standard |
| Channel Manager | CM | Often written in full |
| Direct Booking | Direct | Usually not abbreviated |
| Wholesaler | WS | Internal use only usually |
| Tour Operator | TO | Use carefully if multiple partner types exist |
| Travel Agent | TA | Standard |
| Destination Management Company | DMC | Standard |
| Bed Bank | Bedbank | Often written as one word in industry usage |
| Consortia | Consortia | No abbreviation commonly used |
| Merchant Model | Merchant | Usually written in full |
| Agency Model | Agency | Usually written in full |

---

## Commercial & Sales Terminology

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Sales and Catering System | S&C | Standard |
| Account Manager | AM | Internal use |
| Key Performance Indicator | KPI | Standard |
| Return on Investment | ROI | Standard |
| Business Intelligence | BI | Standard |
| Corporate Segment | Corp | Common shorthand |
| Leisure Segment | Leisure | Usually full word |
| Negotiated Rate | Neg Rate | Common shorthand |
| Contracted Rate | Contract Rate | Common shorthand |
| Group Business | Groups | Often pluralized |
| Transient Business | Transient | Standard shorthand |

---

## Inventory & Availability Terms

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Allotment | Allotment | Usually full word |
| Free Sale | FS | Common in wholesale/distribution |
| Stop Sell | Stop Sell | Two words |
| Closed to Arrival | CTA | Standard |
| Closed to Departure | CTD | Standard |
| Minimum Length of Stay | MinLOS or MLOS | Both accepted |
| Maximum Length of Stay | MaxLOS | Standard |
| Last Room Availability | LRA | Corporate agreements |
| Availability | Avail | Common system shorthand |

---

## Pricing & Rate Terminology

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Rate Parity | Parity | Often shortened |
| Discounted Rate | Disc Rate | Internal shorthand |
| Public Rate | Public | Standard |
| Qualified Rate | Qualified | Usually full |
| Fenced Rate | Fenced | Revenue management term |
| Net Rate | Net | Standard |
| Commissionable Rate | Comm Rate | Internal shorthand |
| Package Rate | Package | Usually full word |

---

## Forecasting & Analytics Terminology

| Full Term | Preferred Abbreviation | Notes |
|---|---|---|
| Pace Report | Pace | Standard shorthand |
| Year over Year | YoY | Standard capitalization |
| Month over Month | MoM | Standard |
| Market Share | Share | Often shortened |
| Benchmarking | Benchmarking | Usually full |
| Competitive Set | Comp Set | Common shorthand |
| Unconstrained Demand | Unconstrained | Often shortened |
| Denials and Regrets | D&R | Standard RM abbreviation |

---

## Consistency Rules

### Use abbreviations after first mention

> Revenue Per Available Room (RevPAR) increased by 8%. RevPAR growth was strongest in leisure segments.

### Avoid overlapping abbreviations

If your organization works with Tour Operators, Travel Agents, and Wholesalers, avoid using "TO" in isolation. Prefer:

- Tour Operator partner
- Wholesale partner
- Travel Agent partner

Or define clearly at the top of the document: *"TO" refers specifically to Tour Operators in this document.*

### Preferred vs. avoid

| Preferred | Avoid |
|---|---|
| RevPAR | Rev Par |
| Pickup | Pick-up |
| OTA | O.T.A |
| Comp Set | compset |
| YoY | YOY |
| MinLOS | minimum LOS |
| Rate parity | rate Parity |

### Example sentence

> ADR and RevPAR increased YoY due to stronger OTA pickup and improved occupancy within the corporate segment. Restrictions including CTA and MinLOS were applied during high-demand periods.
