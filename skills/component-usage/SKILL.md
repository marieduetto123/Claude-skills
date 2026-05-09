---
name: duetto-design-system
description: >
  Duetto design system integration skill for UI component work. Use this
  skill when creating or modifying UI components, implementing Figma designs,
  or fixing UI-layer bugs — new components, MUI usage, forms, data tables,
  modals, and visual/interaction work. Does NOT apply to API routes,
  data-fetching hooks, GraphQL/REST queries, or non-component utilities.
  Always query Duetto Code Intelligence FIRST before any Figma lookup —
  real codebase patterns take precedence over design specs.
---

# Duetto Design System — Coding Guidelines

You are writing frontend code for **Duetto Research**, a B2B SaaS company in the hospitality tech space. All UI code must align with Duetto's design system and component conventions. Follow these rules carefully — they reflect how the team actually works, not generic best practices.

---

## 0. Scope — Which Stack Does This Skill Cover?

**Before using this skill, confirm the target project's frontend stack.**

Check `package.json`:
- `@material-ui/core` present → **Legacy Stack (MUI v4)** — this skill applies in full
- `@mui/material` at `^9.x` OR `tailwindcss` present → **New Stack (MUI v9 + Tailwind)** — see note below

> ⚠️ **This skill covers the Legacy Stack only** (`duetto-frontend`, MUI v4 / `@material-ui/core`, `makeStyles`).
> Sections 3, 8, and 11 reference MUI v4 APIs that do not exist in MUI v9.
> If you are working on a **new-stack project** (MUI v9 + Tailwind), **stop here** — follow MUI v9 documentation and Tailwind conventions instead. A dedicated new-stack skill is planned as a follow-up.
> If Code Intelligence is unavailable, use `Glob`/`Grep` directly as a fallback for the queries in Section 1.

---

## ⚠️ Mandatory Pre-Code Workflow

**Before writing a single line of code, you MUST follow these steps in order:**

1. **Query Duetto Code Intelligence** — search the real codebase for existing patterns
2. **Check Figma design system** — for visual specs, tokens, and layout intent

**Never skip step 1.** Figma shows the design target; the codebase shows how it's actually built. Real patterns always take precedence over design specs.

---

## 1. FIRST: Query Duetto Code Intelligence

**This step is mandatory before any Figma lookup or code writing.**

The **Duetto Code Intelligence** MCP is connected and indexes both `duetto-frontend` and `duetto-shared-javascript`. Use it to ground every code task in real codebase patterns.

### When to use it

Use Code Intelligence for **every** coding task — not just when you think something might be missing. The codebase contains architectural decisions that aren't visible in Figma (e.g., `DynamicHeader` lives at the app shell, not inside pages).

### Required queries before writing code

For **any new page or feature**, run all of these:

```
# 1. Find real examples of the component/pattern you're building
smart_query("show me a real page component using FormPage in duetto-frontend")

# 2. Verify the component you plan to use actually exists and get its real props
search_code("FormPageHeader props interface")

# 3. Find similar pages to use as structural reference
search_code("containers/Onboarding PropertyDetailsPage tsx")

# 4. Check for any wrappers or HOCs that affect how the component is used
search_code("DynamicHeader app shell layout wrapper")
```
### Architecture facts discovered via Code Intelligence

The following are **verified codebase patterns** — trust these over any Figma spec or assumption:

| Pattern | Verified Fact | Source |
|---|---|---|
| App Header | `DynamicHeader` is rendered by the **app shell** (`AppLayoutView` / `BreadcrumbWrapper`), NOT inside individual page components | `duetto/frontend/.../BreadcrumbWrapper.jsx` |
| Individual pages | Pages render their own content only — no header, no nav | `duetto-frontend/src/containers/Onboarding/*Page.tsx` |
| FormPageHeader | Wraps `PageHeader` in `<Box padding={3}>` — no need to add extra padding | `duetto-frontend/src/components/FormPage/FormPageHeader/FormPageHeader.tsx` |
| FormPageBody | Has `padding: theme.spacing(0, 3)` built in | `duetto-frontend/src/components/FormPage/FormPageBody/FormPageBodyStyles.ts` |
| FormPage | Uses MUI `Container` + `Paper` (elevation=2, square) | `duetto-frontend/src/components/FormPage/FormPage.tsx` |
| Form exports | All FormPage sub-components exported from `components/FormPage` index | `duetto-frontend/src/components/FormPage/index.ts` |

