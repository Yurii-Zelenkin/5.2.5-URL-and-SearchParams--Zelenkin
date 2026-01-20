import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          primaryColor: "blue",
          fontFamily: "Inter, sans-serif",
          components: {
            Button: {
              defaultProps: {
                size: "xs",
              },
            },
            TextInput: {
              defaultProps: {
                size: "xs",
              },
            },
            Select: {
              defaultProps: {
                size: "xs",
              },
            },
            Pill: {
              defaultProps: {
                size: "xs",
              },
            },
            Badge: {
              defaultProps: {
                size: "xs",
              },
            },
          },
        }}
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
