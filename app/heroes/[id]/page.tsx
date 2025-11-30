import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getHeroes } from "@/lib/superheroApi";
import type { SuperHeroInterface } from "@/types/superheroInterface";
import Header from "@/components/Header";
import DetailFavoriteButton from "@/components/DetailFavoriteButton";
import "@/styles/detail.scss";

interface HeroDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function HeroDetailPage({ params }: HeroDetailPageProps) {
  const { id } = await params;

  const heroes: SuperHeroInterface[] = await getHeroes();

  const hero = heroes.find((h) => String(h.id) === id);
  if (!hero) {
    return notFound();
  }

  const otherHeroes: SuperHeroInterface[] = heroes
    .filter((h) => String(h.id) !== String(hero.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  const mainImage = hero.images?.lg ?? hero.images?.md;
  const fullName = hero.biography?.fullName;
  const publisher = hero.biography?.publisher;
  const occupation = hero.work?.occupation;
  const description =
    occupation || "No biography is available for this character.";

  return (
    <main className="detail-page">
      <Header />

      {/* BLACK BANNER */}
      <section className="detail-banner">
        <div className="detail-banner__content mx-auto max-w-[960px] flex flex-col md:flex-row gap-6 md:gap-10 md:px-0">
          {/* Character image (left) */}
          <div className="detail-banner__image-wrapper -mx-3 md:mx-0">
            <img
              src={mainImage}
              alt={hero.name}
              className="detail-banner__img"
            />
          </div>

          {/* Name, description, heart icon (right) */}
          <div className="detail-banner__info flex-1 flex flex-col justify-center gap-4 px-4 md:px-0">
            <div className="detail-banner__header flex items-start justify-between gap-4">
              <div className="detail-banner__names">
                <h1 className="detail-banner__name text-2xl md:text-3xl font-bold uppercase">
                  {hero.name}
                </h1>
                {fullName && fullName !== hero.name && (
                  <p className="detail-banner__full-name mt-1 text-sm">
                    {fullName}
                  </p>
                )}
              </div>

              {/* Favorite icon */}
              <DetailFavoriteButton heroId={hero.id} />
            </div>

            {/* Description */}
            <p className="detail-banner__description text-sm md:text-base leading-relaxed">
              {description || "n/d"}
            </p>

            {/* Publisher */}
            <p className="detail-banner__publisher text-xs mt-2">
              Publisher{" "}
              <span className="detail-banner__publisher-name">
                {publisher || "n/d"}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* OTHER HEROES - SLIDER */}
      <section className="detail-comics">
        <div className="mx-auto max-w-[960px] pt-10 pb-16 px-3 md:px-0">
          <h2 className="detail-comics__title text-xl font-bold uppercase mb-4">
            OTHER HEROES
          </h2>

          <div className="detail-comics__slider-wrapper">
            <div
              className="
                detail-comics__slider
                w-full
                overflow-x-auto
                overflow-y-hidden
                [&::-webkit-scrollbar]:hidden 
                md:[&::-webkit-scrollbar]:block
                md:[&::-webkit-scrollbar]:h-[6px]
                md:[&::-webkit-scrollbar-track]:bg-[#f2f2f2]
                md:[&::-webkit-scrollbar-thumb]:bg-[#e62429]
              "
            >
              <div className="detail-comics__list flex gap-4 min-w-max mb-14">
                {otherHeroes.map((hero) => {
                  const img = hero.images?.sm ?? hero.images?.md;

                  return (
                    <Link
                      key={hero.id}
                      href={`/heroes/${hero.id}`}
                      className="detail-comics__card block w-[178px] h-[268] flex-shrink-0"
                    >
                      <div className="detail-comics__card-image-wrapper">
                        {img ? (
                          <img
                            src={img}
                            alt={hero.name}
                            className="detail-comics__card-image"
                          />
                        ) : (
                          <div className="detail-comics__card-image detail-comics__card-image--empty">
                            No image
                          </div>
                        )}
                      </div>

                      <p className="detail-comics__card-name mt-2 text-xs font-semibold uppercase leading-snug">
                        {hero.name}
                      </p>
                      <p className="detail-comics__card-meta text-[12px] font-normal">
                        {hero.appearance?.race
                          ? hero.appearance.race
                          : "Unknown"}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
