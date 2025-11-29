import HeroCard from "@/components/HeroCard";
import { get50Heroes } from "@/lib/superheroApi";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroes = await get50Heroes();

  return (
    <main className="px-3 md:px-6 py-8 mx-auto max-w-[1512px]">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Super Heroes</h1>
        <p className="text-gray-600 mt-1">Resultados: {heroes.length}</p>
      </header>

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
  );
}
