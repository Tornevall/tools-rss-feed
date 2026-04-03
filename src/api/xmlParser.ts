import type { FeedItem } from '../types/rss';
import { parseDate } from '../utils/date';
import { stripHtml, decodeEntities } from '../utils/text';

function getText(el: Element | null, tag: string): string {
  if (!el) return '';
  const node = el.querySelector(tag);
  return node ? decodeEntities(node.textContent ?? '') : '';
}

function getAttr(el: Element | null, tag: string, attr: string): string {
  if (!el) return '';
  const node = el.querySelector(tag);
  return node ? (node.getAttribute(attr) ?? '') : '';
}

/**
 * Parse Atom feed entries from a Document.
 */
function parseAtom(doc: Document): FeedItem[] {
  const feedTitle = doc.querySelector('feed > title')?.textContent ?? '';
  const entries = Array.from(doc.querySelectorAll('entry'));
  return entries.map((entry): FeedItem => {
    const id = getText(entry, 'id') || getText(entry, 'link');
    const title = getText(entry, 'title');
    const link =
      entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ??
      entry.querySelector('link')?.getAttribute('href') ??
      '';
    const summary = stripHtml(getText(entry, 'summary') || getText(entry, 'content'));
    const content = getText(entry, 'content') || getText(entry, 'summary');
    const rawDate =
      getText(entry, 'published') ||
      getText(entry, 'updated') ||
      getText(entry, 'dc\\:date');
    const category =
      entry.querySelector('category')?.getAttribute('term') ??
      entry.querySelector('category')?.textContent ??
      '';

    return {
      id,
      title: decodeEntities(title),
      link,
      summary,
      content,
      publishedAt: parseDate(rawDate),
      sourceTitle: decodeEntities(feedTitle),
      category,
    };
  });
}

/**
 * Parse RSS 2.0 feed items from a Document.
 */
function parseRss2(doc: Document): FeedItem[] {
  const channelTitle = doc.querySelector('channel > title')?.textContent ?? '';
  const items = Array.from(doc.querySelectorAll('item'));
  return items.map((item): FeedItem => {
    const id = getText(item, 'guid') || getText(item, 'link');
    const title = getText(item, 'title');
    const link = getText(item, 'link');
    const descriptionRaw = getText(item, 'description');
    const contentRaw =
      item.querySelector('content\\:encoded')?.textContent ??
      item.querySelector('[nodeName="content:encoded"]')?.textContent ??
      '';
    const content = contentRaw || descriptionRaw;
    const summary = stripHtml(descriptionRaw || contentRaw);
    const rawDate =
      getText(item, 'pubDate') ||
      getText(item, 'dc\\:date') ||
      getAttr(item, 'updated', '');
    const category =
      getText(item, 'category') ||
      (item.querySelector('category')?.textContent ?? '');

    return {
      id,
      title: decodeEntities(title),
      link,
      summary,
      content,
      publishedAt: parseDate(rawDate),
      sourceTitle: decodeEntities(channelTitle),
      category,
    };
  });
}

/**
 * Parse an Atom or RSS XML string into a normalized FeedItem array.
 */
export function parseXmlFeed(xmlString: string): FeedItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Invalid XML: ' + (parseError.textContent ?? 'parse error'));
  }

  const root = doc.documentElement;
  if (!root) throw new Error('Empty XML document');

  // Detect Atom vs RSS
  if (root.tagName === 'feed' || root.getAttribute('xmlns')?.includes('atom')) {
    return parseAtom(doc);
  }

  if (root.tagName === 'rss' || root.tagName === 'rdf:RDF') {
    return parseRss2(doc);
  }

  // Attempt both as fallback
  const atomItems = parseAtom(doc);
  if (atomItems.length > 0) return atomItems;
  return parseRss2(doc);
}
