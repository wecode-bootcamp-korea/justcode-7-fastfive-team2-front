import React from "react";
import "./DropBox.scss";
function DropBox() {
  return (
    <>
      <ul>
        <li>
          <div className="dropBoxWrapper">
            <span>지역▼</span>
            <ul className="areaDropBox">
              <li>
                <span>서울</span>
              </li>
              <li>
                <span>경기</span>
              </li>
              <li>
                <span>인천</span>
              </li>
              <li>
                <span>충북</span>
              </li>
              <li>
                <span>충남</span>
              </li>
              <li>
                <span>전북</span>
              </li>
              <li>
                <span>전남</span>
              </li>
              <li>
                <span>경북</span>
              </li>
              <li>
                <span>경남</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ul>
        <li>
          <div className="dropBoxWrapper">
            <span>카테고리▼</span>
            <ul className="categoryDropBox">
              <li>
                <span>예시1</span>
              </li>
              <li>
                <span>예시2</span>
              </li>
              <li>
                <span>예시3</span>
              </li>
              <li>
                <span>예시4</span>
              </li>
              <li>
                <span>예시5</span>
              </li>
              <li>
                <span>예시6</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div className="dropBoxWrapper">
            <span>상세분야▼</span>
            <ul className="detailDropBox">
              <li>
                <span>상세1</span>
              </li>
              <li>
                <span>상세2</span>
              </li>
              <li>
                <span>상세3</span>
              </li>
              <li>
                <span>상세4</span>
              </li>
              <li>
                <span>상세5</span>
              </li>
              <li>
                <span>상세6</span>
              </li>
              <li>
                <span>상세7</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </>
  );
}

export default DropBox;
