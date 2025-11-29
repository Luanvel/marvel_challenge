import Header from "@/components/Header";
import HeroesList from "@/components/HeroesList";
import { getHeroes } from "@/lib/superheroApi";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroes = await getHeroes();

  return (
    <>
      <Header />
      <main className="px-3 md:px-6 py-8 mx-auto">
        <HeroesList heroes={heroes} />
      </main>
    </>
  );
}
