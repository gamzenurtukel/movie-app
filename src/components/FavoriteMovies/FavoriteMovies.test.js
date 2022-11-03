import { render, screen } from "@testing-library/react";
import { Menu } from "antd";
import FavoriteMovies from "./FavoriteMovies";
import { mocks } from "./mocks";

const props = mocks;

describe("<FavoriteMovies />", () => {
  test("should be defined", () => {
    expect(FavoriteMovies).toBeDefined();
  });

  test("should be return correctly", async () => {
    const title = "Dirty Harry";

    render(
      <Menu theme="dark" mode="horizontal">
        <FavoriteMovies movies={props.movies} x={props.x} />
      </Menu>
    );

    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(screen.getByAltText(`Image of ${title}`)).toHaveAttribute(
      "src",
      "https://m.media-amazon.com/images/M/MV5BMzdhMTM2YTItOWU2YS00MTM0LTgyNDYtMDM1OWM3NzkzNTM2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
    );
  });
});
