import type { Vacancy } from "../types/vacancy";

export const mockVacancy: Vacancy = {
  id: "123",
  name: "Senior Frontend Developer",
  salary: {
    from: 300000,
    to: 500000,
    currency: "RUR",
    gross: true,
  },
  area: {
    id: "1",
    name: "Москва",
    url: "https://hh.ru/area/1",
  },
  employer: {
    id: "456",
    name: "Yandex",
    url: "https://hh.ru/employer/456",
    alternate_url: "https://yandex.ru",
  },
  experience: {
    id: "moreThan6",
    name: "Более 6 лет",
  },
  schedule: {
    id: "remote",
    name: "удаленная работа",
  },
  snippet: {
    requirement: "React, TypeScript, Redux",
    responsibility: "Разработка высоконагруженных интерфейсов",
  },
  alternate_url: "https://hh.ru/vacancy/123",
  published_at: "2024-01-15T12:00:00+0300",
  apply_alternate_url: "https://hh.ru/vacancy/123/apply",
};

export const mockVacancyNoSalary: Vacancy = {
  ...mockVacancy,
  id: "124",
  salary: null,
};

export const mockVacancyOffice: Vacancy = {
  ...mockVacancy,
  id: "125",
  schedule: {
    id: "fullDay",
    name: "полный день",
  },
};

export const mockVacancyHybrid: Vacancy = {
  ...mockVacancy,
  id: "126",
  schedule: {
    id: "flexible",
    name: "гибкий график",
  },
};
