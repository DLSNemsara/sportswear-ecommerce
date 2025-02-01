import { describe, it, expect, test } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("Render", () => {
  it("renders the main page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
