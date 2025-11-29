import HeroCard from "@/components/HeroCard";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { get50Heroes } from "@/lib/superheroApi";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroes = await get50Heroes();

  return (
    <>
      <Header />
      <main className="px-3 md:px-6 py-8 mx-auto">
        <SearchBar totalResults={heroes.length} />

        <section
          className="
          flex
          flex-wrap
          gap-x-4
          gap-y-4
          justify-center
        "
        >
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </section>
      </main>
    </>
  );
}
