import React from "react";
import { useSearchParams } from "react-router-dom";
import "./CategoryList.scss";
function CategoryList({
  name,
  id,
  setList,
  setSelectedCategory,
  currentLoactionId,
  setCurrentCategoryId,
}: {
  name?: string;
  id?: any;
  setList: any;
  setSelectedCategory: any;
  currentLoactionId: any;
  setCurrentCategoryId: any;
}) {
  const [param, setParam] = useSearchParams();

  const getCategoryList = () => {
    if (currentLoactionId) {
      const categoryBoxList = `http://localhost:8000/list?category_id=${id}&place_id=${currentLoactionId}`;
      fetch(categoryBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setSelectedCategory(name);
      param.set("category", id);
      setParam(param);
      setCurrentCategoryId(id);
    } else if (!currentLoactionId) {
      const categoryBoxList = `http://localhost:8000/list?category_id=${id}`;
      fetch(categoryBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setSelectedCategory(name);
      param.set("category", id);
      setParam(param);
      setCurrentCategoryId(id);
    }
  };

  return (
    <>
      <li className="categoryListBox">
        <span onClick={getCategoryList}>{name}</span>
      </li>
    </>
  );
}

export default CategoryList;
