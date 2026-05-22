"use client";

import { useEffect, useMemo, useState } from "react";
import { catalog, getCategories, getItem, counts as catCounts } from "@/lib/catalog";
import type { TypeFilter } from "@/lib/catalog";
import type { CatalogItem } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";
import Toolbar from "./Toolbar";
import MediaCard from "./MediaCard";
import PreviewModal from "./PreviewModal";
import EmptyState from "./EmptyState";

const categories = getCategories();
const totals = catCounts();

export default function Browser() {
  const { favorites, isFavorite, toggle, ready } = useFavorites();

  const [search, setSearch] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [favOnly, setFavOnly] = useState(false);
  const [openItem, setOpenItem] = useState<CatalogItem | null>(null);

  // Open the deep-linked item (/?m=<id>) once, on mount.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("m");
    const item = getItem(id);
    if (item) setOpenItem(item);
  }, []);

  function open(item: CatalogItem) {
    setOpenItem(item);
    const url = new URL(window.location.href);
    url.searchParams.set("m", item.id);
    window.history.replaceState(null, "", url);
  }

  function close() {
    setOpenItem(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("m");
    window.history.replaceState(null, "", url);
  }

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const favSet = new Set(favorites);
    return catalog.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      if (activeCategory && item.category !== activeCategory) return false;
      if (favOnly && !favSet.has(item.id)) return false;
      if (q) {
        const haystack = `${item.title} ${item.tags.join(" ")} ${item.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, type, activeCategory, favOnly, favorites]);

  function shuffle() {
    if (results.length === 0) return;
    const pick = results[Math.floor(Math.random() * results.length)];
    open(pick);
  }

  function resetFilters() {
    setSearch("");
    setType("all");
    setActiveCategory(null);
    setFavOnly(false);
  }

  return (
    <>
      <Toolbar
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        counts={totals}
        categories={categories}
        activeCategory={activeCategory}
        setCategory={setActiveCategory}
        favOnly={favOnly}
        setFavOnly={setFavOnly}
        favCount={ready ? favorites.length : 0}
        onShuffle={shuffle}
        resultCount={results.length}
      />

      <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6">
        {results.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {results.map((item, i) => (
              <MediaCard
                key={item.id}
                item={item}
                index={i}
                isFavorite={ready && isFavorite(item.id)}
                onToggleFavorite={toggle}
                onOpen={open}
              />
            ))}
          </div>
        )}
      </div>

      <PreviewModal
        item={openItem}
        isFavorite={openItem ? isFavorite(openItem.id) : false}
        onToggleFavorite={toggle}
        onClose={close}
      />
    </>
  );
}
