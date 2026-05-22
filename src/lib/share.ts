import type { CatalogItem } from "./types";

/** The canonical origin used to build shareable links. */
export function siteOrigin(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://whamr.vercel.app";
}

/** A deep link that opens Whamr on a specific item: /?m=<id> */
export function deepLink(item: CatalogItem): string {
  return `${siteOrigin()}/?m=${encodeURIComponent(item.id)}`;
}

export interface ShareTarget {
  key: string;
  label: string;
  /** Returns the URL to open, or null for special handling (copy / native). */
  href: (item: CatalogItem) => string | null;
}

function shareText(item: CatalogItem): string {
  const name = item.title || (item.type === "sticker" ? "this sticker" : "this meme");
  return `${name} — sent the wham 💥`;
}

export const SHARE_TARGETS: ShareTarget[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: (item) =>
      `https://wa.me/?text=${encodeURIComponent(`${shareText(item)} ${deepLink(item)}`)}`,
  },
  {
    key: "telegram",
    label: "Telegram",
    href: (item) =>
      `https://t.me/share/url?url=${encodeURIComponent(deepLink(item))}&text=${encodeURIComponent(shareText(item))}`,
  },
  {
    key: "x",
    label: "X",
    href: (item) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText(item))}&url=${encodeURIComponent(deepLink(item))}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: (item) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(deepLink(item))}`,
  },
  {
    key: "reddit",
    label: "Reddit",
    href: (item) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(deepLink(item))}&title=${encodeURIComponent(item.title || "Whamr")}`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: (item) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(deepLink(item))}`,
  },
  {
    key: "pinterest",
    label: "Pinterest",
    href: (item) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(deepLink(item))}&description=${encodeURIComponent(item.title || "Whamr")}`,
  },
  {
    key: "email",
    label: "Email",
    href: (item) =>
      `mailto:?subject=${encodeURIComponent(item.title || "A wham from Whamr")}&body=${encodeURIComponent(`${shareText(item)}\n\n${deepLink(item)}`)}`,
  },
  {
    key: "copy",
    label: "Copy link",
    href: () => null, // handled specially in the UI
  },
];
