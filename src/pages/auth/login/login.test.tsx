import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./index";

it("should render login page", () => {
  render(<LoginPage />);
  expect(screen.getByText("Login")).toBeInTheDocument();
});
