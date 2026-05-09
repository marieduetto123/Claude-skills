# Date and Time Formatting Guide

> Source: https://duettoresearch.atlassian.net/wiki/spaces/PROD/pages/1915093014  
> Status: Approved | Last updated: Jun 2024

## Goals

1. Consistent across the application
2. Use `Intl.DateTimeFormat` for dynamic formatting based on user locale
3. Focus on Efficiency, Legibility, and Localization
4. Adhere to accessibility standards

> Examples below use an American (en-US) locale.

---

## Format Reference by Context

### Top of Page

| Format | Example | `Intl` options |
|---|---|---|
| Day + Month + Year | January 31, 2023 | `dateStyle: 'long'` |
| Day + Month + Year + Timestamp | 12/01/2023 at 12:12 PM | `date: 'numeric', hour: 'numeric', minute: 'numeric'` |
| DOW + Day + Month + Year | Thursday, Jan 10, 2008 | `weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'` |
| DOW + Day + Month + Year + Timestamp | Updated Friday, 12/1/2023 at 12:12 PM | `weekday: 'long', date: 'numeric', hour: 'numeric', minute: 'numeric'` |
| Range | May 1, 2023 – April 25, 2024 | `dateStyle: 'long'` |

### Data Table Cells ⭐

| Format | Example | `Intl` options |
|---|---|---|
| Month only | Sep | `month: 'short'` |
| Relative timestamp | Friday, Yesterday, 13 minutes ago | `Intl.RelativeTimeFormat` or `Intl.DurationFormat` |
| Day + Month | Apr 31 | `month: 'short', day: 'numeric'` |
| Month + Year | Feb 2023 | `month: 'short', year: 'numeric'` |
| Day + Month + Year | 2/1/23 | `dateStyle: 'short'` |
| Day + Month + Year + Timestamp | 12/9/20, 7:23 PM | `dateStyle: 'short', timeStyle: 'short', hourCycle: 'h12'` |
| DOW + Day + Month | S, 4/31 or Sat, 4/31 | DOW: `'narrow'` or `'short'`, + day + month numeric |
| DOW + Day + Month + Year | Sat, 4/31/01 | `weekday: 'short', day: 'numeric', month: 'numeric', year: '2-digit'` |

**Table cell alignment: dates must be LEFT-aligned** (regardless of format).

### Date Range in Tables

| Format | Example | `Intl` options |
|---|---|---|
| Month range | Jan – Dec | `month: 'short'` |
| Day + Month range | 1/1 – 12/31 | `month: 'numeric', day: 'numeric'` |
| Month + Year range | Dec 2022 – Nov 2023 | `month: 'short', year: 'numeric'` |
| Full date range | 1/10/07 – 1/10/08 | `dateStyle: 'short'` |

### Date Range Picker (Display)

| Format | Example | `Intl` options |
|---|---|---|
| Month range | January – December | `month: 'long'` |
| Full date range | Jul 15, 2022 – Jul 31, 2022 | `day: 'numeric', month: 'short', year: 'numeric'` |

### Date Range Picker (Edit Mode)

| Format | Example |
|---|---|
| Day + Month | 06/01 – 06/31 |
| Month + Year | Jan 2023 – Jan 2024 |
| Full date | 11/09/2020 – 11/10/2020 |

Show leading zeros in **edit mode only** (e.g. 09/01/2023).

### Chart Axes

| Format | Example | `Intl` options |
|---|---|---|
| Month | Sep | `month: 'short'` |
| Day + Month | Sep 1 | `month: 'short', day: 'numeric'` |
| Month + Year | Jun 23 | show month + day |
| Day + Month + Year | 05/16/23 | show month & day |
| With timestamp | Sep 1, 12 AM | `month: 'short', day: 'numeric', hour: 'numeric'` (omit year) |

### Chart Tooltips

| Format | Example | `Intl` options |
|---|---|---|
| Month | January | `month: 'long'` |
| Day + Month + Year | January 31, 2023 | `dateStyle: 'long'` |
| With timestamp | Sep 1, 3:00 AM | `month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'` |
| DOW + Day + Month + Year | Thursday, Feb 9, 2023 | `weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'` |
| Range | 1/10/07 – 1/10/08 | `dateStyle: 'short'` |

### Notifications

| Format | Example | `Intl` options |
|---|---|---|
| With timestamp | Jan 1, 2023, 2:00 AM | `month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric'` |
| DOW + date | Mon, Jan 1, 2023 | `weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'` |
| Range | Mon, May 5, 2023 – Fri, May 12, 2023 | `weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'` |

---

## Key Q&A Decisions

| Question | Answer |
|---|---|
| Date alignment in table cells | **Left-aligned** — helps scannability and readability |
| Show leading zero before single-digit day? | **Edit mode only** (e.g. 09/01/2023). Recognize input with or without slashes. |
| Day of week in its own column? | **No** — keep DOW in the same column as the date |
| Slash vs dot vs hyphen between date parts? | Determined by **locale settings** (`Intl.DateTimeFormat`) |
| AM vs am for times? | Determined by **locale settings** |
| Date range separator | **En dash (–) with spaces** on both sides: `mm/dd – mm/dd` |

---

## Implementation — `Intl.DateTimeFormat`

```ts
// Table cell: short date (most common)
new Intl.DateTimeFormat(userLocale, { dateStyle: 'short' }).format(date);
// → 2/1/23

// Table cell: month + year
new Intl.DateTimeFormat(userLocale, { month: 'short', year: 'numeric' }).format(date);
// → Feb 2023

// Table cell: day + month
new Intl.DateTimeFormat(userLocale, { month: 'short', day: 'numeric' }).format(date);
// → Apr 31

// Top of page: long date
new Intl.DateTimeFormat(userLocale, { dateStyle: 'long' }).format(date);
// → January 31, 2023

// Tooltip: DOW + date
new Intl.DateTimeFormat(userLocale, {
  weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
}).format(date);
// → Thursday, Feb 9, 2023

// Date range (use formatRange)
new Intl.DateTimeFormat(userLocale, { dateStyle: 'short' }).formatRange(startDate, endDate);
// → 1/10/07 – 1/10/08

// Relative timestamp
new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' }).format(-1, 'day');
// → yesterday
```
