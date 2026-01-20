import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { VacanciesResponse, Vacancy } from "types/vacancy";
import type { RootState } from "../store";
import hhApi from "../../api/client";

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
  pages: 0,
};

export const fetchVacancies = createAsyncThunk<
  VacanciesResponse,
  void,
  { state: RootState }
>("vacancies/fetchVacancies", async (_, { getState }) => {
  const { filters } = getState();
  const { search, city, skills, page } = filters;

  const params: Record<string, any> = {
    per_page: 10,
    page: page - 1,
  };

  if (search) {
    params.text = search;
  }

  if (city) {
    const cityMap: Record<string, string> = {
      moscow: "1",
      spb: "2",
    };
    params.area = cityMap[city] || city;
  }

  if (skills.length > 0) {
    const skillsText = skills.join(" ");
    params.text = params.text ? `${params.text} ${skillsText}` : skillsText;
  }

  try {
    const response = await hhApi.get<VacanciesResponse>("/vacancies", {
      params,
    });
    return response.data;
  } catch (error: any) {
    console.error("Ошибка запроса:", error.response?.data || error.message);
    throw error;
  }
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
          state.pages = action.payload.pages;
        },
      )
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки вакансий";
        state.items = [];
      });
  },
});

export default vacanciesSlice.reducer;

export const selectVacancies = (state: RootState) => state.vacancies.items;
export const selectVacanciesLoading = (state: RootState) =>
  state.vacancies.loading;
export const selectVacanciesError = (state: RootState) => state.vacancies.error;
export const selectVacanciesPages = (state: RootState) => state.vacancies.pages;
