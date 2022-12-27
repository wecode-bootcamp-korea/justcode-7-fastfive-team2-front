import React, { useState, useEffect } from "react";
import "./DropBox.scss";
import LocationList from "./LocationList";
import CategoryList from "./CategoryList";
import CategoryDetailList from "./CategoryDetailList";

interface test {
  id?: any;
  name?: any;
}

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
  const [selectedDetail, setselectedSelectedDetail] = useState();
  const [currentLoactionId, setCurrentLoactionId] = useState();
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const [currentDetailId, setCurrentDetailId] = useState();
  const [categoryDetails, setCategoryDetails] = useState<test[]>();
  const location = categoryDropBox.places;
  const category = categoryDropBox.categories;

  const categoryDetail = `http://localhost:8000/list/detail?category_id=${currentCategoryId}`;
  useEffect(() => {
    fetch(categoryDetail)
      .then((res) => res.json())
      .then((data) => setCategoryDetails(data.categories_detail));
  }, [currentCategoryId]);

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
                      currentDetailId={currentDetailId}
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
                      currentDetailId={currentDetailId}
                    />
                  );
                })}
            </ul>
          </div>
        </li>
      </ul>
      {!currentCategoryId ? null : (
        <ul>
          <li>
            <div className="detailBoxWrapper">
              {selectedDetail ? selectedDetail : <span>상세분야▼</span>}

              <ul className="detailDropBox">
                {categoryDetails &&
                  categoryDetails.map((el: any) => {
                    const { id, name } = el;
                    return (
                      <CategoryDetailList
                        key={id}
                        name={name}
                        id={id}
                        setselectedSelectedDetail={setselectedSelectedDetail}
                        setCurrentDetailId={setCurrentDetailId}
                        currentLoactionId={currentLoactionId}
                        currentCategoryId={currentCategoryId}
                        setList={setList}
                      />
                    );
                  })}
              </ul>
            </div>
          </li>
        </ul>
      )}
    </>
  );
}

export default DropBox;
