import React from "react";
import { useSearchParams } from "react-router-dom";
import "./LocationList.scss";

function LocationList({
  name,
  id,
  setList,
  setselectedLoactaion,
  setCurrentLoactionId,
  currentCategoryId,
  currentDetailId,
}: {
  name?: string;
  id?: any;
  setList?: any;
  setselectedLoactaion?: any;
  setCurrentLoactionId: any;
  currentCategoryId: any;
  currentDetailId: any;
}) {
  const [param, setParam] = useSearchParams();

  const getLoactionList = () => {
    if (currentDetailId && currentCategoryId) {
      const placeBoxList = `http://localhost:8000/list?category_id=${currentCategoryId}&place_id=${id}&category_detail_id=${currentDetailId}`;
      fetch(placeBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setselectedLoactaion(name);
      param.set("location", id);
      setParam(param);
      setCurrentLoactionId(id);
    } else if (!currentCategoryId) {
      const placeBoxList = `http://localhost:8000/list?place_id=${id}`;
      fetch(placeBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setselectedLoactaion(name);
      param.set("location", id);
      setParam(param);
      setCurrentLoactionId(id);
    } else if (currentCategoryId) {
      const placeBoxList = `http://localhost:8000/list?category_id=${currentCategoryId}&place_id=${id}`;
      fetch(placeBoxList, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data));

      setselectedLoactaion(name);
      param.set("location", id);
      setParam(param);
      setCurrentLoactionId(id);
    }
  };
  return (
    <>
      <li className="locationListBox">
        <span onClick={getLoactionList}>{name}</span>
      </li>
    </>
  );
}

export default LocationList;
