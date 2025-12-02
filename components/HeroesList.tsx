"use client";

import { useMemo, useState } from "react";
import type { SuperHeroInterface } from "@/types/superheroInterface";
import HeroCard from "@/components/HeroCard";
import SearchBar from "@/components/SearchBar";
import "@/styles/hero-list.scss";

interface HeroesListProps {
  heroes: SuperHeroInterface[];
  initialRandomHeroes?: SuperHeroInterface[];
}

export default function HeroesList({
  heroes,
  initialRandomHeroes,
}: HeroesListProps) {
  const [query, setQuery] = useState("");

  // If server provided an initialRandomHeroes we use it, otherwise fallback to slice of heroes
  const initial50 = initialRandomHeroes ?? heroes.slice(0, 50);

  // Filter logic:
  // - no search query -> 50 random heroes
  // - search query -> all heroes matching the name
  const filteredHeroes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initial50;

    return heroes.filter((hero) => hero.name?.toLowerCase().includes(q));
  }, [heroes, query, initialRandomHeroes]);

  return (
    <div className="page-wrapper">
      {/* Search bar + results */}
      <SearchBar
        value={query}
        onChange={setQuery}
        totalResults={filteredHeroes.length}
      />

      <div className="hero-wrapper">
        {/* Cards grid */}
        <section className="w-full px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-9 gap-x-4 gap-y-4">
          {filteredHeroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </section>
      </div>
    </div>
  );
}
