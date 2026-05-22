import raw from "@/data/catalog.json";
import type { CatalogItem, MediaType } from "./types";

export const catalog = raw as CatalogItem[];

const byId = new Map(catalog.map((item) => [item.id, item]));

export function getItem(id: string | null | undefined): CatalogItem | undefined {
  if (!id) return undefined;
  return byId.get(id);
}

/** Pretty labels for the category keys present in the catalog. */
const CATEGORY_LABELS: Record<string, string> = {
  naija: "Naija",
  reactions: "Reactions",
  laughing: "Laughing",
  dance: "Dance",
  sad: "Sad",
  birthday: "Birthday",
  love: "Love",
  sports: "Sports",
  awkward: "Awkward",
  random: "Random",
  stickers: "Stickers",
};

export function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

export interface CategoryInfo {
  key: string;
  label: string;
  count: number;
}

/** Categories that contain at least one item, sorted by count desc. */
export function getCategories(): CategoryInfo[] {
  const counts = new Map<string, number>();
  for (const item of catalog) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, label: categoryLabel(key), count }))
    .sort((a, b) => b.count - a.count);
}

export function counts(): { all: number; memes: number; stickers: number } {
  let memes = 0;
  let stickers = 0;
  for (const item of catalog) {
    if (item.type === "meme") memes++;
    else stickers++;
  }
  return { all: catalog.length, memes, stickers };
}

export type TypeFilter = "all" | MediaType;
