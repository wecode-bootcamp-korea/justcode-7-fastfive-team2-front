import React from "react";

function Contentbox() {
  return (
    <div>
      <div className="contentBox">
        <img
          alt="category"
          src="https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg"
          className="contentImage"
        />
        <div className="categoryNameBox">
          <span className="categoryName">카테고리 이름</span>
        </div>
        <div className="content">
          <span>아주아주 맛있는 즐거운 저희 제품 입니다.</span>
        </div>
      </div>
    </div>
  );
}

export default Contentbox;
