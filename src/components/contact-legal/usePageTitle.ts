import { useEffect } from 'react';

const DEFAULT_TITLE = 'SC Advisors — Smart & Compliant Advisors | Limassol, Cyprus';

/** Sets document.title for the page and restores the site default on unmount. */
export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
