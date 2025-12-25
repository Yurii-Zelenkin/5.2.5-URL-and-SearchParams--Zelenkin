import React, { useEffect } from "react";
import {
  Container,
  Stack,
  Loader,
  Alert,
  Text,
  Pagination,
  Grid,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchVacancies } from "./store/slices/vacanciesSlice";
import { setPage, setSearch } from "./store/slices/filtersSlice";
import Header from "./components/Header";
import Filters from "./components/Filters";
import VacancyCard from "./components/VacancyCard";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, pages } = useAppSelector(
    (state) => state.vacancies
  );
  const { page, search, city, skills } = useAppSelector(
    (state) => state.filters
  );
  const [searchInput, setSearchInput] = React.useState(search);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, page, search, city, skills]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSearch = () => {
    dispatch(setSearch(searchInput));
    dispatch(setPage(1));
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F6F6F7" }}>
      <Header />

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
                  {items.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
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
    </div>
  );
};

export default App;
