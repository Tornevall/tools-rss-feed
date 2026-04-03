/**
 * Truncate text to a maximum length, appending ellipsis if needed.
 */
export function truncate(text: string, maxLength = 200): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Strip HTML tags from a string.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')        // complete tags
    .replace(/<[^>]*$/gm, '')       // dangling/incomplete tags (e.g. <script without closing >)
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Decode basic HTML entities.
 */
export function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&'); // process &amp; last to avoid double-unescaping
}
