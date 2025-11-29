import HeroCard from "@/components/HeroCard";
import { get50Heroes } from "@/lib/superheroApi";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroes = await get50Heroes();

  return (
    <>
      <Header />
      <main className="px-3 md:px-6 py-8 mx-auto">
        <section className="mb-6">
          <p className="text-gray-600 mt-1">{heroes.length} Resuls</p>
        </section>

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
