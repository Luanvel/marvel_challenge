import Header from "@/components/Header";
import HeroesList from "@/components/HeroesList";
import { getHeroes } from "@/lib/superheroApi";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroes = await getHeroes();

  // Pick 50 random heroes server-side, avoid errors on client
  const shuffled = [...heroes].sort(() => Math.random() - 0.5);
  const initialRandomHeroes = shuffled.slice(0, 50);

  return (
    <>
      <Header />
      <main className="px-3 md:px-6 py-8 mx-auto">
        <HeroesList heroes={heroes} initialRandomHeroes={initialRandomHeroes} />
      </main>
    </>
  );
}
