/**
 * Builds a full media URL pointing at Cloudflare R2.
 *
 * Catalog paths keep their original filenames, which contain spaces and even
 * emoji (e.g. "memes/naija/African boy crying then laughing meme😂.mp4").
 * Those are valid R2 object keys but must be percent-encoded per segment to be
 * a valid URL. We encode each path segment and rejoin with "/".
 */

const RAW_BASE = process.env.NEXT_PUBLIC_R2_BASE_URL ?? "";

// Strip any trailing slash so we don't end up with a double slash.
const BASE = RAW_BASE.replace(/\/+$/, "");

export function mediaUrl(path: string): string {
  const key = path.replace(/^\/+/, "");
  const encoded = key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  if (!BASE) {
    // Surfaces a clear signal in dev if the env var isn't set yet.
    return `/__R2_BASE_URL_NOT_SET__/${encoded}`;
  }
  return `${BASE}/${encoded}`;
}

export function isMediaConfigured(): boolean {
  return BASE.length > 0;
}
