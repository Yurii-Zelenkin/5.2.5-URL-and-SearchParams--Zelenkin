import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../test/test-utils";
import VacancyCard from "./VacancyCard";
import type { Vacancy } from "../types/vacancy";

const mockVacancy: Vacancy = {
  id: "1",
  name: "Frontend Developer",
  salary: {
    from: 150000,
    to: 250000,
    currency: "RUR",
    gross: true,
  },
  area: {
    id: "1",
    name: "Москва",
    url: "https://hh.ru/area/1",
  },
  employer: {
    id: "123",
    name: "Tech Company",
    url: "https://hh.ru/employer/123",
    alternate_url: "https://company.com",
  },
  experience: {
    id: "between1And3",
    name: "1–3 года",
  },
  schedule: {
    id: "remote",
    name: "удаленная работа",
  },
  snippet: {
    requirement: "Знание React и TypeScript",
    responsibility: "Разработка пользовательских интерфейсов",
  },
  alternate_url: "https://hh.ru/vacancy/1",
  published_at: "2024-01-01T10:00:00+0300",
  apply_alternate_url: "https://hh.ru/vacancy/1/apply",
};

describe("VacancyCard Component", () => {
  it("рендерится с правильными данными", () => {
    render(<VacancyCard vacancy={mockVacancy} />);

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("150 000 – 250 000 ₽")).toBeInTheDocument();
    expect(screen.getByText("1–3 года")).toBeInTheDocument();
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.getByText("Москва")).toBeInTheDocument();
    expect(screen.getByText("можно удалённо")).toBeInTheDocument();
  });

  it("форматирует зарплату без данных", () => {
    const vacancyWithoutSalary: Vacancy = {
      ...mockVacancy,
      salary: null,
    };

    render(<VacancyCard vacancy={vacancyWithoutSalary} />);

    expect(screen.getByText("Зарплата не указана")).toBeInTheDocument();
  });

  it("форматирует зарплату только с from", () => {
    const vacancyWithFromOnly: Vacancy = {
      ...mockVacancy,
      salary: {
        from: 100000,
        to: null,
        currency: "RUR",
        gross: true,
      },
    };

    render(<VacancyCard vacancy={vacancyWithFromOnly} />);

    expect(screen.getByText("от 100 000 ₽")).toBeInTheDocument();
  });

  it("форматирует зарплату только с to", () => {
    const vacancyWithToOnly: Vacancy = {
      ...mockVacancy,
      salary: {
        from: null,
        to: 300000,
        currency: "RUR",
        gross: true,
      },
    };

    render(<VacancyCard vacancy={vacancyWithToOnly} />);

    expect(screen.getByText("до 300 000 ₽")).toBeInTheDocument();
  });

  it("показывает бейдж для удаленной работы", () => {
    render(<VacancyCard vacancy={mockVacancy} />);

    expect(screen.getByText("можно удалённо")).toBeInTheDocument();
  });

  it("показывает бейдж для офиса", () => {
    const officeVacancy: Vacancy = {
      ...mockVacancy,
      schedule: { id: "fullDay", name: "полный день" },
    };

    render(<VacancyCard vacancy={officeVacancy} />);

    expect(screen.getByText("офис")).toBeInTheDocument();
  });

  it("показывает бейдж для гибрида", () => {
    const hybridVacancy: Vacancy = {
      ...mockVacancy,
      schedule: { id: "flexible", name: "гибкий график" },
    };

    render(<VacancyCard vacancy={hybridVacancy} />);

    expect(screen.getByText("гибрид")).toBeInTheDocument();
  });

  it("кнопки имеют правильные ссылки", () => {
    render(<VacancyCard vacancy={mockVacancy} />);

    const applyButton = screen.getByText("Откликнуться");
    expect(applyButton.closest("a")).toHaveAttribute(
      "href",
      "https://hh.ru/vacancy/1/apply"
    );
    expect(applyButton.closest("a")).toHaveAttribute("target", "_blank");
  });
});
