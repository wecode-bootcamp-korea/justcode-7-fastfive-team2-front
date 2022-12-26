import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contentbox.scss";

function Contentbox({
  id,
  img,
  categoryName,
  content,
  setList,
  setSelectedCategory,
}: {
  id: number;
  img: string;
  categoryName: string;
  content: string;
  setList: any;
  setSelectedCategory: any;
}) {
  const navigate = useNavigate();
  const categoryBoxList = `http://localhost:8000/list?category_id=${id}`;
  const goToList = () => {
    fetch(categoryBoxList, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setList(data));
    navigate(`/list`);
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <div onClick={goToList} className="contentBox">
        <img alt="category" src={img} className="contentImage" />
        <div className="categoryNameBox">
          <span className="categoryName">{categoryName}</span>
        </div>
        <div className="content">
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
}

export default Contentbox;
