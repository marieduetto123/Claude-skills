---
name: component-usage
description: >
  Duetto Button component usage guidelines. Use this skill when placing,
  choosing, or reviewing Button components in Duetto UI — selecting the
  correct variant, color (priority), and size for a given context.
---

# Button Component — Usage Guidelines

**Figma node:** `11533-1174` (file `yZ5mR7q3QcSdB24e3PmaX3`)
**Storybook:** Button (frontend) — https://storybook.duettoresearch.com/frontend/
**Source file:** `duetto-frontend/src/components/Button/Button.tsx`
**Tier:** 1 — Always use this wrapper. Do NOT use raw MUI `Button` from `@material-ui/core`.

---

## Import

```tsx
import Button from 'components/Button/Button';
```

---

## Core Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'contained' \| 'outlined' \| 'text'` | `'contained'` | Visual style (type) |
| `color` | `'primary' \| 'secondary'` | `'primary'` | Action priority |
| `size` | `'large' \| 'medium' \| 'small'` | `'medium'` | Physical size |
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `startIcon` | `ReactNode` | — | Icon before label |
| `endIcon` | `ReactNode` | — | Icon after label |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

---

## The Three Axes

### Axis 1 — Type (Visual Weight)

| Type | `variant` prop | When to use |
|---|---|---|
| Contained | `'contained'` | Primary focus of a page, form, or modal. Highest visual emphasis. |
| Outline | `'outlined'` | Important but not the primary action. Medium visual weight. |
| Text | `'text'` | Supplementary or inline actions. Lowest visual weight. |

### Axis 2 — Priority

| Priority | `color` prop | When to use |
|---|---|---|
| Primary | `'primary'` | The single most important action in a view |
| Secondary | `'secondary'` | Supporting or alternative actions |

### Axis 3 — Size

| Size | `size` prop | Height | When to use |
|---|---|---|---|
| Large | `'large'` | 44px | Headers, modals, hero actions, high-visibility CTAs |
| Medium | `'medium'` | 36px | Default. Forms, pages, cards, standard workflows |
| Small | `'small'` | 32px | Tables, toolbars, dense UI, secondary utilities |

---

## Usage Patterns

### Form submission (most common)

```tsx
import Button from 'components/Button/Button';
import { FormPage, FormPageHeader, FormPageBody, FormPageActions } from 'components/FormPage';

<FormPage>
  <FormPageHeader title="Create Rate" />
  <FormPageBody>
    {/* form fields */}
  </FormPageBody>
  <FormPageActions>
    <Button variant="outlined" color="primary" onClick={onCancel}>
      Cancel
    </Button>
    <Button variant="contained" color="primary" type="submit" onClick={onSave}>
      Save Changes
    </Button>
  </FormPageActions>
</FormPage>
```

> Always put the primary contained button last (rightmost) in action rows.

### Modal confirmation

```tsx
<DialogActions>
  <Button variant="outlined" color="primary" onClick={onClose}>
    Cancel
  </Button>
  <Button variant="contained" color="primary" onClick={onConfirm}>
    Confirm Booking
  </Button>
</DialogActions>
```

### Table row actions (small size)

```tsx
<Button variant="outlined" color="primary" size="small" onClick={() => onEdit(row)}>
  Edit
</Button>
<Button variant="text" color="primary" size="small" onClick={() => onView(row)}>
  View Details
</Button>
```

### Secondary action

```tsx
<Button variant="contained" color="secondary" onClick={onDuplicate}>
  Duplicate
</Button>
```

### Inline utility / text action

```tsx
<Button variant="text" color="primary" onClick={onViewAll}>
  View All
</Button>
```

### Page header with icon

```tsx
import AddIcon from '@material-ui/icons/Add';

<Button
  variant="contained"
  color="primary"
  size="large"
  startIcon={<AddIcon />}
  onClick={onCreate}
>
  Create Rate
</Button>
```

---

## Scenario → Button Mapping

