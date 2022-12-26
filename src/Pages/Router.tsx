import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import List from "./List/List";

interface isList {
  id: number;
  image: string;
  corporation_name: string;
  introduction: string;
}

function Router() {
  const [list, setList] = useState<isList[]>([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const lists = "http://localhost:8000/list";
  const listsMock = "./data/List.json";

  useEffect(() => {
    fetch(lists)
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home setList={setList} setSelectedCategory={setSelectedCategory} />
          }
        />
        <Route
          path="/list"
          element={
            <List
              list={list}
              setList={setList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
