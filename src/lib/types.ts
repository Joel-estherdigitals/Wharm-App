export type MediaType = "meme" | "sticker";

export interface CatalogItem {
  id: string;
  type: MediaType;
  category: string;
  /** Relative key inside the R2 bucket, e.g. "memes/naija/foo.mp4". */
  path: string;
  /** Human title. Empty for auto-named stickers. */
  title: string;
  tags: string[];
}
