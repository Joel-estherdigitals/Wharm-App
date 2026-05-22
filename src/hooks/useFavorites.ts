"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "whamr:favorites";
const EVENT = "whamr:favorites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENT));
}

export function useFavorites() {
  // Start empty so server and first client render match; hydrate in effect.
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(read());
    setReady(true);

    const sync = () => setFavorites(read());
    window.addEventListener(EVENT, sync);
    // keep in sync across browser tabs
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) sync();
    });
    return () => {
      window.removeEventListener(EVENT, sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [id, ...current];
    write(next);
    setFavorites(next);
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return { favorites, isFavorite, toggle, ready };
}
