import React from "react";
import { useSearchParams } from "react-router-dom";
import "./CategoryDetailList.scss";

function CategoryDetailList({
  id,
  name,
  setselectedSelectedDetail,
  setCurrentDetailId,
  currentCategoryId,
  currentLoactionId,
  setList,
}: {
  id?: any;
  name?: string;
  setselectedSelectedDetail?: any;
  setCurrentDetailId?: any;
  currentCategoryId?: any;
  currentLoactionId?: any;
  setList?: any;
}) {
  const [param, setParam] = useSearchParams();

  const selectDetail = () => {
    if (currentCategoryId && currentLoactionId) {
      const detailBoxList = `http://localhost:8000/list?place_id=${currentLoactionId}&category_id=${currentCategoryId}&category_detail_id=${id}`;
      fetch(detailBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setselectedSelectedDetail(name);
      param.set("detail", id);
      setParam(param);

      setselectedSelectedDetail(name);
      setCurrentDetailId(id);
    } else if (currentCategoryId) {
      const detailBoxList = `http://localhost:8000/list?category_id=${currentCategoryId}&category_detail_id=${id}`;
      fetch(detailBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setselectedSelectedDetail(name);
      param.set("detail", id);
      setParam(param);

      setselectedSelectedDetail(name);
      setCurrentDetailId(id);
    }
  };

  return (
    <>
      <li onClick={selectDetail} className="CategoryDetailListBox">
        <span>{name}</span>
      </li>
    </>
  );
}

export default CategoryDetailList;
