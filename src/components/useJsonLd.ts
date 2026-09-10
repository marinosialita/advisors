import { useEffect } from 'react';

/** Injects a JSON-LD <script> into <head> and removes it on unmount. */
export default function useJsonLd(id: string, data: object | null) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `ld-${id}`;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.getElementById(`ld-${id}`)?.remove();
    };
  }, [id, data]);
}
