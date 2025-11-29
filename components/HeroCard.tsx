"use client";

import Link from "next/link";
import type { SuperHeroInterface } from "@/types/superheroInterface";
import { useState } from "react";
import "@/styles/hero-card.scss";

interface HeroCardProps {
  hero: SuperHeroInterface;
}

export default function HeroCard({ hero }: HeroCardProps) {
  const name = hero.name ?? "Unknown Hero";
  const imageUrl = hero.images?.lg ?? hero.images?.md;
  const [isFav, setIsFav] = useState(false);

  return (
    <article
      className="
        group
        flex flex-col
        bg-white
        shadow-sm
        overflow-hidden
        hero-card
      "
    >
      {/* IMAGE (LINK TO DETAIL) */}
      <Link
        href={`/characters/${hero.id}`}
        className="block flex-shrink-0 hero-card__image"
      >
        <figure className="m-0 w-full h-full bg-gray-100">
          <img src={imageUrl} alt={name} loading="lazy" />
        </figure>
      </Link>

      {/* FOOTER CARD */}
      <footer className="hero-card__footer">
        <span className="hero-bar absolute inset-x-0 top-0" />

        <div className="relative flex items-start justify-between h-full uppercase tracking-wide text-white text-xs">
          <Link href={`/characters/${hero.id}`} className="flex-1">
            <h2 className="truncate hero-card__name">{name}</h2>
          </Link>

          {/* Favs */}
          <button
            type="button"
            className="hero-card__fav"
            onClick={(e) => {
              e.stopPropagation();
              setIsFav((prev) => !prev);
            }}
          >
            {isFav ? (
              <>
                {/* red NO hover*/}
                <img
                  src="/fav_default.svg"
                  alt="favorite icon selected"
                  aria-hidden="true"
                  className="hero-card__fav-icon hero-card__fav-icon--red"
                />
                {/* white on hover */}
                <img
                  src="/fav_white.svg"
                  alt="favorite icon selected"
                  aria-hidden="true"
                  className="hero-card__fav-icon hero-card__fav-icon--white"
                />
              </>
            ) : (
              // NO fav
              <img
                src="/fav_unselected.svg"
                alt="favorite icon unselected"
                aria-hidden="true"
                className="w-4 h-4"
              />
            )}
          </button>
        </div>
      </footer>
    </article>
  );
}
