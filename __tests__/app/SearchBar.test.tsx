import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

describe("SearchBar", () => {
  test("renders input with value, placeholder and results text", () => {
    const handleChange = jest.fn();

    render(
      <SearchBar value="spider" onChange={handleChange} totalResults={5} />
    );

    const input = screen.getByDisplayValue("spider");
    expect(input).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("SEARCH A CHARACTER...")
    ).toBeInTheDocument();

    expect(screen.getByText("5 RESULTS")).toBeInTheDocument();
  });

  test("calls onChange and updates value when user types", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    // Small wrapper to behave like a real controlled component
    function SearchBarWrapper() {
      const [value, setValue] = useState("");

      return (
        <SearchBar
          value={value}
          onChange={(v) => {
            setValue(v); // update local state
            handleChange(v); // track calls
          }}
          totalResults={0}
        />
      );
    }

    render(<SearchBarWrapper />);

    const input = screen.getByRole("textbox");

    await user.type(input, "spider");

    // onChange was called several times
    expect(handleChange).toHaveBeenCalled();

    // The last call should have the full typed string
    expect(handleChange).toHaveBeenLastCalledWith("spider");

    // And the input should show the final value
    expect(input).toHaveValue("spider");
  });
});
