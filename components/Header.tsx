import Image from "next/image";
import "@/styles/header.scss";

export default function Header() {
  return (
    <header className="main-header">
      <div className="main-header__inner">
        {/* LOGO MARVEL */}
        <div className="main-header__logo">
          <Image
            src="/marvel_logo.svg"
            alt="Marvel Logo"
            width={130}
            height={52}
            priority
          />
        </div>

        {/* FAVORITES COUNTER */}
        <div className="main-header__favorites">
          <Image
            src="/fav_default.svg"
            alt="Favorites"
            width={18}
            height={18}
          />
          <span className="main-header__fav-count">3</span>
        </div>
      </div>
    </header>
  );
}
