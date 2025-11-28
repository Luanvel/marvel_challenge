import type { SuperHeroInterface } from "@/types/superheroInterface";

const url = process.env.SUPERHERO_API_BASEURL;

/**
 * Devuelve 50 héroes aleatorios usando sort + Math.random
 */
export async function get50Heroes(): Promise<SuperHeroInterface[]> {
  try {
    const res = await fetch(`${url}/all.json`);
    const data: SuperHeroInterface[] = await res.json();

    //Buscamos aleatoriamente para que no sean siempre los héroes con A
    const shuffled = data.sort(() => Math.random() - 0.5);

    // Devolver 50
    return shuffled.slice(0, 50);
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching superheroes");
  }
}

/**
 * Busca héroes por nombre > endpoint /all.json
 */
export async function searchHeroesByName(
  name: string
): Promise<SuperHeroInterface[]> {
  const term = name.trim().toLowerCase();
  if (!term) return [];

  try {
    const res = await fetch(`${url}/all.json`);
    const data: SuperHeroInterface[] = await res.json();

    return data.filter((hero) => hero.name.toLowerCase().includes(term));
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching superhero by name");
  }
}

/**
 * Obtiene el detalle de un héroe por id > endpoint /id/{id}.json
 */
export async function getHeroById(
  id: string | number
): Promise<SuperHeroInterface | null> {
  const numericId = typeof id === "string" ? Number(id) : id;

  try {
    const res = await fetch(`${url}/id/${numericId}.json`);

    if (!res.ok) {
      throw new Error("Error fetching superhero detail");
    }

    const hero: SuperHeroInterface = await res.json();
    return hero;
  } catch (e) {
    throw new Error("Error fetching superhero by id");
  }
}
