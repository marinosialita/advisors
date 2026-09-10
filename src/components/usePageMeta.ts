import { useEffect } from 'react';

const SITE = 'https://sc-advisors.com.cy';
const DEFAULT_TITLE = 'SC Advisors — Smart & Compliant Advisors | Limassol, Cyprus';
const DEFAULT_DESCRIPTION =
  'SC Advisors is a licensed administrative service provider regulated by CySEC. Trusted experts since 2014 — corporate, legal, migration, financial and private-client services for 200+ companies and 100+ family offices across 15 regions.';

/**
 * Sets document.title + meta[name=description] + og: equivalents + a
 * SELF-REFERENCING canonical for the current route, and restores the site
 * defaults on unmount. Every indexable route should call this — search
 * snippets and crawl deduplication depend on it.
 */
export default function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const canonical = `${SITE}${window.location.pathname}`;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', desc);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', desc);
    set('meta[property="og:url"]', 'content', canonical);

    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = canonical;

    return () => {
      document.title = DEFAULT_TITLE;
      set('meta[name="description"]', 'content', DEFAULT_DESCRIPTION);
      if (link) link.href = `${SITE}/`;
    };
  }, [title, description]);
}

/** Standalone canonical setter for pages that manage their own meta. */
export function useCanonical(path: string) {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) return;
    const prev = link.href;
    link.href = `${SITE}${path}`;
    return () => {
      link.href = prev;
    };
  }, [path]);
}
