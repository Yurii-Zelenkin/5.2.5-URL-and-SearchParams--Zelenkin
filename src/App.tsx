import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import VacanciesPage from "./pages/VacanciesPage";
import VacancyDetailsPage from "./pages/VacancyDetailsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/5.2.5-URL-and-SearchParams--Zelenkin/">
      <div style={{ minHeight: "100vh", backgroundColor: "#F6F6F7" }}>
        <Header />
        <Routes>
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailsPage />} />
          <Route path="*" element={<Navigate to="/vacancies" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
