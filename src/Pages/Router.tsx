import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import List from "./List/List";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list:id" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
