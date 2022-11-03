import { render, screen } from "@testing-library/react";
import MovieFooter from "./MovieFooter";

describe("<MovieFooter />", () => {
  test("should be defined", () => {
    expect(MovieFooter).toBeDefined();
  });

  test("should be render correctly", async () => {
    render(<MovieFooter />);
    const expectedText = await screen.findByText("Movie App ©2022");
    expect(expectedText).toBeInTheDocument();
  });

  test("should have 'container' classname", async () => {
    render(<MovieFooter />);
    const expectedText = await screen.findByText("Movie App ©2022");
    expect(expectedText).toHaveClass("container");
  });
});
