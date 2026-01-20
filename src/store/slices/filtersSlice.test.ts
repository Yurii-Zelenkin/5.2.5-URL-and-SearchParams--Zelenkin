import { describe, it, expect } from "vitest";
import filtersReducer, {
  setSearch,
  setCity,
  addSkill,
  removeSkill,
  setPage,
  resetSkills,
} from "./filtersSlice";

describe("filtersSlice", () => {
  const initialState = {
    search: "",
    city: "",
    skills: ["TypeScript", "React", "Redux"],
    page: 1,
  };

  it("должен возвращать начальное состояние", () => {
    expect(filtersReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать setSearch", () => {
    const action = setSearch("Frontend");
    const state = filtersReducer(initialState, action);

    expect(state.search).toBe("Frontend");
    expect(state.page).toBe(1);
  });

  it("должен обрабатывать setCity", () => {
    const action = setCity("moscow");
    const state = filtersReducer(initialState, action);

    expect(state.city).toBe("moscow");
    expect(state.page).toBe(1);
  });

  it("должен добавлять навык через addSkill", () => {
    const action = addSkill("JavaScript");
    const state = filtersReducer(initialState, action);

    expect(state.skills).toContain("JavaScript");
    expect(state.skills).toHaveLength(4);
    expect(state.page).toBe(1);
  });

  it("не должен добавлять дубликат навыка", () => {
    const action = addSkill("React");
    const state = filtersReducer(initialState, action);

    expect(state.skills).toHaveLength(3);
    expect(state.page).toBe(1);
  });

  it("должен удалять навык через removeSkill", () => {
    const action = removeSkill("React");
    const state = filtersReducer(initialState, action);

    expect(state.skills).not.toContain("React");
    expect(state.skills).toContain("TypeScript");
    expect(state.skills).toContain("Redux");
    expect(state.skills).toHaveLength(2);
    expect(state.page).toBe(1);
  });

  it("должен устанавливать страницу через setPage", () => {
    const action = setPage(3);
    const state = filtersReducer(initialState, action);

    expect(state.page).toBe(3);
  });

  it("должен сбрасывать навыки через resetSkills", () => {
    const modifiedState = {
      ...initialState,
      skills: ["Vue", "Vuex", "Pinia"],
    };

    const action = resetSkills();
    const state = filtersReducer(modifiedState, action);

    expect(state.skills).toEqual(["TypeScript", "React", "Redux"]);
    expect(state.page).toBe(1);
  });
});
