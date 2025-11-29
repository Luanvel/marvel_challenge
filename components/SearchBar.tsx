"use client";

import Image from "next/image";
import "@/styles/searchbar.scss";

interface SearchBarProps {
  value?: string;
  onChange?: (v: string) => void;
  totalResults?: number;
}

export default function SearchBar({
  value = "",
  onChange,
  totalResults,
}: SearchBarProps) {
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <Image
          src="./search.svg"
          alt="Search icon"
          width={12}
          height={12}
          className="searchbar__icon"
        />

        <input
          type="text"
          className="searchbar__input"
          placeholder="SEARCH A CHARACTER..."
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>

      <p className="searchbar__results">{totalResults} RESULTS</p>
    </div>
  );
}