**Always add new verified facts to this table as you discover them.**

### Correct import for FormPage components (verified)
```tsx
import {
  FormPage,
  FormPageActions,
  FormPageBody,
  FormPageHeader,
} from 'components/FormPage';
```

---

## 2. SECOND: Check Figma for Visual Specs

After confirming the structural/architectural pattern via Code Intelligence, check the Duetto 2026 Design System in Figma for visual details.

**Design system file:**
https://www.figma.com/design/yZ5mR7q3QcSdB24e3PmaX3/2026-Design-System-v4

Use the Figma MCP tools (`get_design_context`, `get_screenshot`, `get_metadata`) to:
- Understand spacing, colors, and layout intent
- Confirm design tokens (use Section 13 Component Index for node IDs)
- Get visual specs for new or unfamiliar components

### Accessing Figma Variables (live token values)

To get confirmed, live token values from the Figma Variables panel, call `get_variable_defs` with any node ID from the design system file. This requires the user to have a layer selected in Figma. **Ask the user to open the file and select any frame**, then call:

```
get_variable_defs(fileKey: "yZ5mR7q3QcSdB24e3PmaX3", nodeId: "<selected node id>")
```

This returns canonical token names and hex values directly from the Variables panel — more reliable than reading visual swatches.

If Figma is not available, use the **hardcoded token table in Section 7** of this skill as the fallback.

---

## 3. Component Resolution — 3-Tier Hierarchy

**Always follow this decision tree before writing any UI element:**

### Tier 1 — Duetto Component Library (preferred)
Search both repos for an existing Duetto component first — use Code Intelligence `search_code` queries before Glob/Grep. If it exists, use it — do not reimplement.

```tsx
// ⚠️ DynamicHeader is app-shell-only — rendered by AppLayoutView/BreadcrumbWrapper,
// NEVER import or render it inside individual page components.
import { FormPage, FormPageHeader, FormPageBody, FormPageActions } from 'components/FormPage';
import { InputComponent } from 'components/InputComponent/InputComponent'; // ⚠️ named export, NOT default
```

### Tier 2 — MUI with Duetto Styling (if no Duetto wrapper exists)
If no Duetto wrapper exists for the element you need, use the raw MUI component and style it with Duetto theme tokens. This is the correct fallback — never skip to Tier 3 if MUI has the component.

```tsx
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

// Style using theme tokens only — no hardcoded values
const useStyles = makeStyles((theme) => ({
  myButton: {
    backgroundColor: theme.palette.primary.main, // maps to UI/Primary: #004948
    color: theme.palette.common.white,
  },
}));
```

### Tier 3 — New Component from Design Tokens (last resort)
Only create a net-new component when neither Tier 1 nor Tier 2 covers the need. Use the token table in Section 7 for all color, spacing, and typography values. Never hardcode hex values — reference theme tokens or the token names from the table.

**Before going to Tier 3, always ask:**
> "I don't see an existing component for [X] in your library or in MUI. Should I create a new one, or is there something I'm missing?"

---

## 4. Component Library — Where Things Live

Duetto components live in two repositories. **Always search both before writing anything new.**

### `duetto-shared-javascript` (shared across products)
- Common, reusable components: header, breadcrumb, property selector, navigation, shared UI primitives
- Used by both `duetto-frontend` and the legacy `duetto` monolith
- Import as a package: `import { SomeComponent } from 'duetto-shared-javascript'`
- Key paths:
  - `duetto-shared-javascript/duetto-components/src/` — all shared UI components
  - `duetto-shared-javascript/duetto-components/src/DynamicHeader/` — app header + breadcrumb
  - `duetto-shared-javascript/duetto-components/src/Breadcrumb/` — standalone breadcrumb

