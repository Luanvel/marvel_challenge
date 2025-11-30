"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { subscribeFavorites, getFavorites } from "@/utils/storage";
import "@/styles/header.scss";

export default function Header() {
  const [favoritesCount, setFavoritesCount] = useState<number>(
    () => getFavorites().length
  );

  useEffect(() => {
    const unsub = subscribeFavorites((favs) => {
      setFavoritesCount(favs.length);
    });
    return unsub;
  }, []);

  return (
    <header className="main-header">
      <div className="main-header__inner">
        <div className="main-header__logo">
          <Link href="/" aria-label="Go to home">
            <Image
              src="/marvel_logo.svg"
              alt="Marvel Logo"
              width={130}
              height={52}
              priority
            />
          </Link>
        </div>

        {/* FAVORITES COUNTER */}
        <div className="main-header__favorites">
          <Image
            src="/fav_default.svg"
            alt="Favorites"
            width={18}
            height={18}
          />
          <span className="main-header__fav-count">{favoritesCount}</span>
        </div>
      </div>
    </header>
  );
}
