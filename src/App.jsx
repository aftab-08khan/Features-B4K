import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ModrenCard from "./pages/ModrenCard";
import LegoConverter from "./pages/LegoConverter";
import ReportsDashboard from "./pages/ReportsDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" index />
        <Route element={<ModrenCard />} path="/modren-card" />
        <Route element={<LegoConverter />} path="/lego-convertor" />
        <Route element={<ReportsDashboard/>} path="/reports"/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
