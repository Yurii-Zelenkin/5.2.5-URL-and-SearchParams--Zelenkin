import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { render, createTestStore } from "../src/test/test-utils";
import App from "./App";
import axios from "axios";

vi.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("рендерится с заголовком", () => {
    const store = createTestStore();

    render(<App />, { store });

    expect(screen.getByText("Список вакансий")).toBeInTheDocument();
    expect(
      screen.getByText("по профессии Frontend-разработчик")
    ).toBeInTheDocument();
  });

  it("отображает поле поиска", () => {
    const store = createTestStore();

    render(<App />, { store });

    expect(
      screen.getByPlaceholderText("Должность или название компании")
    ).toBeInTheDocument();
    expect(screen.getByText("Найти")).toBeInTheDocument();
  });

  it("отображает фильтры", () => {
    const store = createTestStore();

    render(<App />, { store });

    expect(screen.getByText("Ключевые навыки")).toBeInTheDocument();
  });
});
