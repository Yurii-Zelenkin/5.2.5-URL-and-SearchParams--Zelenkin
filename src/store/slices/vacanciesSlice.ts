import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { VacanciesResponse, Vacancy } from "../../types/vacancy";

type RootState = {
  filters: {
    search: string;
    city: string;
    skills: string[];
    page: number;
  };
};

interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;

  pages: number;
}

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  pages: 0,
};

export const fetchVacancies = createAsyncThunk<
  VacanciesResponse,
  void,
  { state: RootState }
>("vacancies/fetchVacancies", async (_, { getState }) => {
  const { filters } = getState();
  const { search, city, skills, page } = filters;

  const params: Record<string, string | number> = {
    industry: 7,
    professional_role: 96,
    per_page: 10,
    page,
  };

  if (search) {
    params.text = search;
  }

  if (city) {
    params.area = city === "moscow" ? "1" : city === "spb" ? "2" : "";
  }

  if (skills.length > 0) {
    params.skill_set = skills.join(",");
  }

  const response = await axios.get("https://api.hh.ru/vacancies", { params });
  return response.data;
});

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVacancies.fulfilled,
        (state, action: PayloadAction<VacanciesResponse>) => {
          state.loading = false;
          state.items = action.payload.items;
          state.total = action.payload.found;
          state.pages = action.payload.pages;
        }
      )
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки вакансий";
      });
  },
});

export default vacanciesSlice.reducer;