| Scenario | variant | color | size |
|---|---|---|---|
| Main page action / hero CTA | `'contained'` | `'primary'` | `'large'` |
| Form submission | `'contained'` | `'primary'` | `'medium'` |
| Modal confirmation | `'contained'` | `'primary'` | `'medium'` |
| Secondary page action | `'outlined'` | `'primary'` | `'medium'` |
| Cancel / Back | `'outlined'` | `'primary'` | `'medium'` |
| Optional supporting action | `'outlined'` | `'secondary'` | `'medium'` |
| Duplicate / Add Another | `'contained'` | `'secondary'` | `'medium'` |
| Inline utility | `'text'` | `'primary'` | `'medium'` |
| Learn More / View All | `'text'` | `'primary'` | `'medium'` |
| Dense table action | `'outlined'` | `'primary'` | `'small'` |
| Table text utility | `'text'` | `'primary'` | `'small'` |

---

## Labels

- Keep labels short and action-oriented: **Save**, **Create Rate**, **Confirm Booking**
- Use sentence case consistently
- Avoid vague labels: never **OK**, **Yes**, **Click here**
- For destructive actions, be explicit: **Delete property**, **Remove rate**

---

## Rules

### Do
- Use **one primary contained button** per section, modal, or form
- Default to **medium size** unless a specific use case requires otherwise
- Pair contained + outlined buttons for balanced action hierarchy (e.g., Save + Cancel)
- Use `type="submit"` on form submit buttons
- Put the primary action last (rightmost) in horizontal action rows

### Avoid
- Multiple primary contained buttons side-by-side
- Text buttons for destructive or critical actions
- Small buttons as the main page CTA
- Mixing sizes within the same button group
- Overloading a view with many text buttons

---

## Design Tokens — Colors

All button colors are defined in the Duetto 2026 Design System. Use these token names when referencing in code — never hardcode hex values.

### Token Reference

| Token | Hex | Usage |
|---|---|---|
| `teal/teal-700` | `#006461` | Contained Primary bg (light theme); Text/Outline Primary text |
| `teal/teal-900` | `#053c3c` | Contained Primary bg — Pressed state |
| `teal/teal-50` | `#d7f7ed` | Contained Secondary bg (light theme) |
| `teal/teal-100` | `#5ceade` | Contained Secondary bg — Hover/Pressed state |
| `lucentGreen/lucentGreen-70` | `#c4ff45` | Contained Primary bg (dark theme) |
| `lucentGreen/lucentGreen-200` | `#a9df40` | Contained Primary bg — Hover state (dark theme) |
| `surface/white` | `#ffffff` | Outlined button background; text inverse |
| `surface/muted` | `#f5f5f5` | Button bg — Hover state (light theme) |
| `surface/overlay` | `#eaeeef` | Text button bg — Pressed state (light theme) |
| `grey/grey-600` | `#63696f` | Outlined button border — Default state |
| `grey/grey-700` | `#4f5b60` | Text button bg — Hover state (dark theme); text/secondary |
| `grey/grey-800` | `#354549` | Outlined button border — Hover/Pressed state; dark theme bg |
| `text/primary` | `#1c1c1c` | Label text on light backgrounds |
| `text/secondary` | `#4f5b60` | Label text — Secondary priority (light theme) |
| `text/inverse` | `#ffffff` | Label text on dark/filled backgrounds |
| `text/disabled` | `#aeb4ba` | Label text — Disabled state |
| `border/emphasis` | `#aeb4ba` | Outlined button border — Disabled state |

### Color by Variant & State (Light Theme)

