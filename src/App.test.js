import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { renderWithProviders } from "./helpers/testHelpers";

describe("<App />", () => {
  test("renders learn react link", async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(await screen.findByText(/Favorite Movies/i)).toBeInTheDocument();
  });
});
