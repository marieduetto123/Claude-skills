# Currency and Numerical Display Guide

> Source: https://duettoresearch.atlassian.net/wiki/spaces/PROD/pages/1911849215/Currency+and+Numerical+Display+Guide  
> Status: Done | Last updated: Nov 2024

## Goals

1. Display consistently across the application
2. Use AG Grid's locale callback + `Intl.NumberFormat` for dynamic formatting based on user locale
3. Focus on Efficiency, Legibility, and Localization
4. Adhere to accessibility standards

## Currency Configuration

- **Company default currency**: Settings → Hotel & Company Configuration → Company → Currency Info (Corporate Code + Scale)
- **Per-hotel override**: Settings → Hotels → Select hotel → Custom Fields → Currency
- **User locale** determines compact notation ("22 mil") and separator format (e.g. `EUR 10,400.40` vs `EUR 10.400,40`)

---

## Display Rules by Context

### Data Tables (CDT / AG Grid)

| Attribute | Rule |
|---|---|
| **Rounded whole number** | Yes, if showing a summarized value |
| **Abbreviated (compact)** | ❌ No |
| **Decimals** | Recommended for pricing-related currency. Rounding to whole number is optional for revenue (larger) values |
| **Currency symbol** | Yes, if applicable |
| **Currency code** | Yes, if the currency differs from the user's local currency |
| **Alignment** | **Right-aligned** (numbers + column headers). Non-numerical values and dates → left-aligned |
| **Percentage symbol** | Yes, if applicable |
| **Commas / locale separators** | Yes |
| **Negative values** | Show in **red**. Use `currencySign: 'accounting'` for currencies; use a negative symbol for non-currency values |

### Table Edit Mode

| Attribute | Rule |
|---|---|
| Abbreviated | ❌ No |
| Decimals | Yes (same as display mode) |
| Currency symbol | ❌ No — omit in edit mode |
| Currency code | ❌ No — omit in edit mode |
| Alignment | Left |
| Percentage symbol | ❌ No |
| Commas | Yes |

### Summary Cards

| Attribute | Rule |
|---|---|
| Rounded whole number | Yes |
| Abbreviated (compact) | Yes |
| Decimals | Rounded decimals acceptable (e.g. $1.2M) |
| Currency symbol | Yes, if applicable |
| Currency code | Yes, if currency ≠ user's currency |
| Alignment | Centered |

### Copy / Paste

- No abbreviation, no rounding, no symbols
- Copy the full numerical value
- Paste values without formatting

### Downloads

- Full decimal value (no abbreviation)
- Currency symbol: yes (if applicable)
- Currency code: yes (if currency ≠ user's currency)
- Right-aligned

### Chart Axes

- Abbreviated (compact) notation: Yes
- Decimals: allowed if needed (e.g. $3.1k, 1.5%, 123.45)
- Currency symbol: Yes
- Currency code: No — add next to axis label if not local currency
- Left Y-axis → right-align; X-axis → center; Right Y-axis → left-align

### Chart Tooltips

- No abbreviation, no rounding
- Up to 3 maximum significant digits; round revenue values
- Currency symbol + code (if applicable)
- Right-aligned, with locale separators

### Calendar

- Abbreviated: Yes
- Decimals: up to 3 significant digits
- Centered alignment

---

## Key Q&A Decisions

| Question | Answer |
|---|---|
| Show units in table headers only, or also in cells? | **Show in cells** (current CDT behavior). Omit in edit mode. |
| Currency codes/symbols in edit mode input fields? | **No** — omit in edit mode inside table cells. Punctuation (commas) still shows. |
| Number alignment in tables | Right-aligned, including column headers. Icons go in separate columns; if in same column, allocate extra space so values align vertically. |
| Column widths for wide currency values | Min/max widths defined per column. User can manually resize; resizing persists. |
| Negative numbers | **Red text**. Currency → `currencySign: 'accounting'`. Non-currency → negative symbol. |
| Can I suppress decimals for revenue? | **Yes** |
| When suppressing decimals, round or truncate? | **Round** |

---

## Implementation — `Intl.NumberFormat`

```ts
// Currency (table display)
new Intl.NumberFormat(userLocale, {
  style: 'currency',
  currency: currencyCode,         // e.g. 'USD', 'EUR'
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format(value);

// Negative currency (accounting style)
new Intl.NumberFormat(userLocale, {
  style: 'currency',
  currency: currencyCode,
  currencySign: 'accounting',
}).format(value);

// Abbreviated / compact (summary cards, chart axes)
new Intl.NumberFormat(userLocale, {
  notation: 'compact',
  compactDisplay: 'short',
}).format(value);

// Percentage
new Intl.NumberFormat(userLocale, {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
}).format(value / 100);
```
