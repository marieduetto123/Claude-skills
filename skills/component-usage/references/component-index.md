# Component Index — Figma, Storybook & Source File Reference

Use Figma node IDs with `get_design_context` or `get_screenshot` (file `yZ5mR7q3QcSdB24e3PmaX3`). Use Storybook names to target Code Intelligence queries. Use verified file paths to read the real implementation directly — prefer these over Storybook lookups when available.

Storybook sources:
- **frontend**: https://storybook.duettoresearch.com/frontend/
- **components (DSJ)**: https://storybook.duettoresearch.com/components/

> **Verified file path** = confirmed against real source. Blank = not yet verified; use Code Intelligence to locate.

| Figma Component | Node ID | Storybook Name | Storybook Source | Verified File Path | Notes |
|---|---|---|---|---|---|
| App Header | `14682:221779` | DynamicHeader | DSJ | `duetto-shared-javascript/duetto-components/src/DynamicHeader/DynamicHeader.tsx` | ⚠️ App shell only — never inside page components |
| Header | `14682:221779` | Header | DSJ | `duetto-shared-javascript/duetto-components/src/DynamicHeader/DynamicHeader.tsx` | Sub-component of DynamicHeader |
| Breadcrumb | `14682:221779` | Breadcrumb | DSJ | `duetto-shared-javascript/duetto-components/src/Breadcrumb/` | Inside DynamicHeader; contains Property Picker Title |
| Property Picker Title | `5808:34724` | Property Picker Title | DSJ | `duetto-shared-javascript/duetto-components/src/PropertyPickerV2/PropertyPickerTitle/PropertyPickerTitle.tsx` | Right-aligned in breadcrumb trail |
| Drawer | `8480:10851` | WithDrawer | frontend | `duetto-frontend/src/components/Drawer/WithDrawer.tsx` | |
| Top of Page | `14879:8576` | PageHeader | frontend | `duetto-frontend/src/components/PageHeader/PageHeader.tsx` | |
| Mega Menu | `6256:14272` | MegaMenuContainer | DSJ | `duetto-shared-javascript/duetto-components/src/MegaMenu/MegaMenuContainer/MegaMenuContainer.tsx` | See also MegaMenuNavItem, MegaMenuColumn in DSJ |
| Menu | `1693:20722` | Menu | frontend | `duetto-frontend/src/components/Menu/Menu.tsx` | |
| Pagination | `5551:34842` | Pagination | frontend | `duetto-frontend/src/components/Pagination/Pagination.tsx` | |
| Stepper | `13429:1219` | ArrowStepper | frontend | `duetto-frontend/src/components/ArrowStepper/ArrowStepper.tsx` | |
| Sections Navigation | `4719:66008` | TableOfContents | frontend | `duetto-frontend/src/components/TableOfContents/TableOfContents.tsx` | |
| Tabs | `14105:33` | TabBar | frontend | — | No dedicated wrapper; use MUI `Tabs` + `Tab` from `@material-ui/core` directly. Stories at `src/components/TabBar/TabBar.stories.tsx` |
| Button | `11534:2188` | Button | frontend | `duetto-frontend/src/components/Button/Button.tsx` | Tier 1 wrapper exists — use this, not raw MUI Button. See [`button-usage.md`](button-usage.md) for full usage guide. |
| Info Icon | `14026:3702` | — | — | — | Use `@material-ui/icons` directly |
| Radio Button | `12461:18779` | Radio Button | frontend | `duetto-frontend/src/components/RadioButton/RadioButton.tsx` | |
| Checkbox | `12467:301` | CheckboxWithLabel | frontend | `duetto-frontend/src/components/CheckboxWithLabel/CheckboxWithLabel.tsx` | |
| Switch | `12495:3416` | Form Switch | frontend | `duetto-frontend/src/components/HookForm/FormSwitch/FormSwitch.tsx` | Uses react-hook-form context; for uncontrolled use, use MUI Switch from `@material-ui/core` |
| Filters | `5550:26580` | — | — | — | No story; query Code Intelligence for filter pattern |
| Form Actions | `14318:5002` | FormPage | frontend | `duetto-frontend/src/components/FormPage/index.ts` | Use `FormPageActions` from `components/FormPage` |
| Form Page | — | FormPage | frontend | `duetto-frontend/src/components/FormPage/FormPage.tsx` | Uses MUI Container + Paper (elevation=2, square) |
| Form Page Header | — | FormPage | frontend | `duetto-frontend/src/components/FormPage/FormPageHeader/FormPageHeader.tsx` | Wraps PageHeader in `<Box padding={3}>` — no extra padding needed |
| Form Page Body | — | FormPage | frontend | `duetto-frontend/src/components/FormPage/FormPageBody/FormPageBodyStyles.ts` | Has `padding: theme.spacing(0, 3)` built in |
| Multi Select | `10353:9124` | AutocompleteMultiSelect | frontend | `duetto-frontend/src/components/AutocompleteMultiSelect/AutocompleteMultiSelect.tsx` | Also see `src/components/BaseMultiSelect/BaseMultiSelect.tsx` |
| Property Picker | `5808:34724` | Property Picker v3 | DSJ | `duetto-shared-javascript/duetto-components/src/PropertyPickerV3/PropertyPicker.tsx` | v2 in frontend Storybook is deprecated |
| Search Bar | `14288:7062` | — | — | `duetto-frontend/src/components/CheckboxTreeSelect/CheckboxTreeSelect.tsx` | No dedicated story; CheckboxTreeSelect is the tree-based search variant |
| Selector | `15900:1823` | Select | frontend | `duetto-frontend/src/components/Select/Select.tsx` | |
| TextField | `13829:2259` | InputComponent | frontend | `duetto-frontend/src/components/InputComponent/InputComponent.tsx` | ⚠️ Named export — `import { InputComponent }`, not default |
| TextArea | `13853:5020` | InputComponent | frontend | `duetto-frontend/src/components/InputComponent/InputComponent.tsx` | Same component as TextField; pass `multiline` prop |
| Modal | `12360:3812` | Dialogs | frontend | `duetto-frontend/src/components/Dialog/Dialog.tsx` | |
| Progress Indicators | `9176:99742` | LoadingComponent | frontend | `duetto-frontend/src/components/LoadingComponent/LoadingComponent.tsx` | Also see `src/components/Spinner/Spinner.tsx` |
| Tooltip | `4704:65930` | Duetto Tooltip | DSJ | `duetto-shared-javascript/duetto-components/src/DuettoTooltip/` | General UI tooltip; TileTooltip/ChartTooltip are chart-specific |
| Snackbar | `14548:5551` | SnackbarAlert | frontend | `duetto-frontend/src/components/SnackbarAlert/SnackbarAlert.tsx` | |
| Accordion | `11515:155379` | SettingsAccordion | DSJ | `duetto-shared-javascript/duetto-components/src/SettingsAccordion/SettingsAccordion.tsx` | Also: `src/components/SegmentAccordion/` (frontend), `src/components/DateAccordion/` (frontend) |
| Card | `11946:26374` | Card component | frontend | `duetto-frontend/src/components/BasicCard/BasicCard.tsx` | |
| Chip | `14059:8558` | Chip | frontend | `duetto-frontend/src/components/Chip/Chip.tsx` | |
| MUI Icons | `9176:74420` | — | — | — | Import from `@material-ui/icons`; custom: CircleIcon, SaveIcon, FilterFunnelIcon |
| Common Data Table | `14311:42226` | DataTables | frontend | `duetto-frontend/src/components/CommonDataTable/CoreTable/CoreTable.tsx` | |
| Common Data Table Inputs | `14098:8733` | Examples | frontend | `duetto-frontend/src/components/CommonDataTable/CoreTable/CoreTable.tsx` | Same component; see Storybook Examples + Recipes stories for usage patterns |
| Metrics Calendar | `9344:19434` | MetricsCalendar | frontend | `duetto-frontend/src/components/MetricsCalendar/MetricsCalendar.tsx` | |
