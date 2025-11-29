import type { SuperHeroInterface } from "@/types/superheroInterface";

const url = process.env.SUPERHERO_API_BASEURL;

/**
 * Returns ALL heroes from /all.json
 */
export async function getHeroes(): Promise<SuperHeroInterface[]> {
  try {
    const res = await fetch(`${url}/all.json`);
    const data: SuperHeroInterface[] = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Error fetching superheroes");
  }
}

/**
 * Returns detailed data for a single hero by ID
 */
export async function getHeroById(
  id: string | number
): Promise<SuperHeroInterface | null> {
  const numericId = typeof id === "string" ? Number(id) : id;

  try {
    const res = await fetch(`${url}/id/${numericId}.json`);
    const hero: SuperHeroInterface = await res.json();

    return hero;
  } catch (e) {
    throw new Error("Error fetching superhero by id");
  }
}
