"use client";

import { useEffect, useState } from "react";
import type { CatalogItem } from "@/lib/types";
import { SHARE_TARGETS, deepLink } from "@/lib/share";
import { Check, Copy, Share } from "./Icons";

const CHIP: Record<string, string> = {
  whatsapp: "#25D366",
  telegram: "#229ED9",
  x: "#1A0F00",
  facebook: "#1877F2",
  reddit: "#FF4500",
  linkedin: "#0A66C2",
  pinterest: "#E60023",
  email: "#8A7060",
  copy: "#FFB800",
};

export default function ShareSheet({ item }: { item: CatalogItem }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(deepLink(item));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({
        title: item.title || "Whamr",
        text: "Sent the wham 💥",
        url: deepLink(item),
      });
    } catch {
      /* user dismissed */
    }
  }

  return (
    <div>
      <p className="label mb-2.5 text-ink-mute">Share the wham</p>
      <div className="grid grid-cols-5 gap-2">
        {SHARE_TARGETS.map((t) => {
          const isCopy = t.key === "copy";
          const href = t.href(item);
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                if (isCopy) copyLink();
                else if (href) window.open(href, "_blank", "noopener,noreferrer");
              }}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card px-1 py-2.5 transition-all hover:-translate-y-0.5 hover:border-wham/50 hover:shadow-card active:scale-95"
            >
              <span
                className="grid h-9 w-9 place-items-center rounded-full text-white"
                style={{ background: CHIP[t.key] ?? "#8A7060" }}
              >
                {isCopy ? (
                  copied ? (
                    <Check width={16} height={16} />
                  ) : (
                    <Copy width={16} height={16} />
                  )
                ) : (
                  <span className="text-[13px] font-bold">
                    {t.label.charAt(0)}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold text-ink-soft">
                {isCopy && copied ? "Copied" : t.label}
              </span>
            </button>
          );
        })}

        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card px-1 py-2.5 transition-all hover:-translate-y-0.5 hover:border-wham/50 hover:shadow-card active:scale-95"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-wham-pill text-white">
              <Share width={16} height={16} />
            </span>
            <span className="text-[10px] font-semibold text-ink-soft">More</span>
          </button>
        )}
      </div>

      <p className="mt-3 rounded-lg bg-bg-alt px-3 py-2 text-[11px] leading-relaxed text-ink-mute">
        Heads up: sharing sends a <span className="font-semibold">link</span> to
        this {item.type}, not a sticker file yet. Real WhatsApp pack export is the
        first feature in Stage 2.
      </p>
    </div>
  );
}
