#!/usr/bin/env node
// Fetch REA Partner Platform docs (https://partner.realestate.com.au/) and
// convert each page to markdown in the `pages/` subdirectory of this folder.
//
// Cloudflare bot protection sits in front of the site, so we drive a real
// Chromium via Playwright. First run is headed so any interactive challenge
// can be passed manually. The resulting storage state is cached and reused
// for subsequent headless runs.
//
// Usage (from this directory):
//   npm install                # also installs Chromium via postinstall
//   npm run fetch              # headed (first run)
//   npm run fetch:headless     # after state is cached
//   npm run fetch:force        # overwrite existing files
//   node fetch.mjs --limit=5   # smoke test

import { chromium } from 'playwright';
import TurndownService from 'turndown';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, 'pages');
const SPEC_DIR = path.join(__dirname, 'openapi');
const CACHE_DIR = path.join(__dirname, '.cache');
const STATE_FILE = path.join(CACHE_DIR, 'auth-state.json');

const BASE = 'https://partner.realestate.com.au';
const SITEMAP_INDEX = `${BASE}/sitemap-index.xml`;

const args = process.argv.slice(2);
const HEADLESS = args.includes('--headless');
const FORCE = args.includes('--force');
const LIMIT = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1] || 0);
const DELAY_MS = 800;

async function fetchText(page, url) {
    const res = await page.request.get(url);
    if (!res.ok()) throw new Error(`GET ${url} -> ${res.status()}`);
    return await res.text();
}

async function fetchSitemapUrls(page) {
    const index = await fetchText(page, SITEMAP_INDEX);
    const locs = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const urls = new Set();

    const looksLikeSitemap = (u) => /sitemap.*\.xml$/i.test(u);

    for (const loc of locs) {
        if (looksLikeSitemap(loc)) {
            const xml = await fetchText(page, loc);
            for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
        } else {
            urls.add(loc);
        }
    }

    return [...urls].filter((u) => u.startsWith(BASE)).sort();
}

