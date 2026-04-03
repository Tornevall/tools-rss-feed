/**
 * Format a Date or null to a human-readable string.
 */
export function formatDate(date: Date | null): string {
  if (!date || isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Parse a date string into a Date, returning null if invalid.
 */
export function parseDate(raw: string | null | undefined): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}
