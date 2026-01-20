import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Stack,
  Loader,
  Alert,
  Pagination,
  Grid,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchVacancies,
  selectVacancies,
  selectVacanciesError,
  selectVacanciesLoading,
  selectVacanciesPages,
} from "../store/slices/vacanciesSlice";
import {
  setPage,
  setSearch,
  setCity,
  setSkills,
  selectFiltersPage,
  selectFiltersSearch,
  selectFiltersCity,
  selectFiltersSkills,
} from "../store/slices/filtersSlice";
import VacancyCard from "../components/VacancyCard";
import Filters from "../components/Filters";
import type { Vacancy } from "types/vacancy";

const VacanciesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectVacancies);
  const loading = useAppSelector(selectVacanciesLoading);
  const error = useAppSelector(selectVacanciesError);
  const pages = useAppSelector(selectVacanciesPages);

  const page = useAppSelector(selectFiltersPage);
  const search = useAppSelector(selectFiltersSearch);
  const city = useAppSelector(selectFiltersCity);
  const skills = useAppSelector(selectFiltersSkills);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(search);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;

      const searchFromUrl = searchParams.get("search") || "";
      const cityFromUrl = searchParams.get("city") || "";
      const skillsFromUrl = searchParams.get("skills")
        ? searchParams.get("skills")!.split(",").filter(Boolean)
        : [];
      const pageFromUrl = parseInt(searchParams.get("page") || "1");

      dispatch(setSearch(searchFromUrl));
      dispatch(setCity(cityFromUrl));
      dispatch(setSkills(skillsFromUrl));
      dispatch(setPage(pageFromUrl));
      setSearchInput(searchFromUrl);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) return;

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (skills.length > 0) params.set("skills", skills.join(","));
    if (page > 1) params.set("page", page.toString());

    const currentParams = searchParams.toString();
    const newParams = params.toString();

    if (currentParams !== newParams) {
      setSearchParams(params, { replace: true });
    }
  }, [search, city, skills, page, searchParams, setSearchParams]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(fetchVacancies());
    }, 300);

    return () => clearTimeout(timerId);
  }, [dispatch, search, city, skills, page]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSearch = () => {
    dispatch(setSearch(searchInput.trim()));
    dispatch(setPage(1));
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container size="xl" py="xl">
      <Group
        justify="space-between"
        mb="xl"
        align="flex-start"
        style={{ marginBottom: "32px" }}
      >
        <div style={{ maxWidth: "500px" }}>
          <div
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "26px",
              lineHeight: "135%",
              letterSpacing: "0%",
              color: "#212529",
              marginBottom: "4px",
            }}
          >
            Список вакансий
          </div>

          <div
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "135%",
              letterSpacing: "0%",
              color: "#212529",
            }}
          >
            по профессии Frontend-разработчик
          </div>
        </div>

        <Group gap="xs" style={{ width: "450px", flexShrink: 0 }}>
          <TextInput
            placeholder="Должность или название компании"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            style={{ flex: 1 }}
            size="md"
            leftSection={<IconSearch size={18} stroke={2} color="#868E96" />}
            styles={{
              input: {
                height: "40px",
                fontSize: "14px",
                backgroundColor: "#F6F6F7",
                border: "1px solid #E9ECEF",
                borderRadius: "8px",
                fontFamily: "'Open Sans', sans-serif",
              },
              section: {
                marginLeft: "12px",
              },
            }}
          />
          <Button
            onClick={handleSearch}
            size="md"
            color="#5B7BFA"
            style={{
              height: "40px",
              paddingLeft: "24px",
              paddingRight: "24px",
              backgroundColor: "#5B7BFA",
              borderRadius: "8px",
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            Найти
          </Button>
        </Group>
      </Group>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, sm: 12, md: 3, lg: 3 }}>
          <Filters />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, md: 9, lg: 9 }}>
          {loading && (
            <Loader
              size="lg"
              style={{ display: "block", margin: "60px auto" }}
            />
          )}

          {error && (
            <Alert color="red" title="Ошибка" mt="md">
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <>
              <Stack gap={0} mb="md">
                {items.length > 0 ? (
                  items.map((vacancy: Vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))
                ) : (
                  <Alert title="Ничего не найдено" mt="md"></Alert>
                )}
              </Stack>

              {pages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                >
                  <Pagination
                    value={page}
                    onChange={handlePageChange}
                    total={Math.min(pages, 10)}
                    size="md"
                    styles={{
                      control: {
                        fontSize: "16px",
                        minWidth: "40px",
                        height: "40px",
                        fontFamily: "'Open Sans', sans-serif",
                      },
                    }}
                  />
                </div>
              )}
            </>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default VacanciesPage;
