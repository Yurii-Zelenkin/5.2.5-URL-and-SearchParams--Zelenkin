import React, { useState } from "react";
import {
  TextInput,
  Select,
  Pill,
  Group,
  Text,
  Paper,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setCity,
  addSkill,
  removeSkill,
  setPage,
} from "../store/slices/filtersSlice";
import { IconPlus, IconMapPin, IconX } from "@tabler/icons-react";

const cityOptions = [
  { value: "", label: "Все города" },
  { value: "1", label: "Москва" },
  { value: "2", label: "Санкт-Петербург" },
];

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { city, skills } = useAppSelector((state) => state.filters);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      dispatch(addSkill(trimmedSkill));
      dispatch(setPage(1));
      setNewSkill("");
    }
  };

  const handleCityChange = (value: string | null) => {
    dispatch(setCity(value || ""));
    dispatch(setPage(1));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const handleClearSearch = () => {
    setNewSkill("");
  };

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill));
    dispatch(setPage(1));
  };

  return (
    <Stack gap="lg">
      <Paper
        p="lg"
        radius="12px"
        withBorder
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e9ecef",
        }}
      >
        <Stack gap="md">
          <Text
            size="16px"
            fw={600}
            style={{
              color: "#212529",
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Ключевые навыки
          </Text>

          <Group gap="xs">
            <TextInput
              placeholder="Навык"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flex: 1 }}
              size="md"
              rightSection={
                newSkill && (
                  <ActionIcon
                    onClick={handleClearSearch}
                    variant="subtle"
                    size="sm"
                    color="gray"
                  >
                    <IconX size={16} stroke={2} />
                  </ActionIcon>
                )
              }
              styles={{
                input: {
                  height: "30px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  fontFamily: "'Open Sans', sans-serif",
                },
                root: {
                  flex: 1,
                },
              }}
            />
            <ActionIcon
              onClick={handleAddSkill}
              variant="filled"
              size="lg"
              color="#5B7BFA"
              style={{
                height: "30px",
                width: "34px",
                borderRadius: "8px",
                backgroundColor: "#228BE6",
              }}
            >
              <IconPlus size={20} stroke={2.5} />
            </ActionIcon>
          </Group>

          {skills.length > 0 && (
            <Group gap={6} style={{ flexWrap: "wrap" }}>
              {skills.map((skill) => (
                <Pill
                  key={skill}
                  size="md"
                  withRemoveButton
                  onRemove={() => handleRemoveSkill(skill)}
                  styles={{
                    root: {
                      fontSize: "14px",
                      padding: "2px 10px",
                      height: "auto",
                      backgroundColor: "#F6F6F7",
                      border: "1px solid #dee2e6",
                      borderRadius: "20px",
                      fontFamily: "'Open Sans', sans-serif",
                    },
                    label: {
                      paddingRight: "4px",
                    },
                    remove: {
                      width: "18px",
                      height: "18px",
                      minWidth: "18px",
                      marginLeft: "6px",
                    },
                  }}
                >
                  {skill}
                </Pill>
              ))}
            </Group>
          )}
        </Stack>
      </Paper>

      <Paper
        p="lg"
        radius="12px"
        withBorder
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e9ecef",
        }}
      >
        <Select
          data={cityOptions}
          value={city}
          onChange={handleCityChange}
          placeholder="Все города"
          clearable
          size="md"
          leftSection={<IconMapPin size={18} stroke={2} color="#495057" />}
          styles={{
            input: {
              fontSize: "14px",
              height: "40px",
              borderRadius: "8px",
              fontFamily: "'Open Sans', sans-serif",
              border: "1px solid #e9ecef",
            },
            dropdown: {
              fontSize: "14px",
              fontFamily: "'Open Sans', sans-serif",
              borderRadius: "8px",
            },
            section: {
              marginLeft: "12px",
            },
            option: {
              fontSize: "14px",
            },
          }}
        />
      </Paper>
    </Stack>
  );
};

export default Filters;
