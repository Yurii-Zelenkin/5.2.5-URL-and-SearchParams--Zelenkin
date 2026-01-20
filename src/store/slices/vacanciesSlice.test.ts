import { describe, it, expect, vi, beforeEach } from "vitest";
import vacanciesReducer, { fetchVacancies } from "./vacanciesSlice";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as any;

const mockVacanciesResponse = {
  data: {
    items: [
      {
        id: "1",
        name: "Frontend Developer",
        salary: { from: 150000, to: 250000, currency: "RUR", gross: true },
        area: { id: "1", name: "Москва", url: "" },
        employer: { id: "1", name: "Tech Corp", url: "", alternate_url: "" },
        experience: { id: "2", name: "1–3 года" },
        schedule: { id: "remote", name: "удаленная работа" },
        snippet: {},
        alternate_url: "",
        published_at: "",
        apply_alternate_url: "",
      },
    ],
    found: 1,
    pages: 1,
    page: 0,
    per_page: 10,
  },
};

describe("vacanciesSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен обрабатывать начальное состояние", () => {
    const state = vacanciesReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
      pages: 0,
      total: 0,
    });
  });

  it("должен обрабатывать pending состояние", () => {
    const state = vacanciesReducer(undefined, fetchVacancies.pending(""));

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("должен обрабатывать fulfilled состояние", () => {
    const initialState = vacanciesReducer(undefined, { type: "unknown" });
    const action = {
      type: fetchVacancies.fulfilled.type,
      payload: mockVacanciesResponse.data,
    };

    const state = vacanciesReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe("Frontend Developer");
    expect(state.pages).toBe(1);
    expect(state.total).toBe(1);
  });

  it("должен обрабатывать rejected состояние", () => {
    const initialState = vacanciesReducer(undefined, { type: "unknown" });
    const action = {
      type: fetchVacancies.rejected.type,
      error: { message: "Network Error" },
    };

    const state = vacanciesReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network Error");
  });
});
