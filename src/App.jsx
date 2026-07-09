import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ModrenCard from "./pages/ModrenCard";
import LegoConverter from "./pages/LegoConverter";
import ReportsDashboard from "./pages/ReportsDashboard";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>

          <Route 
            path="/" 
            element={<Home />} 
          />

          <Route 
            path="/modren-card" 
            element={<ModrenCard />} 
          />

          <Route 
            path="/lego-convertor" 
            element={<LegoConverter />} 
          />

          <Route 
            path="/reports" 
            element={<ReportsDashboard />} 
          />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;