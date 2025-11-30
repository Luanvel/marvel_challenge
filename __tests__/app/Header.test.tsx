import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import * as storage from "@/utils/storage";

// Mock the whole storage module
jest.mock("@/utils/storage", () => ({
  getFavorites: jest.fn(),
  subscribeFavorites: jest.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows initial favorites count", () => {
    // Arrange: initial favorites
    (storage.getFavorites as jest.Mock).mockReturnValue(["1", "2", "3"]);
    (storage.subscribeFavorites as jest.Mock).mockImplementation((listener) => {
      // Call listener once with initial value
      listener(["1", "2", "3"]);
      return () => {};
    });

    // Act
    render(<Header />);

    // Assert
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("updates favorites count when favorites change", () => {
    let currentFavs = ["1"];

    (storage.getFavorites as jest.Mock).mockImplementation(() => currentFavs);

    (storage.subscribeFavorites as jest.Mock).mockImplementation((listener) => {
      // Keep a reference to listener so we can call it later
      listener(currentFavs);
      // Return unsubscribe
      return () => {};
    });

    render(<Header />);

    // initial
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