| Variant | State | Background | Border | Label |
|---|---|---|---|---|
| Contained Primary | Default | `teal/teal-700` #006461 | — | `text/inverse` #ffffff |
| Contained Primary | Hover | lighter teal | — | `text/inverse` #ffffff |
| Contained Primary | Pressed | `teal/teal-900` #053c3c | — | `text/inverse` #ffffff |
| Contained Primary | Disabled | `surface/muted` #f5f5f5 | — | `text/disabled` #aeb4ba |
| Contained Secondary | Default | `teal/teal-50` #d7f7ed | — | `text/primary` #1c1c1c |
| Contained Secondary | Hover | `teal/teal-100` #5ceade | — | `text/primary` #1c1c1c |
| Contained Secondary | Pressed | `teal/teal-700` #006461 | — | `text/inverse` #ffffff |
| Contained Secondary | Disabled | `surface/muted` #f5f5f5 | — | `text/disabled` #aeb4ba |
| Outlined Primary | Default | `surface/white` #ffffff | `grey/grey-600` #63696f | `teal/teal-700` #006461 |
| Outlined Primary | Hover | `surface/muted` #f5f5f5 | `grey/grey-800` #354549 | `teal/teal-700` #006461 |
| Outlined Primary | Pressed | `surface/white` #ffffff | `grey/grey-800` #354549 (2px) | `teal/teal-700` #006461 |
| Outlined Primary | Disabled | `surface/white` #ffffff | `border/emphasis` #aeb4ba | `text/disabled` #aeb4ba |
| Outlined Secondary | Default | `surface/white` #ffffff | `grey/grey-600` #63696f | `text/secondary` #4f5b60 |
| Outlined Secondary | Hover | `surface/muted` #f5f5f5 | `grey/grey-800` #354549 | `text/secondary` #4f5b60 |
| Outlined Secondary | Pressed | `surface/white` #ffffff | `grey/grey-800` #354549 (2px) | `text/secondary` #4f5b60 |
| Outlined Secondary | Disabled | `surface/white` #ffffff | `border/emphasis` #aeb4ba | `text/disabled` #aeb4ba |
| Text Primary | Default | transparent | — | `teal/teal-700` #006461 |
| Text Primary | Hover | `surface/muted` #f5f5f5 | — | `teal/teal-700` #006461 |
| Text Primary | Pressed | `surface/overlay` #eaeeef | — | `teal/teal-700` #006461 |
| Text Primary | Disabled | transparent | — | `text/disabled` #aeb4ba |
| Text Secondary | Default | transparent | — | `text/secondary` #4f5b60 |
| Text Secondary | Hover | `surface/muted` #f5f5f5 | — | `text/secondary` #4f5b60 |
| Text Secondary | Pressed | `surface/overlay` #eaeeef | — | `text/secondary` #4f5b60 |
| Text Secondary | Disabled | transparent | — | `text/disabled` #aeb4ba |

### Dark Theme

| Variant | State | Background | Border | Label |
|---|---|---|---|---|
| Contained Primary | Default | `lucentGreen/lucentGreen-70` #c4ff45 | — | `text/primary` #1c1c1c |
| Contained Primary | Hover | `lucentGreen/lucentGreen-200` #a9df40 | — | `text/primary` #1c1c1c |
| Contained Secondary | Default | `grey/grey-800` #354549 | — | `text/inverse` #ffffff |
| Outlined (all) | Default | transparent | `surface/white` #ffffff | `surface/white` #ffffff |
| Outlined (all) | Hover | `grey/grey-700` #4f5b60 | `surface/white` #ffffff | `surface/white` #ffffff |
| Outlined (all) | Pressed | `teal/teal-700` #006461 | `surface/white` #ffffff | `surface/white` #ffffff |
| Text (all) | Default | transparent | — | `surface/white` #ffffff |
| Text (all) | Hover | `grey/grey-700` #4f5b60 | — | `surface/white` #ffffff |
| Text (all) | Pressed | `grey/grey-800` #354549 | — | `surface/white` #ffffff |

---

## Figma Reference

```
get_design_context(fileKey: "yZ5mR7q3QcSdB24e3PmaX3", nodeId: "11533-1174")
get_screenshot(fileKey: "yZ5mR7q3QcSdB24e3PmaX3", nodeId: "11533-1174")
```
