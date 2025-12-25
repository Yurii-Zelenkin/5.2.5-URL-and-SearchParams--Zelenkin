import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./redux";

const testStore = configureStore({
  reducer: {
    test: (state = { value: "test" }) => state,
  },
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={testStore}>{children}</Provider>
);

describe("Redux hooks", () => {
  it("useAppDispatch возвращает dispatch", () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current).toBe("function");
  });

  it("useAppSelector корректно выбирает данные", () => {
    const { result } = renderHook(
      () => useAppSelector((state: any) => state.test.value),
      {
        wrapper: Wrapper,
      }
    );

    expect(result.current).toBe("test");
  });
});
