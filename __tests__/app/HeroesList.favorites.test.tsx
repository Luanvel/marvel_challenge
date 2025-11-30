import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroesList from "@/components/FavoriteHeroesList";
import type { SuperHeroInterface } from "@/types/superheroInterface";
import * as storage from "@/utils/storage";

// Mock HeroCard
jest.mock("@/components/HeroCard", () => {
  return function MockHeroCard({ hero }: { hero: any }) {
    return <div data-testid="hero-card">{hero.name}</div>;
  };
});

// Mock storage module
jest.mock("@/utils/storage", () => ({
  getFavorites: jest.fn(),
  subscribeFavorites: jest.fn(),
}));

const heroes: SuperHeroInterface[] = [
  { id: 1, name: "Iron Man" } as any,
  { id: 2, name: "Hulk" } as any,
  { id: 3, name: "Thor" } as any,
];

describe("HeroesList (favorites)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders only heroes that are in favorites", () => {
    // favorites: ids 1 and 3
    (storage.getFavorites as jest.Mock).mockReturnValue(["1", "3"]);
    (storage.subscribeFavorites as jest.Mock).mockImplementation((listener) => {
      listener(["1", "3"]);
      return () => {};
    });

    render(<HeroesList heroes={heroes} />);

    // Iron Man and Thor should be visible
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Thor")).toBeInTheDocument();

    // Hulk (id 2) should NOT be rendered
    expect(screen.queryByText("Hulk")).toBeNull();
  });

  test("filters favorites by search query", async () => {
    const user = userEvent.setup();

    (storage.getFavorites as jest.Mock).mockReturnValue(["1", "3"]);
    (storage.subscribeFavorites as jest.Mock).mockImplementation((listener) => {
      listener(["1", "3"]);
      return () => {};
    });

    render(<HeroesList heroes={heroes} />);

    // sanity check
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Thor")).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "thor");

    // only Thor should stay
    expect(screen.getByText("Thor")).toBeInTheDocument();
    expect(screen.queryByText("Iron Man")).toBeNull();
  });
});
