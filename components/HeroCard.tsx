"use client";

import Link from "next/link";
import type { SuperHeroInterface } from "@/types/superheroInterface";
import { useState } from "react";

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
      "
      style={{
        width: "var(--card-width)",
        height: "var(--card-height)",
      }}
    >
      {/* IMAGEN (LINK A DETALLE) */}
      <Link
        href={`/characters/${hero.id}`}
        className="block flex-shrink-0"
        style={{ height: "var(--card-image-height)" }}
      >
        <figure className="m-0 w-full h-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover block"
            loading="lazy"
          />
        </figure>
      </Link>

      {/* FOOTER CARD */}
      <footer
        className="relative flex-shrink-0 overflow-hidden bg-black"
        style={{ height: "var(--card-bottom-height)" }}
      >
        <span className="hero-bar absolute inset-x-0 top-0" />

        <div
          className="
            relative flex items-start justify-between h-full
            uppercase tracking-wide text-white text-xs
          "
          style={{
            paddingTop: "var(--card-bottom-pt)",
            paddingRight: "var(--card-bottom-pr)",
            paddingBottom: "var(--card-bottom-pb)",
            paddingLeft: "var(--card-bottom-pl)",
          }}
        >
          <Link href={`/characters/${hero.id}`} className="flex-1">
            <h2
              className="truncate font-light m-0"
              style={{
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: "14px",
                lineHeight: "1.2",
              }}
            >
              {name}
            </h2>
          </Link>

          {/* Favoritos */}
          <button
            type="button"
            aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
            className="ml-2 flex items-center cursor-pointer relative w-4 h-4"
            onClick={(e) => {
              e.stopPropagation();
              setIsFav((prev) => !prev);
            }}
          >
            {isFav ? (
              <>
                <img
                  src="/fav_default.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-4 h-4 transition-opacity duration-150 group-hover:opacity-0"
                />
                <img
                  src="/fav_white.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-4 h-4 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
              </>
            ) : (
              <img
                src="/fav_unselected.svg"
                alt=""
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
