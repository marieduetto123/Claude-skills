/**
 * Hotel Revenue Management Metric Labels & Abbreviations
 * Use this in your prototype for consistent terminology
 * Full names by default, abbreviations for space-constrained contexts
 */

export const HOTEL_METRICS = {
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
  nrevpar: { full: "Net Revenue Per Available Room", abbr: "NRevPAR" },
  bar: { full: "Best Available Rate", abbr: "BAR" },
  bookingWindow: { full: "Booking Window", abbr: "BW" },
  forecast: { full: "Forecast", abbr: "Fcst" },
} as const;

type MetricKey = keyof typeof HOTEL_METRICS;

/**
 * Get the appropriate label (full or abbreviated) based on space constraints
 * @param metricKey - The metric identifier (e.g., 'adr', 'revpar')
 * @param isCompact - If true, use abbreviation; if false, use full term
 * @returns The full or abbreviated label
 */
export function getMetricLabel(
  metricKey: MetricKey,
  isCompact: boolean = false
): string {
  const metric = HOTEL_METRICS[metricKey];
  if (!metric) {
    console.warn(`Unknown metric: ${metricKey}`);
    return metricKey;
  }
  return isCompact ? metric.abbr : metric.full;
}

/**
 * Get both full and abbreviated labels for a metric
 * Useful for tooltips and responsive displays
 */
export function getMetricLabels(metricKey: MetricKey) {
  const metric = HOTEL_METRICS[metricKey];
  return metric || { full: metricKey, abbr: metricKey };
}

/**
 * Create AG Grid column header definition
 * Automatically chooses full/abbreviated based on column width
 */
export function createMetricColumn(
  field: string,
  metricKey: MetricKey,
  width?: number,
  options?: Record<string, any>
) {
  const metric = HOTEL_METRICS[metricKey];
  const isNarrow = width ? width < 120 : false;

  return {
    field,
    headerName: getMetricLabel(metricKey, isNarrow),
    headerTooltip: metric?.full,
    width,
    ...options,
  };
}

/**
 * Pre-configured AG Grid columns for common hotel metrics
 * Use these directly or customize as needed
 */
export const GRID_COLUMNS = {
  revpar: createMetricColumn("revpar", "revpar"),
  adr: createMetricColumn("adr", "adr"),
  occupancy: createMetricColumn("occupancy", "occupancy", 100),
  pickup: createMetricColumn("pickup", "pickup", 100),
  avgLeadTime: createMetricColumn("avgLeadTime", "avgLeadTime", 100),
  totalGuests: createMetricColumn("totalGuests", "totalGuests", 100),
  availableRooms: createMetricColumn("availableRooms", "availableRooms", 80),
};

/**
 * Metric category enum for organizing displays
 */
export enum MetricCategory {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  FINANCIAL = "financial",
  FORECASTING = "forecasting",
}

/**
 * Get metrics by category
 */
export const PRIMARY_METRICS = [
  "revpar",
  "adr",
  "occupancy",
  "pickup",
  "avgLeadTime",
  "avgAdults",
  "avgChildren",
  "totalGuests",
  "availableRooms",
] as const;

export const SECONDARY_METRICS = [
  "los",
  "goppar",
  "trevpar",
  "nrevpar",
  "bar",
  "bookingWindow",
  "forecast",
] as const;
