import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroCard from "@/components/HeroCard";
import type { SuperHeroInterface } from "@/types/superheroInterface";

jest.mock("@/utils/storage", () => ({
  isFavorite: jest.fn(() => false),
  toggleFavorite: jest.fn(),
  subscribeFavorites: jest.fn(() => () => {}),
}));

const mockHero: SuperHeroInterface = {
  id: 1,
  name: "Spider-Man",
  images: {
    lg: "https://example.com/spiderman-lg.jpg",
    md: "https://example.com/spiderman-md.jpg",
    sm: "https://example.com/spiderman-sm.jpg",
    xs: "https://example.com/spiderman-xs.jpg",
  },
} as any;

describe("HeroCard", () => {
  test("renders hero name and image", () => {
    render(<HeroCard hero={mockHero} />);

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    const img = screen.getByRole("img", { name: /spider-man/i });
    expect(img).toBeInTheDocument();
  });

  test("toggles favorite on heart click", async () => {
    const user = userEvent.setup();
    const { toggleFavorite } = require("@/utils/storage");

    render(<HeroCard hero={mockHero} />);

    const favButton = screen.getByRole("button");
    await user.click(favButton);

    expect(toggleFavorite).toHaveBeenCalledWith(mockHero.id);
  });
});
