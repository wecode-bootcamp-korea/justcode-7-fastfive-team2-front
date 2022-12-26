import React from "react";
import "./CategoryDetailList.scss";

function CategoryDetailList({ name, id }: { name?: string; id?: number }) {
  return (
    <>
      <li className="CategoryDetailListBox">
        <span>{name}</span>
      </li>
    </>
  );
}

export default CategoryDetailList;
