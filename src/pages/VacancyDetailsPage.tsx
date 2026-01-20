import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Group,
  Text,
  Button,
  Stack,
  Loader,
  Alert,
  Box,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import type { VacancyDetails } from "types/vacancy";
import hhApi from "../api/client";

const VacancyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<VacancyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await hhApi.get<VacancyDetails>(`/vacancies/${id}`);
        setVacancy(response.data);
      } catch (err) {
        console.error("Ошибка загрузки вакансии:", err);
        setError("Не удалось загрузить вакансию");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const formatSalary = () => {
    if (!vacancy?.salary) return "Зарплата не указана";

    const { from, to, currency } = vacancy.salary;
    const currencySymbol = currency === "RUR" ? "₽" : currency;

    if (from && to) {
      return `${from.toLocaleString("ru-RU")} – ${to.toLocaleString(
        "ru-RU",
      )} ${currencySymbol}`;
    } else if (from) {
      return `от ${from.toLocaleString("ru-RU")} ${currencySymbol}`;
    } else if (to) {
      return `до ${to.toLocaleString("ru-RU")} ${currencySymbol}`;
    }

    return "Зарплата не указана";
  };

  const getScheduleInfo = () => {
    const schedule = vacancy?.schedule?.name || "";
    const scheduleMap: Record<
      string,
      { text: string; bgColor: string; textColor: string }
    > = {
      "удаленная работа": {
        text: "можно удалённо",
        bgColor: "#4263EB",
        textColor: "#ffffff",
      },
      "удалённая работа": {
        text: "можно удалённо",
        bgColor: "#4263EB",
        textColor: "#ffffff",
      },
      "полный день": {
        text: "офис",
        bgColor: "#0F0F101A",
        textColor: "#0F0F10",
      },
      "гибкий график": {
        text: "гибрид",
        bgColor: "#0F0F10",
        textColor: "#ffffff",
      },
      гибрид: {
        text: "гибрид",
        bgColor: "#0F0F10",
        textColor: "#ffffff",
      },
    };

    return (
      scheduleMap[schedule.toLowerCase()] || {
        text: schedule,
        bgColor: "#0F0F101A",
        textColor: "#0F0F10",
      }
    );
  };

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Loader size="lg" style={{ display: "block", margin: "60px auto" }} />
      </Container>
    );
  }

  if (error || !vacancy) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Ошибка">
          {error || "Вакансия не найдена"}
        </Alert>
        <Button mt="md" onClick={() => navigate("/vacancies")}>
          Вернуться к списку
        </Button>
      </Container>
    );
  }

  const scheduleInfo = getScheduleInfo();

  return (
    <Container size="lg" py="xl">
      <Stack gap="md" align="center">
        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            width: "658px",
            maxWidth: "100%",
          }}
        >
          <Stack gap="xs">
            <Text
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "#364FC7",
              }}
            >
              {vacancy.name}
            </Text>

            <Group gap="md" align="center">
              <Text
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                }}
              >
                {formatSalary()}
              </Text>

              <Text
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  color: "#0F0F1080",
                }}
              >
                {vacancy.experience.name}
              </Text>
            </Group>

            <Text
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "#0F0F1080",
              }}
            >
              {vacancy.employer.name}
            </Text>

            <Group gap="xs" align="center" style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "inline-flex",
                  backgroundColor: scheduleInfo.bgColor,
                  borderRadius: "2px",
                  padding: "1px 8px",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "16px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "14px",
                    letterSpacing: "0%",
                    color: scheduleInfo.textColor,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {scheduleInfo.text}
                </Text>
              </div>
            </Group>

            <Text
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0%",
                color: "#0F0F10",
                marginBottom: "10px",
              }}
            >
              {vacancy.area.name}
            </Text>

            <Group justify="flex-start" gap="sm">
              <Button
                component="a"
                href={vacancy.apply_alternate_url || vacancy.alternate_url}
                target="_blank"
                variant="filled"
                size="sm"
                style={{
                  color: "white",
                  height: "36px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "14px",
                  backgroundColor: "#0F0F10",
                  borderRadius: "4px",
                  border: "none",
                  minWidth: "140px",
                }}
              >
                Откликнуться на hh.ru
              </Button>
            </Group>
          </Stack>
        </Card>

        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            width: "658px",
            maxWidth: "100%",
          }}
        >
          <Stack gap="md">
            {vacancy.snippet?.requirement && (
              <Box>
                <Text
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "8px",
                    color: "#0F0F10",
                  }}
                >
                  Требования
                </Text>
                <div
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#0F0F10",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: vacancy.snippet.requirement,
                  }}
                />
              </Box>
            )}

            {vacancy.snippet?.responsibility && (
              <Box>
                <Text
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "8px",
                    color: "#0F0F10",
                  }}
                >
                  Обязанности
                </Text>
                <div
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#0F0F10",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: vacancy.snippet.responsibility,
                  }}
                />
              </Box>
            )}

            {vacancy.description && (
              <Box>
                <Text
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "8px",
                    color: "#0F0F10",
                  }}
                >
                  Описание вакансии
                </Text>
                <div
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#0F0F10",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: vacancy.description,
                  }}
                />
              </Box>
            )}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default VacancyDetailsPage;
