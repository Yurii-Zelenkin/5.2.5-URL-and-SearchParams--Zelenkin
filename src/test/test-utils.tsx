import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "../store/slices/vacanciesSlice";
import filtersReducer from "../store/slices/filtersSlice";

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      vacancies: vacanciesReducer,
      filters: filtersReducer,
    },
    preloadedState,
  });
};

const AllTheProviders = ({
  children,
  store = createTestStore(),
}: {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
}) => {
  return (
    <MantineProvider>
      <Provider store={store}>{children}</Provider>
    </MantineProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    store?: ReturnType<typeof createTestStore>;
  }
) => {
  const { store, ...restOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders store={store}>{children}</AllTheProviders>
    ),
    ...restOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render, createTestStore };