### `duetto-frontend` (primary product repo)
- Product-specific components: data tables, page layouts, feature-specific UI
- Key paths:
  - `duetto-frontend/src/components/` — product components
  - `duetto-frontend/src/components/CommonDataTable/CoreTable/` — AG Grid data table wrapper
  - `duetto-frontend/src/components/FormPage/` — FormPage, FormPageHeader, FormPageBody, FormPageActions
  - `duetto-frontend/src/components/InputComponent/` — InputComponent (MUI input wrapper)
  - `duetto-frontend/src/components/PageHeader/` — PageHeader

### How to search both repos

```
# Find a component by name across both repos
Glob: "**/DynamicHeader*"
Grep: "DynamicHeader"

# If only one repo is mounted, check for the other as a sibling directory
```

If only one repo is mounted and you need the other, ask the user to grant access.

### Storybook Reference
The full component library is documented in two Storybook sites. Use the Component Index in Section 13 to look up the correct Storybook name and URL for any component before searching Code Intelligence.
- **frontend**: https://storybook.duettoresearch.com/frontend/
- **components (DSJ)**: https://storybook.duettoresearch.com/components/

---

## 5. TypeScript Requirements

All code must be TypeScript (`.tsx` for components, `.ts` for utilities/hooks).

- Define explicit `Props` interfaces — no implicit `any`
- Use `unknown` over `any` where a type is truly unknown
- Leverage MUI type exports (`SxProps`, `Theme`, etc.)
- **Do NOT use Formik** — `formik` is not a direct dependency of `duetto-frontend`. Use plain React `useState` for form state. (`yup` is available if you need schema validation.)

---

## 6. File and Folder Structure

Follow the established structure of whichever repo you're working in.

```
src/
  components/       # Reusable UI components
  hooks/            # Custom React hooks
  utils/            # Pure utility functions
  pages/ or views/  # Page-level components
  types/            # Shared TypeScript types/interfaces
```

Co-locate test files with components if tests exist elsewhere in that directory. Ask about testing conventions if unsure.

---

## 7. Design Tokens

For live token values, call `get_variable_defs` on the Figma design system file:

```
get_variable_defs(fileKey: "yZ5mR7q3QcSdB24e3PmaX3", nodeId: "<any selected node>")
```

Ask the user to open the file and select any frame first. This returns canonical token names and hex values directly from the Variables panel.

If Figma is unavailable, use the fallback snapshot in [`references/design-tokens.md`](references/design-tokens.md).

**Never hardcode hex values in code** — always reference MUI theme tokens instead:

### MUI Theme Token Mapping

| Figma Variable | MUI Theme Token |
|---|---|
| `UI/Primary` | `theme.palette.primary.main` |
| `UI/Secondary` | `theme.palette.secondary.main` |
| `Text/Text - Primary` | `theme.palette.text.primary` |
| `Text/Text - Secondary` | `theme.palette.text.secondary` |
| `Text/Text - Disabled` | `theme.palette.text.disabled` |
| `Common/Background - Default` | `theme.palette.background.default` |
| `Semantic/Error-600` | `theme.palette.error.main` |
| `Semantic/Success-500` | `theme.palette.success.main` |
| `Semantic/Warning-500` | `theme.palette.warning.main` |

---

## 8. Styling Rules

- Use `makeStyles` (MUI v4 pattern used across the codebase) for component styles
- Reference theme tokens — **never hardcode hex values**
- Use `theme.spacing()` for all spacing — never raw `px` values
- Do **not** use the `sx` prop — it is an MUI v5 pattern and is not available in Duetto's MUI v4 (`@material-ui/core`)

```tsx
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default, // #FAFAFA
    padding: theme.spacing(3),
  },
  header: {
    backgroundColor: theme.palette.secondary.main, // #0E2124 nav bar
    color: theme.palette.common.white,
  },
  errorText: {
    color: theme.palette.error.main, // #D32F2F
  },
}));
```

---

## 9. Figma Asset URLs — Critical Warning

