export interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
}

export interface Area {
  id: string;
  name: string;
  url: string;
}

export interface Employer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls?: {
    "90": string;
    "240": string;
    original: string;
  };
}

export interface Experience {
  id: string;
  name: string;
}

export interface Schedule {
  id: string;
  name: string;
}

export interface Vacancy {
  id: string;
  name: string;
  salary: Salary | null;
  area: Area;
  employer: Employer;
  experience: Experience;
  schedule: Schedule;
  snippet: {
    requirement?: string;
    responsibility?: string;
  };
  alternate_url: string;
  published_at: string;
  apply_alternate_url: string;
}

export interface VacanciesResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
}

export interface FiltersState {
  search: string;
  city: string;
  skills: string[];
  page: number;
}

export interface CityOption {
  value: string;
  label: string;
}