function makeTurndown() {
    const td = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        emDelimiter: '_',
    });

    td.addRule('fencedCode', {
        filter: (node) =>
            node.nodeName === 'PRE' &&
            node.firstChild &&
            node.firstChild.nodeName === 'CODE',
        replacement: (_content, node) => {
            const code = node.firstChild;
            const cls = code.getAttribute('class') || '';
            const langMatch = cls.match(/language-(\S+)/);
            const lang = langMatch ? langMatch[1] : '';
            const text = code.textContent.replace(/\n$/, '');
            return `\n\n\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
        },
    });

    td.addRule('stripSvg', {
        filter: (n) => n.nodeName === 'SVG' || n.nodeName === 'svg',
        replacement: () => '',
    });

    td.addRule('stripAnchorLinks', {
        filter: (n) => n.nodeName === 'A' && n.classList?.contains('sl-anchor-link'),
        replacement: () => '',
    });

    return td;
}

function urlPathToRel(urlPath) {
    let p = urlPath.replace(/^\//, '').replace(/\/$/, '');
    if (!p) p = 'index';
    return `${p}.md`;
}

function toRelativeMd(targetPath, currentPath) {
    const [withoutHash, hash = ''] = targetPath.split('#');
    const [pathOnly] = withoutHash.split('?');
    if (!pathOnly.startsWith('/')) return targetPath;

    // Non-page assets (images, files, specs) — return absolute URL so they
    // still resolve when viewed online. Pages end in '/' or have no extension.
    if (/\.[a-z0-9]{2,5}$/i.test(pathOnly)) {
        return `${BASE}${pathOnly}${hash ? '#' + hash : ''}`;
    }

    const targetRel = urlPathToRel(pathOnly);
    const currentRel = urlPathToRel(currentPath);
    const currentDir = path.posix.dirname(currentRel);
    let rel = path.posix.relative(currentDir, targetRel);
    if (!rel.startsWith('.')) rel = './' + rel;
    return hash ? `${rel}#${hash}` : rel;
}

function rewriteLinks(md, currentPath) {
    const baseEsc = BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return md
        .replace(
            new RegExp(`\\]\\(${baseEsc}([^)]*)\\)`, 'g'),
            (_, p) => `](${toRelativeMd(p, currentPath)})`
        )
        .replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${toRelativeMd(p, currentPath)})`);
}

async function exists(p) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}

async function main() {
    await fs.mkdir(OUT_DIR, { recursive: true });
    await fs.mkdir(SPEC_DIR, { recursive: true });
    await fs.mkdir(CACHE_DIR, { recursive: true });

    const storageState = (await exists(STATE_FILE)) ? STATE_FILE : undefined;
    if (!storageState && HEADLESS) {
        console.warn(
            '[warn] No cached auth state and --headless was passed. ' +
                'Run once without --headless to clear any Cloudflare challenge first.'
        );
    }

    const browser = await chromium.launch({ headless: HEADLESS });
    const context = await browser.newContext({
        storageState,
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();

    // Capture OpenAPI spec URLs requested by any page (explore pages fetch them)
    const specUrls = new Set();
    page.on('request', (req) => {
        const u = req.url();
        if (/\/openapi\/[^?]+\.ya?ml/i.test(u)) specUrls.add(u);
    });

    console.log(`[warmup] ${BASE}`);
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90_000 });
    try {
        await page.waitForSelector('main[data-pagefind-body]', { timeout: 60_000 });
    } catch {
        console.error(
            '[warmup] Could not see main content — likely a Cloudflare challenge. ' +
                'If running headed, complete the challenge in the browser window, then rerun.'
        );
        await context.storageState({ path: STATE_FILE });
        await browser.close();
        process.exit(1);
    }
    await context.storageState({ path: STATE_FILE });

    let urls = await fetchSitemapUrls(page);
    if (LIMIT) urls = urls.slice(0, LIMIT);
    console.log(`[sitemap] ${urls.length} urls`);

    const td = makeTurndown();
    let ok = 0;
    let failed = 0;
    let skipped = 0;

    for (const url of urls) {
        const urlPath = new URL(url).pathname;
        const outRel = urlPathToRel(urlPath);
        const outPath = path.join(OUT_DIR, outRel);

        if (!FORCE && (await exists(outPath))) {
            skipped++;
            continue;
        }

        try {
            console.log(`[fetch] ${url}`);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
            await page.waitForSelector('main[data-pagefind-body]', { timeout: 30_000 });

            // "Explore" pages render an async API reference component.
            // Wait until the main element has meaningful content, or give up.
            if (/\/explore\/?$/.test(urlPath)) {
                await page
                    .waitForLoadState('networkidle', { timeout: 20_000 })
                    .catch(() => {});
                await page
                    .waitForFunction(
                        () => {
                            const m = document.querySelector('main[data-pagefind-body]');
                            return m && m.innerText.length > 1500;
                        },
                        { timeout: 20_000 }
                    )
                    .catch(() => {});
            }

            const { title, html } = await page.evaluate(() => {
                const main = document.querySelector('main[data-pagefind-body]');
                if (!main) return { title: document.title, html: '' };
                main.querySelectorAll(
                    'header, nav, footer, [data-pagefind-ignore], .sl-banner, ' +
                        'starlight-theme-select, starlight-menu-button, ' +
                        'site-search, sl-sidebar-state-persist, script, style'
                ).forEach((el) => el.remove());
                const h1 = main.querySelector('h1');
                return {
                    title: (h1?.textContent || document.title).trim(),
                    html: main.innerHTML,
                };
            });

            if (!html) throw new Error('empty content');

            let md = td.turndown(html);
            md = rewriteLinks(md, urlPath);
            md = md.replace(/\n{3,}/g, '\n\n').trim() + '\n';

            const frontmatter = [
                '---',
                `title: ${JSON.stringify(title)}`,
                `source: ${url}`,
                `fetched_at: ${new Date().toISOString()}`,
                '---',
                '',
                '',
            ].join('\n');

            await fs.mkdir(path.dirname(outPath), { recursive: true });
            await fs.writeFile(outPath, frontmatter + md, 'utf8');
            ok++;
            await new Promise((r) => setTimeout(r, DELAY_MS));
        } catch (err) {
            failed++;
            console.error(`[error] ${url} — ${err.message}`);
        }
    }

    // Download any OpenAPI specs referenced by explore pages
    let specsOk = 0;
    let specsFail = 0;
    for (const specUrl of specUrls) {
        const filename = path.basename(new URL(specUrl).pathname);
        const outPath = path.join(SPEC_DIR, filename);
        if (!FORCE && (await exists(outPath))) continue;
        try {
            console.log(`[spec] ${specUrl}`);
            const text = await fetchText(page, specUrl);
            await fs.writeFile(outPath, text, 'utf8');
            specsOk++;
        } catch (err) {
            specsFail++;
            console.error(`[spec-error] ${specUrl} — ${err.message}`);
        }
    }

    await context.storageState({ path: STATE_FILE });
    await browser.close();
    console.log(
        `[done] pages ok=${ok} skipped=${skipped} failed=${failed} | specs ok=${specsOk} failed=${specsFail}`
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
