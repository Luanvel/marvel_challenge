import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailFavoriteButton from "@/components/DetailFavoriteButton";
import * as storage from "@/utils/storage";

// Mock storage module
jest.mock("@/utils/storage", () => ({
  isFavorite: jest.fn(),
  toggleFavorite: jest.fn(),
  subscribeFavorites: jest.fn(),
}));

describe("DetailFavoriteButton", () => {
  const heroId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initially reflects favorite state from isFavorite", () => {
    // Hero starts as favorite
    (storage.isFavorite as jest.Mock).mockReturnValue(true);
    (storage.subscribeFavorites as jest.Mock).mockImplementation((listener) => {
      // call once with current favorites
      listener([String(heroId)]);
      return () => {};
    });

    render(<DetailFavoriteButton heroId={heroId} />);

    // When favorite, aria-label should indicate removal state
    const button = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(button).toBeInTheDocument();

    // And icon alt text should match selected state
    const img = screen.getByAltText(/favorite selected/i);
    expect(img).toBeInTheDocument();
  });

  test("calls toggleFavorite with heroId on click", async () => {
    const user = userEvent.setup();

    (storage.isFavorite as jest.Mock).mockReturnValue(false);
    (storage.subscribeFavorites as jest.Mock).mockImplementation(() => {
      return () => {};
    });

    render(<DetailFavoriteButton heroId={heroId} />);

    const button = screen.getByRole("button", {
      name: /add to favorites/i,
    });

    await user.click(button);

    expect(storage.toggleFavorite).toHaveBeenCalledWith(heroId);
  });

  test("updates icon when favorites change via subscribeFavorites", async () => {
    (storage.isFavorite as jest.Mock).mockReturnValue(false);

    let capturedListener: ((favs: string[]) => void) | undefined;

    (storage.subscribeFavorites as jest.Mock).mockImplementation((listener) => {
      capturedListener = listener;
      // initial call: not in favorites
      listener([]);
      return () => {};
    });

    render(<DetailFavoriteButton heroId={heroId} />);

    // Initially not favorite
    expect(screen.getByAltText(/favorite not selected/i)).toBeInTheDocument();

    // Simulate external favorites update: now heroId is in favorites
    await act(async () => {
      capturedListener?.([String(heroId)]);
    });

    // Wait for React re-render and verify icon changed
    await waitFor(() => {
      expect(screen.getByAltText(/favorite selected/i)).toBeInTheDocument();
    });
  });
});
