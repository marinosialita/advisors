#!/usr/bin/env python3
"""
Prerender every sitemap route to static HTML (Python Playwright — the node
playwright package is unavailable in this environment).

Run AFTER `vite build`:

    python3 scripts/prerender.py

For each route in dist/sitemap.xml the page is rendered in headless Chromium
(preloader skipped via sessionStorage), the serialized DOM is written to
dist/<route>/index.html. Crawlers and link unfurlers then get full HTML —
title, meta, JSON-LD and body copy — while the SPA still boots on top for
human visitors.
"""

import asyncio
import functools
import http.server
import os
import re
import threading

from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
SETTLE_MS = 4500  # hero load-in + fonts + JSON-LD hooks


def routes_from_sitemap() -> list[str]:
    with open(os.path.join(DIST, 'sitemap.xml'), encoding='utf-8') as f:
        xml = f.read()
    return re.findall(r'<loc>https://sc-advisors\.com\.cy([^<]*)</loc>', xml)


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    """Static dist server with SPA fallback for extensionless paths."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST, **kwargs)

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and '.' not in os.path.basename(self.path.split('?')[0]):
            self.path = '/index.html'
        return super().send_head()

    def log_message(self, *args):  # silence
        pass


async def main() -> None:
    routes = routes_from_sitemap()
    print(f'prerendering {len(routes)} routes from dist/sitemap.xml')

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), SPAHandler)
    port = server.server_address[1]
    threading.Thread(target=server.serve_forever, daemon=True).start()

    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        # Skip the intro preloader on every prerendered page.
        await context.add_init_script("sessionStorage.setItem('sca-visited', '1')")
        page = await context.new_page()

        for route in routes:
            await page.goto(f'http://127.0.0.1:{port}{route}', wait_until='load')
            await page.wait_for_timeout(SETTLE_MS)
            html = await page.content()

            if route == '/':
                out = os.path.join(DIST, 'index.html')
            else:
                out = os.path.join(DIST, route.lstrip('/'), 'index.html')
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with open(out, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f'  ✓ {route} -> {os.path.relpath(out, DIST)} ({len(html) // 1024} KB)')

        await browser.close()

    server.shutdown()
    print('done — dist now serves fully rendered HTML per route')


if __name__ == '__main__':
    asyncio.run(main())
