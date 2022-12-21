import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Test from "./asdasd/Test";
import EditPost from "./EditPost/EditPost";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hi" element={<Test />} />
        <Route path="/corporation/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
