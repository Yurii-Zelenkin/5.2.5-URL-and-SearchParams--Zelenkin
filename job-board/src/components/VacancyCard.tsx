import React from "react";
import { Card, Group, Text, Button, Stack } from "@mantine/core";
import type { Vacancy } from "../../types/vacancy";

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const formatSalary = () => {
    if (!vacancy.salary) return "Зарплата не указана";

    const { from, to, currency } = vacancy.salary;
    const currencySymbol = currency === "RUR" ? "₽" : currency;

    if (from && to) {
      return `${from.toLocaleString("ru-RU")} – ${to.toLocaleString(
        "ru-RU"
      )} ${currencySymbol}`;
    } else if (from) {
      return `от ${from.toLocaleString("ru-RU")} ${currencySymbol}`;
    } else if (to) {
      return `до ${to.toLocaleString("ru-RU")} ${currencySymbol}`;
    }

    return "Зарплата не указана";
  };

  const getScheduleInfo = () => {
    const schedule = vacancy.schedule?.name || "";
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

  const scheduleInfo = getScheduleInfo();

  return (
    <Card padding="lg" radius="md" withBorder mb="md">
      <Stack gap="xs">
        {/* Заголовок */}
        <Text
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "24px",
            letterSpacing: "0%",
            color: " #364FC7",
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
            variant="outline"
            size="sm"
            style={{
              width: "182px",
              height: "36px",
              borderRadius: "4px",
              backgroundColor: "#0F0F10",
              color: "#ffffff",
              borderColor: "#0F0F10",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "14px",
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Смотреть вакансию
          </Button>
          <Button
            component="a"
            href={vacancy.apply_alternate_url || vacancy.alternate_url}
            target="_blank"
            variant="filled"
            size="sm"
            style={{
              color: "black",
              height: "36px",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "14px",
              backgroundColor: " #0F0F101A",
              borderRadius: "4px",
            }}
          >
            Откликнуться
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default VacancyCard;
