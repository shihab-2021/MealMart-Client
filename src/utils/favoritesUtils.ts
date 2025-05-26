// utils/favoritesUtils.ts

const FAVORITES_KEY = "favoriteMealIds";

// Get current favorites from localStorage
const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save updated array to localStorage
const setFavorites = (ids: string[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
};

// Add meal ID to favorites
export const addToFavorites = (mealId: string) => {
  const favorites = getFavorites();
  if (!favorites.includes(mealId)) {
    favorites.push(mealId);
    setFavorites(favorites);
  }
};

// Remove meal ID from favorites
export const removeFromFavorites = (mealId: string) => {
  const favorites = getFavorites();
  const updated = favorites.filter((id) => id !== mealId);
  setFavorites(updated);
};

// Optional helper to check if a meal is favorited
export const isFavorite = (mealId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(mealId);
};

// Optional helper to get all favorites
export const getFavoriteMeals = (): string[] => {
  return getFavorites();
};
