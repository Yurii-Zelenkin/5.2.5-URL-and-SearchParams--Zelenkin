// ИСПРАВЛЕННЫЙ ИМПОРТ
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  city: string;
  skills: string[];
  page: number;
}

const initialState: FiltersState = {
  search: "",
  city: "",
  skills: ["TypeScript", "React", "Redux"],
  page: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      state.page = 1;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
      state.page = 1;
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetSkills: (state) => {
      state.skills = ["TypeScript", "React", "Redux"];
      state.page = 1;
    },
  },
});

export const {
  setSearch,
  setCity,
  addSkill,
  removeSkill,
  setPage,
  resetSkills,
} = filtersSlice.actions;

export default filtersSlice.reducer;
