# Whamr — Stage 1 Foundation

**Send the wham.** A meme and sticker browser backed by Cloudflare R2, built on
Next.js, ready to deploy on Vercel.

This is **Stage 1**: the foundation the six-feature build plan assumes already
exists. It gives you a fast, account-free browser with search, categories,
favourites, a preview modal, share links, and per-item deep links — all reading
media straight from your R2 bucket.

## What's in here

- **Browse** 220 items (100 memes, 120 stickers) from a typed catalog.
- **Search** across titles, tags, and categories.
- **Filter** by type (All / Memes / Stickers), category, or favourites.
- **Favourites** saved on-device (localStorage), in sync across tabs.
- **Preview modal** with autoplay video, download, favourite, and a 9-target
  share sheet.
- **Deep links**: `/?m=<id>` opens Whamr on a specific item, so shared links
  land the recipient on the right one.
- **Reads media from R2** with per-segment URL encoding (handles spaces and
  emoji in filenames) and a graceful placeholder for anything not uploaded yet.

## Getting started locally

```bash
npm install
cp .env.example .env.local   # then edit it (see below)
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable                  | What it's for                                              |
| ------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_R2_BASE_URL` | Base URL your R2 media is served from. **No trailing slash.** |
| `NEXT_PUBLIC_SITE_URL`    | Canonical site URL, used to build shareable deep links.    |

`NEXT_PUBLIC_R2_BASE_URL` is either:

- your R2 public bucket URL — `https://pub-xxxxxxxx.r2.dev`, or
- a custom domain connected to the bucket — `https://media.whamr.com` (better:
  cleaner URLs and a real CDN in front).

## How media maps to R2

The catalog stores relative keys exactly as your files are named, e.g.

```
memes/naija/5000 naira pawpaw.mp4
stickers/STK-20201221-WA0004.webp
```

The app builds the final URL as `${NEXT_PUBLIC_R2_BASE_URL}/<key>`, encoding each
path segment. So your R2 objects must use those same keys (folder + original
filename). If your upload uses different keys, update `src/data/catalog.json`
paths to match — that one file is the single source of truth for the library.

Two R2 settings to check:

1. **Public access** — turn on the bucket's public r2.dev URL, or attach a custom
   domain, so the browser can fetch media directly.
2. **CORS** — add a CORS rule allowing `GET` from your site origin. Without it the
   in-browser **Download** falls back to opening the file in a new tab instead of
   saving it. A starting rule:

   ```json
   [{ "AllowedOrigins": ["*"], "AllowedMethods": ["GET"], "AllowedHeaders": ["*"] }]
   ```

   Tighten `AllowedOrigins` to your real domain before launch.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo. Framework auto-detects as Next.js.
3. Add the two environment variables under **Settings → Environment Variables**.
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the final domain once you have it.

## Project structure

```
src/
  app/
    layout.tsx        metadata + OG tags
    page.tsx          header, hero, browser, footer
    globals.css       brand tokens + Tailwind
  components/         Header, Toolbar, MediaCard, PreviewModal,
                      ShareSheet, EmptyState, Browser, Icons
  hooks/
    useFavorites.ts   localStorage favourites
  lib/
    catalog.ts        load + query the catalog
    media.ts          R2 URL builder
    share.ts          deep links + 9 share targets
    types.ts
  data/
    catalog.json      the 220-item library (edit this to add/rename items)
```

## What's next (Stage 2)

The six features from the engineering brief, in build order:

1. **WhatsApp pack export** — real `.wastickers` built in-browser with JSZip.
2. **Bulk photos → stickers** — on-device background removal + pack output.
3. **Backup & restore** — a `.whamr` file so favourites/uploads survive.
4. **Sync code** — cross-device, no account (Vercel KV + two functions).
5. **Import** — `.wastickers` + Telegram packs.
6. **Telegram & Signal export** — via serverless functions.

None of these need accounts, monetisation, or microservices.