Figma MCP asset URLs (`https://www.figma.com/api/mcp/asset/...`) expire after 7 days and require Figma authentication. Never embed them as `src` values in code. Use existing library components for icons, logos, and visual assets.

---

## 10. App Header — `DynamicHeader` Component

The Duetto app header is rendered by `DynamicHeader` from `duetto-shared-javascript`. It composes:
- **Top nav bar** — 40px height, dark background (`UI/Secondary: #0E2124`)
- **Breadcrumb + property picker bar** — 32px height, light background

### Component location
```
duetto-shared-javascript/duetto-components/src/DynamicHeader/DynamicHeader.tsx
```

### Required props
```tsx
<DynamicHeader
  appNavTree={appNavTree}           // PrimaryNavElement[] — navigation structure
  breadcrumb={breadcrumbs}          // BreadcrumbOption[] — current page trail
  propertyPickerProps={pickerProps} // property selector config
  utilitiesProps={utilProps}        // top-right icons (notifications, help, etc.)
  companyId={companyId}             // string
/>
```

### `BreadcrumbOption` type
```ts
type BreadcrumbOption = { title: string; url?: string | false };
```
Ancestor items include `url`, the current page omits it.

---

## 11. Form Patterns

⚠️ **`formik` is NOT a direct dependency of `duetto-frontend`** — do not import it. Use plain React `useState` for form state. (`yup` is available if you need schema validation.)

```tsx
// Page shell
import { FormPage, FormPageHeader, FormPageBody, FormPageActions } from 'components/FormPage';

// Inputs — NOTE: named export, not default
import { InputComponent } from 'components/InputComponent/InputComponent'; // ⚠️ named export, NOT default
// For select dropdowns: wrap InputComponent with formComponent=true + MUI Select
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
```

### Standard form structure

```tsx
// Use useState for form state — NOT useFormik
const [fieldName, setFieldName] = useState('');
const [fieldError, setFieldError] = useState('');

<FormPage>
  <FormPageHeader title="Page Title" />
  <Divider />
  <FormPageBody>
    <InputComponent
      id="fieldName"
      label="Field Label"
      value={fieldName}
      onChange={(e) => setFieldName(e.target.value)}
      errorMessage={fieldError}  {/* ⚠️ InputComponent uses errorMessage, NOT helperText */}
    />
  </FormPageBody>
  <FormPageActions>
    {/* Cancel + Submit buttons */}
  </FormPageActions>
</FormPage>
```

### InputComponent props gotchas
- **Named export**: `import { InputComponent } from 'components/InputComponent/InputComponent'` — it is NOT a default export
- **Error prop**: use `errorMessage` (string), NOT `helperText` — InputComponent extends `InputBaseProps`, not `TextFieldProps`

### react-hook-form
Some components (e.g. `Switch` — see Component Index in Section 13) are designed to operate inside a `react-hook-form` context. If you're working in a feature area that already uses `react-hook-form`, continue using it. For **new forms in `duetto-frontend`**, prefer plain `useState` unless the existing feature area already establishes a `react-hook-form` pattern.

---

## 12. Data Display Standards

When rendering numerical, currency, or date/time data in any UI component (especially data tables), always follow Duetto's official display guides:

### Currency & Numbers → [`references/currency-and-numerical-display.md`](references/currency-and-numerical-display.md)
Source: https://duettoresearch.atlassian.net/wiki/spaces/PROD/pages/1911849215

Key rules for **data tables**:
- Numbers: **right-aligned** (including column headers). Dates and non-numerical values: left-aligned.
- No compact/abbreviated notation in tables — use full values with locale separators
- Decimals recommended for pricing; whole numbers acceptable for large revenue values
- Currency symbol: show in display mode, **omit in edit mode**
- Currency code: show only when currency differs from user's local currency
- Negative values: **red text**, use `currencySign: 'accounting'` for currencies
- Use `Intl.NumberFormat(userLocale, { ... })` — never hardcode number formatting

#### AG Grid implementation (required for every numerical column)

