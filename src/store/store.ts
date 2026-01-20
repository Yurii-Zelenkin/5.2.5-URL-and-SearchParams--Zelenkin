import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./slices/vacanciesSlice";
import filtersReducer from "./slices/filtersSlice";

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    filters: filtersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
