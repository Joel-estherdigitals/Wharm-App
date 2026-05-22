"use client";

import { useEffect, useState } from "react";
import type { CatalogItem } from "@/lib/types";
import { mediaUrl } from "@/lib/media";
import { categoryLabel } from "@/lib/catalog";
import { Close, Download, Heart } from "./Icons";
import ShareSheet from "./ShareSheet";

interface Props {
  item: CatalogItem | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export default function PreviewModal({
  item,
  isFavorite,
  onToggleFavorite,
  onClose,
}: Props) {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  const url = mediaUrl(item.path);
  const isVideo = item.type === "meme";
  const filename = item.path.split("/").pop() ?? `${item.id}`;

  async function download() {
    setDownloading(true);
    try {
      const res = await fetch(url, { mode: "cors" });
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // R2 needs a CORS rule for blob download; fall back to opening the file.
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl animate-scale-in flex-col overflow-hidden rounded-t-3xl bg-card shadow-modal sm:flex-row sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70"
        >
          <Close width={18} height={18} />
        </button>

        {/* media */}
        <div className="flex shrink-0 items-center justify-center bg-bg-alt sm:w-1/2">
          <div className="relative aspect-square w-full max-w-md">
            {isVideo ? (
              <video
                src={url}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="h-full w-full object-contain"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={url}
                alt={item.title || `${categoryLabel(item.category)} sticker`}
                className="h-full w-full object-contain p-6"
              />
            )}
          </div>
        </div>

        {/* details */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 sm:p-6">
          <span className="label text-wham">{categoryLabel(item.category)}</span>
          <h2 className="mt-1 text-xl font-extrabold leading-tight text-ink">
            {item.title || `${item.type === "sticker" ? "Sticker" : "Meme"}`}
          </h2>

          {item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 12).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg-alt px-2.5 py-1 text-xs font-medium text-ink-mute"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={
                isFavorite
                  ? "btn flex-1 border border-danger/30 bg-danger/10 text-danger"
                  : "btn-ghost flex-1"
              }
            >
              <Heart filled={isFavorite} width={18} height={18} />
              {isFavorite ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={download}
              disabled={downloading}
              className="btn-primary flex-1"
            >
              <Download width={18} height={18} />
              {downloading ? "Saving…" : "Download"}
            </button>
          </div>

          <div className="mt-5 border-t border-line pt-5">
            <ShareSheet item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