Every numerical column in a `ColDef` **must** include both of the following — omitting either is a formatting violation:

1. **`type: 'rightAligned'`** — AG Grid's built-in column type that right-aligns both cell content *and* the column header. Do not try to replicate this with `cellStyle` or `headerClass` — use the built-in type.
2. **`valueFormatter`** — format values with `Intl.NumberFormat`. Never render raw numbers directly.

```tsx
// Currency column
{
  field: 'adr',
  headerName: 'ADR',
  type: 'rightAligned',                          // ← required: aligns cell + header
  valueFormatter: ({ value }) =>
    value != null
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value)
      : '',
}

// Percentage column
{
  field: 'occupancy',
  headerName: 'Occupancy',
  type: 'rightAligned',                          // ← required
  valueFormatter: ({ value }) =>
    value != null
      ? new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }).format(value / 100)                   // raw value is 0–100, divide before formatting
      : '',
}

// Plain number column
{
  field: 'nights',
  headerName: 'Nights',
  type: 'rightAligned',                          // ← required
  valueFormatter: ({ value }) =>
    value != null
      ? new Intl.NumberFormat('en-US').format(value)
      : '',
}
```

### Dates & Times → [`references/date-and-time-formatting.md`](references/date-and-time-formatting.md)
Source: https://duettoresearch.atlassian.net/wiki/spaces/PROD/pages/1915093014

Key rules for **data tables**:
- Dates: **left-aligned** in table cells
- Short date format (most common): `dateStyle: 'short'` → `2/1/23`
- Month + Year: `{ month: 'short', year: 'numeric' }` → `Feb 2023`
- Day + Month: `{ month: 'short', day: 'numeric' }` → `Apr 30`
- Date ranges: en dash with spaces → `1/10/07 – 1/10/08`, use `formatRange()`
- Leading zeros in **edit mode only** (e.g. 09/01/2023)
- Separator style (slash/dot/hyphen) and AM/PM casing determined by user locale (`Intl.DateTimeFormat`)
- Day of week stays in the same column as the date — no separate column

---

## 13. Component Index — Figma & Storybook Reference

The full Figma node ID and Storybook name mapping is in [`references/component-index.md`](references/component-index.md).

Consult it when you need a node ID for `get_design_context` / `get_screenshot`, or a Storybook name to target a Code Intelligence query.

### Component-Specific Usage Guides

Detailed usage guidelines (when-to-use, code patterns, prop tables, anti-patterns) are in the files below. Consult these before writing any usage of the relevant component.

| Component | Usage Guide |
|---|---|
| Button | [`references/button-usage.md`](references/button-usage.md) |

---

## 14. Summary Checklist

Before submitting any UI code, verify **in this order**:

**Step 1 — Code Intelligence (MUST come first)**
- [ ] Queried Duetto Code Intelligence for existing patterns (`smart_query` / `search_code`)
- [ ] Verified component props and import paths against real source files
- [ ] Checked for app-shell-level concerns (e.g., header/nav is NOT rendered by individual pages)
- [ ] Added any new architectural discoveries to the verified facts table in Section 1

**Step 2 — Figma**
- [ ] Checked Figma design system file for visual specs (use Component Index in Section 13)
- [ ] Confirmed design tokens match real MUI theme mappings (Section 7)

**Step 3 — Code quality**
- [ ] Followed the 3-tier component hierarchy (Duetto → MUI styled → net-new)
- [ ] Asked before creating any net-new component not in Duetto library or MUI
- [ ] Written in TypeScript with proper types
- [ ] Followed the repo's file/folder structure
- [ ] Used theme tokens for colors and spacing (no hardcoded hex values)
- [ ] Used `makeStyles` with `theme.*` references — never inline hex codes
- [ ] No Figma asset URLs used as `src` values — use existing library components instead
- [ ] Form state managed with plain React `useState` — do NOT use Formik (not a direct dependency of `duetto-frontend`)
- [ ] Every numerical AG Grid column has `type: 'rightAligned'` **and** a `valueFormatter` using `Intl.NumberFormat` (see Section 12)
