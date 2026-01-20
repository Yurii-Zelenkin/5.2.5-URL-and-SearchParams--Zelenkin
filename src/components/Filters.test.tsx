import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render, createTestStore } from "../test/test-utils";
import Filters from "./Filters";

describe("Filters Component", () => {
  it("рендерится корректно", () => {
    const store = createTestStore({
      filters: { city: "", skills: [], page: 1, search: "" },
    });

    render(<Filters />, { store });

    expect(screen.getByText("Ключевые навыки")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Навык")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Все города")).toBeInTheDocument();
  });

  it("отображает начальные навыки", () => {
    const store = createTestStore({
      filters: {
        city: "",
        skills: ["React", "TypeScript"],
        page: 1,
        search: "",
      },
    });

    render(<Filters />, { store });

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("отображает селект городов", () => {
    const store = createTestStore();

    render(<Filters />, { store });

    expect(screen.getByText("Все города")).toBeInTheDocument();
    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(screen.getByText("Санкт-Петербург")).toBeInTheDocument();
  });
});
