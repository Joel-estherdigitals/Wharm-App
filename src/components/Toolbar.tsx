"use client";

import type { CategoryInfo, TypeFilter } from "@/lib/catalog";
import { Dice, Heart, Search, Close } from "./Icons";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  type: TypeFilter;
  setType: (t: TypeFilter) => void;
  counts: { all: number; memes: number; stickers: number };
  categories: CategoryInfo[];
  activeCategory: string | null;
  setCategory: (key: string | null) => void;
  favOnly: boolean;
  setFavOnly: (v: boolean) => void;
  favCount: number;
  onShuffle: () => void;
  resultCount: number;
}

const TYPES: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "meme", label: "Memes" },
  { key: "sticker", label: "Stickers" },
];

export default function Toolbar(props: Props) {
  const {
    search,
    setSearch,
    type,
    setType,
    counts,
    categories,
    activeCategory,
    setCategory,
    favOnly,
    setFavOnly,
    favCount,
    onShuffle,
    resultCount,
  } = props;

  return (
    <div className="sticky top-[61px] z-20 -mx-4 mb-6 border-b border-line/60 bg-bg/85 px-4 pb-3 pt-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* search */}
          <div className="relative flex-1">
            <Search
              width={18}
              height={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-mute"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search memes, stickers, tags…"
              className="w-full rounded-full border border-line bg-card py-2.5 pl-11 pr-10 text-sm font-medium text-ink placeholder:text-ink-mute focus:border-wham focus:outline-none focus:ring-4 focus:ring-wham/15"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-mute hover:bg-bg-alt"
              >
                <Close width={14} height={14} />
              </button>
            )}
          </div>

          {/* type segmented control */}
          <div className="flex shrink-0 rounded-full border border-line bg-card p-1">
            {TYPES.map((t) => {
              const n =
                t.key === "all"
                  ? counts.all
                  : t.key === "meme"
                  ? counts.memes
                  : counts.stickers;
              const active = type === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setType(t.key)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-wham-pill text-white shadow-[0_4px_12px_-4px_rgba(255,69,0,0.6)]"
                      : "text-ink-mute hover:text-ink"
                  }`}
                >
                  {t.label}
                  <span className={`ml-1 text-xs ${active ? "text-white/80" : "text-ink-mute"}`}>
                    {n}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onShuffle}
            className="btn-ghost shrink-0"
            title="Surprise me"
          >
            <Dice width={18} height={18} />
            <span className="hidden sm:inline">Shuffle</span>
          </button>
        </div>

        {/* category rail */}
        <div className="no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setFavOnly(!favOnly)}
            className={`pill ${favOnly ? "pill-active" : ""}`}
          >
            <Heart filled={favOnly} width={14} height={14} />
            Favourites
            {favCount > 0 && (
              <span className={favOnly ? "text-white/85" : "text-ink-mute"}>
                {favCount}
              </span>
            )}
          </button>

          <span className="h-5 w-px shrink-0 bg-line" />

          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`pill ${activeCategory === null ? "pill-active" : ""}`}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key === activeCategory ? null : c.key)}
              className={`pill ${activeCategory === c.key ? "pill-active" : ""}`}
            >
              {c.label}
              <span className={activeCategory === c.key ? "text-white/80" : "text-ink-mute"}>
                {c.count}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-2 text-xs font-medium text-ink-mute">
          {resultCount.toLocaleString()} result{resultCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
