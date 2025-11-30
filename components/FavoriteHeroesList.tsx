"use client";

import { useEffect, useState, useMemo } from "react";
import type { SuperHeroInterface } from "@/types/superheroInterface";
import HeroCard from "@/components/HeroCard";
import SearchBar from "@/components/SearchBar";
import "@/styles/hero-list.scss";
import { getFavorites, subscribeFavorites } from "@/utils/storage";

interface HeroesListProps {
  heroes: SuperHeroInterface[];
}

export default function HeroesList({ heroes }: HeroesListProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    getFavorites()
  );
  const [query, setQuery] = useState("");

  // Keep local favorite ids in sync with global favorites
  useEffect(() => {
    const unsub = subscribeFavorites((favs) => {
      setFavoriteIds(favs);
    });
    return unsub;
  }, []);

  // Show heroes whose id is in favorites
  // Optional search by name (query)
  const favoriteHeroesList = useMemo(() => {
    const q = query.trim().toLowerCase();

    return heroes.filter((hero) => {
      const idStr = String(hero.id);
      const isFav = favoriteIds.includes(idStr);

      if (!isFav) return false;

      if (!q) return true;

      return hero.name?.toLowerCase().includes(q);
    });
  }, [heroes, favoriteIds, query]);

  return (
    <div className="page-wrapper">
      {/* Search bar + results count (only among favorites) */}
      <SearchBar
        value={query}
        onChange={setQuery}
        totalResults={favoriteHeroesList.length}
      />

      <div className="hero-wrapper">
        {/* Cards grid */}
        <section className="w-full px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 gap-x-4 gap-y-4">
          {favoriteHeroesList.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </section>
      </div>
    </div>
  );
}
