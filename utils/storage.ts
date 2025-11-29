type FavoriteListener = (favs: string[]) => void;

const STORAGE_KEY = "mc:favorites";
const listeners: FavoriteListener[] = [];

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getFavorites(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch (e) {
    console.error("getFavorites error", e);
    return [];
  }
}

function persistFavorites(favs: string[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch (e) {
    console.error("persistFavorites error", e);
  }
  const snapshot = Array.isArray(favs) ? [...favs] : [];
  listeners.forEach((l) => {
    l(snapshot);
  });
}

export function isFavorite(id: string | number) {
  return getFavorites().includes(String(id));
}

export function addFavorite(id: string | number) {
  const idStr = String(id);
  const favs = getFavorites();
  if (!favs.includes(idStr)) {
    favs.push(idStr);
    persistFavorites(favs);
  }
}

export function removeFavorite(id: string | number) {
  const idStr = String(id);
  const favs = getFavorites().filter((x) => x !== idStr);
  persistFavorites(favs);
}

export function toggleFavorite(id: string | number) {
  const idStr = String(id);
  const favs = getFavorites();
  if (favs.includes(idStr)) {
    removeFavorite(idStr);
  } else {
    addFavorite(idStr);
  }
}

export function clearFavorites() {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
  listeners.forEach((l) => {
    l([]);
  });
}

export function subscribeFavorites(listener: FavoriteListener) {
  listeners.push(listener);
  listener(getFavorites());
  return function unsubscribe() {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}
