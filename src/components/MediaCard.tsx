"use client";

import { useRef, useState } from "react";
import type { CatalogItem } from "@/lib/types";
import { mediaUrl } from "@/lib/media";
import { categoryLabel } from "@/lib/catalog";
import { Heart } from "./Icons";

interface Props {
  item: CatalogItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (item: CatalogItem) => void;
  index: number;
}

export default function MediaCard({
  item,
  isFavorite,
  onToggleFavorite,
  onOpen,
  index,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);
  const url = mediaUrl(item.path);
  const isVideo = item.type === "meme";

  function handleEnter() {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }
  function handleLeave() {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ animationDelay: `${Math.min(index, 16) * 28}ms` }}
      className="group relative block w-full animate-fade-up overflow-hidden rounded-2xl border border-line bg-card text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-wham/40 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-wham"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-bg-alt">
        {errored ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ember p-4 text-center">
            <span className="text-2xl">💥</span>
            <span className="line-clamp-2 text-xs font-semibold text-gold-soft">
              {item.title || "Coming soon"}
            </span>
          </div>
        ) : isVideo ? (
          <video
            ref={videoRef}
            src={url}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={url}
            alt={item.title || `${categoryLabel(item.category)} sticker`}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.05]"
          />
        )}

        {/* gradient scrim for legibility on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* type chip */}
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {item.type}
        </span>

        {/* favourite */}
        <span
          role="button"
          tabIndex={0}
          aria-label={isFavorite ? "Remove favourite" : "Add favourite"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(item.id);
            }
          }}
          className={`absolute right-2.5 top-2.5 grid h-8 w-8 cursor-pointer place-items-center rounded-full backdrop-blur-sm transition-all active:scale-90 ${
            isFavorite
              ? "bg-white text-danger"
              : "bg-black/45 text-white hover:bg-white hover:text-danger"
          }`}
        >
          <Heart filled={isFavorite} width={16} height={16} className={isFavorite ? "animate-pop" : ""} />
        </span>
      </div>

      {item.title && (
        <div className="px-3 py-2.5">
          <p className="line-clamp-1 text-sm font-semibold text-ink">
            {item.title}
          </p>
          <p className="label mt-0.5 text-ink-mute">
            {categoryLabel(item.category)}
          </p>
        </div>
      )}
    </button>
  );
}
