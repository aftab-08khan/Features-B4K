import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ModrenCard from "./pages/ModrenCard";
import LegoConverter from "./pages/LegoConverter";
import Game from './pages/Game'

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" index />
          <Route element={<ModrenCard/>} path="/modren-card"/>
          <Route element={<LegoConverter/>} path="/lego-convertor"/>
          <Route element={<Game/>} path="/game"/>


        </Routes>
      </BrowserRouter>
  );
};

export default App;
