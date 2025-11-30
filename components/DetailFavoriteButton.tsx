"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  isFavorite,
  toggleFavorite,
  subscribeFavorites,
} from "@/utils/storage";

interface DetailFavoriteButtonProps {
  heroId: string | number;
}

export default function DetailFavoriteButton({
  heroId,
}: DetailFavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // Initialize state based on current favorites
    setIsFav(isFavorite(heroId));

    // Keep in sync with global favorites changes
    const unsub = subscribeFavorites((favs) => {
      setIsFav(favs.includes(String(heroId)));
    });

    return unsub;
  }, [heroId]);

  const handleClick = () => {
    toggleFavorite(heroId);
  };

  return (
    <button
      type="button"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className="detail-banner__fav-btn mt-1"
      onClick={handleClick}
    >
      <Image
        src={isFav ? "/fav_default.svg" : "/fav_unselected.svg"}
        alt={isFav ? "favorite selected" : "favorite not selected"}
        width={24}
        height={22}
      />
    </button>
  );
}
