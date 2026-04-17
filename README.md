# REA Integration Docs

A local, markdown-native mirror of the [REA Group Partner Platform](https://partner.realestate.com.au/) developer documentation, generated for AI coding agents.

## Why this exists

The live REA Partner Platform docs sit behind Cloudflare bot protection, which makes them difficult for AI agents to read directly during integration work. This repository snapshots the public docs into plain markdown so that an agent — without needing network access or a browser — can:

- Understand the REA API surface (Listings, Leads, Webhooks, Integrations, Customer Profile, Campaigns, etc.)
- Read authentication, authorisation, rate limiting, and response conventions
- Look up REAXML element specifications
- Reference deep-link patterns, webhook payloads, and migration guides
- Plan and implement integrations against REA APIs without guessing

The target consumer is an LLM-based coding agent working on a project that integrates with realestate.com.au. Each page is saved as standalone markdown with a frontmatter block recording the source URL and fetch timestamp, so an agent can cite the original source and know how stale the snapshot is.

## What's in here

```
pages/                          # Mirrored docs, one .md per page
  index.md                      # Landing page
  getting-started/
    overview.md
    authentication.md
    authorization.md
    responses.md
    rate-limiting.md
  listing-upload/
    overview.md
    usage.md
    elements.md
    examples.md
    ...
  leads/
  webhooks/
  integrations/
  customer-profile/
  campaign/
  pricing/
  tenant-selection/
  connection-leads/
  ratings-reviews/
  deep-links/
  guides/
  ...

fetch.mjs                       # Generator script (Playwright + Turndown)
package.json                    # Standalone — not linked to any parent project
```

Each markdown file has frontmatter:

```yaml
---
title: "Page Title"
source: https://partner.realestate.com.au/some/path/
fetched_at: 2026-04-17T00:00:00.000Z
---
```

Internal links between pages are rewritten to relative `.md` paths so an agent can traverse the docs offline.

## Intended use by AI agents

When asked to implement or debug an REA integration, an agent should:

1. Search `pages/` for the relevant API (e.g. `pages/leads/` for Leads API, `pages/listing-upload/` for Listing Upload API).
2. Start from the API's `overview.md` to understand scope, then read `usage.md` for request/response patterns.
3. Check `pages/getting-started/authentication.md` and `pages/getting-started/authorization.md` for the auth model.
4. Consult `pages/getting-started/rate-limiting.md` before implementing retries/backoff.
5. Verify any claim against the `source` URL in the page's frontmatter before quoting it to a human.

Snapshots drift — if a page says something that looks inconsistent with current REA behaviour, prefer the live site and flag the discrepancy. Check `fetched_at` to see how old the snapshot is.

## Regenerating the snapshot

From this directory:

```bash
npm install            # installs Playwright + Turndown, downloads Chromium
npm run fetch          # first run — headed, in case Cloudflare shows a challenge
npm run fetch:headless # subsequent runs, after auth state is cached
npm run fetch:force    # re-fetch everything, overwriting existing files
```

Flags:

- `--limit=N` — only process the first N URLs from the sitemap (smoke test)
- `--force` — overwrite existing markdown files
- `--headless` — skip the browser UI (requires cached auth state from a prior headed run)

The generator:

1. Loads `https://partner.realestate.com.au/` in real Chromium to clear any Cloudflare challenge
2. Caches the passing session to `.cache/auth-state.json` (gitignored)
3. Reads `/sitemap-index.xml` to enumerate every doc page
4. Extracts `main[data-pagefind-body]`, strips navigation / footer / banner chrome
5. Converts to markdown with Turndown — code blocks preserve language hints, SVG icons stripped
6. Writes to `pages/<url-path>.md` with frontmatter

If the initial warmup shows a Cloudflare challenge, complete it in the browser window that opens and rerun.

## Source & attribution

All content under `pages/` is derived from <https://partner.realestate.com.au/> and is the property of REA Group Ltd. This repository exists purely as a local cache for AI-assisted development; for anything authoritative, go to the live site.
