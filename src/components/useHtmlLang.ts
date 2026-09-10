import { useEffect } from 'react';

/** Sets <html lang> for the mounted page and restores it on unmount. */
export default function useHtmlLang(lang: string) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = lang;
    return () => {
      el.lang = prev;
    };
  }, [lang]);
}
