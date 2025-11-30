import {
  getFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
  isFavorite,
} from "@/utils/storage";

describe("favorites storage utils", () => {
  beforeEach(() => {
    // Clean localStorage before each test
    localStorage.clear();
    clearFavorites();
  });

  test("initially returns empty favorites", () => {
    expect(getFavorites()).toEqual([]);
  });

  test("adds favorite id and persists it", () => {
    addFavorite(123);
    expect(getFavorites()).toEqual(["123"]);
    expect(isFavorite(123)).toBe(true);
  });

  test("does not duplicate ids", () => {
    addFavorite(123);
    addFavorite(123);
    expect(getFavorites()).toEqual(["123"]);
  });

  test("removes favorite id", () => {
    addFavorite(1);
    addFavorite(2);
    removeFavorite(1);
    expect(getFavorites()).toEqual(["2"]);
    expect(isFavorite(1)).toBe(false);
  });

  test("toggleFavorite adds if not present, removes if present", () => {
    toggleFavorite(7);
    expect(getFavorites()).toEqual(["7"]);
    toggleFavorite(7);
    expect(getFavorites()).toEqual([]);
  });
});
