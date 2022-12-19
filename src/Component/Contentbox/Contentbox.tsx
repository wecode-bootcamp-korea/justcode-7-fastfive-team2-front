import React from "react";
import "./Contentbox.scss";

function Contentbox({
  img,
  categoryName,
  content,
}: {
  img: string;
  categoryName: string;
  content: string;
}) {
  return (
    <div>
      <div className="contentBox">
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
