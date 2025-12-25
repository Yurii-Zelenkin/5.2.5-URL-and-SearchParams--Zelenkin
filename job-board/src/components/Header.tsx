import React from "react";
import { Container, Group, Text } from "@mantine/core";

const Header: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e9ecef",
        padding: "16px 0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Group align="center">
            <Text
              size="18px"
              fw={700}
              style={{
                color: "#FFFFFF",
                fontFamily: "Arial, sans-serif",
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#FF0000",
              }}
            >
              hh
            </Text>
            <Text
              size="16px"
              fw={600}
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "155%",
                letterSpacing: "0%",
              }}
            >
              .FrontEnd
            </Text>
          </Group>

          <Group
            gap="xl"
            align="center"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Group gap={6} align="center">
              <Text
                component="a"
                href="#"
                size="14px"
                fw={500}
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "155%",
                  letterSpacing: "0%",
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                Вакансии FE
              </Text>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#5B7BFA",
                }}
              />
            </Group>
            <Text
              component="a"
              href="#"
              size="14px"
              fw={500}
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "155%",
                letterSpacing: "0%",
                color: "#495057",
                textDecoration: "none",
                cursor: "pointer",
                display: "inline-flex",
                gap: "4px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.91797 16.599C4.16548 15.7752 4.67194 15.0532 5.36222 14.54C6.05249 14.0268 6.88982 13.7497 7.74997 13.75H11.75C12.6112 13.7497 13.4496 14.0274 14.1404 14.5418C14.8311 15.0562 15.3374 15.7798 15.584 16.605M18.75 9.75C18.75 14.7206 14.7206 18.75 9.75 18.75C4.77944 18.75 0.75 14.7206 0.75 9.75C0.75 4.77944 4.77944 0.75 9.75 0.75C14.7206 0.75 18.75 4.77944 18.75 9.75ZM12.75 7.75C12.75 9.40685 11.4069 10.75 9.75 10.75C8.09315 10.75 6.75 9.40685 6.75 7.75C6.75 6.09315 8.09315 4.75 9.75 4.75C11.4069 4.75 12.75 6.09315 12.75 7.75Z"
                  stroke="#0F0F10"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Обо мне
            </Text>
          </Group>

          <div style={{ width: "100px" }}></div>
        </Group>
      </Container>
    </header>
  );
};

export default Header;
