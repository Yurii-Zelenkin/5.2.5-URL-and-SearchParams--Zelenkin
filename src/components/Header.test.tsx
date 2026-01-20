import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../test/test-utils";
import Header from "./Header";

describe("Header Component", () => {
  it("рендерится корректно", () => {
    render(<Header />);

    expect(screen.getByText("hh")).toBeInTheDocument();
    expect(screen.getByText(".FrontEnd")).toBeInTheDocument();
    expect(screen.getByText("Вакансии FE")).toBeInTheDocument();
    expect(screen.getByText("Обо мне")).toBeInTheDocument();
  });

  it("содержит корректные ссылки", () => {
    render(<Header />);

    const feLink = screen.getByText("Вакансии FE");
    const aboutLink = screen.getByText("Обо мне");

    expect(feLink.closest("a")).toHaveAttribute("href", "#");
    expect(aboutLink.closest("a")).toHaveAttribute("href", "#");
  });

  it("имеет правильные стили для логотипа", () => {
    render(<Header />);

    const logo = screen.getByText("hh");
    expect(logo).toHaveStyle({
      backgroundColor: "#FF0000",
      color: "#FFFFFF",
    });
  });
});
