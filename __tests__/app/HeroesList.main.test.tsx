import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroesList from "@/components/HeroesList";
import type { SuperHeroInterface } from "@/types/superheroInterface";

// Mock HeroCard
jest.mock("@/components/HeroCard", () => {
  return function MockHeroCard({ hero }: { hero: any }) {
    return <div data-testid="hero-card">{hero.name}</div>;
  };
});

const heroes: SuperHeroInterface[] = [
  { id: 1, name: "Iron Man" } as any,
  { id: 2, name: "Hulk" } as any,
  { id: 3, name: "Thor" } as any,
];

describe("HeroesList (main heroes list)", () => {
  test("uses initialRandomHeroes when provided", () => {
    const initialRandomHeroes: SuperHeroInterface[] = [
      { id: 99, name: "Random Hero" } as any,
    ];

    render(
      <HeroesList heroes={heroes} initialRandomHeroes={initialRandomHeroes} />
    );

    // Only the initialRandomHeroes should be rendered when no query
    expect(screen.getByText("Random Hero")).toBeInTheDocument();
    expect(screen.queryByText("Iron Man")).toBeNull();
    expect(screen.queryByText("Hulk")).toBeNull();
  });

  test("filters heroes by search query when typing", async () => {
    const user = userEvent.setup();

    render(<HeroesList heroes={heroes} />);

    // initial: should show slice of heroes (first 50, here 3)
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Hulk")).toBeInTheDocument();
    expect(screen.getByText("Thor")).toBeInTheDocument();

    const input = screen.getByRole("textbox");

    await user.clear(input);
    await user.type(input, "thor");

    // only Thor should match
    expect(screen.getByText("Thor")).toBeInTheDocument();
    expect(screen.queryByText("Iron Man")).toBeNull();
    expect(screen.queryByText("Hulk")).toBeNull();
  });
});
