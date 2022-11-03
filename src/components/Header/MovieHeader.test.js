/* eslint-disable testing-library/no-debugging-utils */
import MovieHeader from "./MovieHeader";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../helpers/testHelpers";
import userEvent from "@testing-library/user-event";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("<MovieHeader />", () => {
  test("MovieHeader render correctly", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MovieHeader />} />
        </Routes>
      </MemoryRouter>
    );
    const searchMovieInput = await screen.findByPlaceholderText(
      /Search Movie/i
    );

    expect(searchMovieInput).toBeInTheDocument();

    userEvent.type(searchMovieInput, "iron{space}man{enter}");
    expect(searchMovieInput).toHaveValue("iron man");
    expect(mockedNavigate).toHaveBeenCalledWith({
      pathname: "/",
      search: `?search=iron man&page=1`,
    });
  });
});
