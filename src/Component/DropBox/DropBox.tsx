import React, { useState } from "react";
import "./DropBox.scss";
import LocationList from "./LocationList";
import CategoryList from "./CategoryList";
import CategoryDetailList from "./CategoryDetailList";

function DropBox({
  categoryDropBox,
  setList,
  selectedCategory,
  setSelectedCategory,
}: {
  categoryDropBox: any;
  setList: any;
  selectedCategory: any;
  setSelectedCategory: any;
}) {
  const [selectedLoactaion, setselectedLoactaion] = useState();
  const [currentLoactionId, setCurrentLoactionId] = useState();
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const location = categoryDropBox.places;
  const category = categoryDropBox.categories;
  const categoryDetail = categoryDropBox.categories_detail;

  return (
    <>
      <ul>
        <li>
          <div className="dropBoxWrapper">
            {selectedLoactaion ? (
              <span>{selectedLoactaion}</span>
            ) : (
              <span>지역▼</span>
            )}

            <ul className="areaDropBox">
              {location &&
                location.map((el: any) => {
                  const { id, name } = el;
                  return (
                    <LocationList
                      key={id}
                      id={id}
                      name={name}
                      setList={setList}
                      setselectedLoactaion={setselectedLoactaion}
                      currentCategoryId={currentCategoryId}
                      setCurrentLoactionId={setCurrentLoactionId}
                    />
                  );
                })}
            </ul>
          </div>
        </li>
      </ul>

      <ul>
        <li>
          <div className="dropBoxWrapper">
            {selectedCategory ? (
              <span>{selectedCategory}</span>
            ) : (
              <span>카테고리▼</span>
            )}

            <ul className="categoryDropBox">
              {category &&
                category.map((el: any) => {
                  const { id, name } = el;
                  return (
                    <CategoryList
                      key={id}
                      id={id}
                      name={name}
                      setList={setList}
                      setSelectedCategory={setSelectedCategory}
                      currentLoactionId={currentLoactionId}
                      setCurrentCategoryId={setCurrentCategoryId}
                    />
                  );
                })}
            </ul>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div className="dropBoxWrapper">
            <span>상세분야▼</span>
            <ul className="detailDropBox">
              {categoryDetail &&
                categoryDetail.map((el: any) => {
                  const { id, name } = el;
                  return <CategoryDetailList key={id} id={id} name={name} />;
                })}
            </ul>
          </div>
        </li>
      </ul>
    </>
  );
}

export default DropBox;
