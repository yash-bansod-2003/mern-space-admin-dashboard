import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./index";

it("should render login page with form", () => {
  render(<LoginPage />);
  const heading = screen.getByText("Login");
  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const rememberMeCheckbox = screen.getByRole("checkbox");
  const forgotPasswordLink = screen.getByRole("link", {
    name: "Forgot Password",
  });
  const submitButton = screen.getByRole("button", { name: "Log In" });

  expect(heading).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(rememberMeCheckbox).toBeInTheDocument();
  expect(forgotPasswordLink).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
