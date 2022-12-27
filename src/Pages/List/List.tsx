import React, { useEffect, useState, useRef } from "react";
import DropBox from "../../Component/DropBox/DropBox";
import ListBox from "../../Component/ListBox/ListBox";
import ListPagenation from "../../Component/ListPagenation/ListPagenation";
import "./List.scss";

interface dropBoxList {
  id?: string;
  name?: string;
  location?: string[];
  category?: string[];
  category_detail?: string[];
}

function List({
  list,
  setList,
  selectedCategory,
  setSelectedCategory,
}: {
  list?: any;
  setList?: any;
  selectedCategory?: any;
  setSelectedCategory?: any;
}) {
  const [blockPage, setBlockPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const [categoryDropBox, setCategoryDropBox] = useState<dropBoxList[]>([]);
  const ListRef = useRef<HTMLDivElement>(null);

  const dropBoxList = "http://localhost:8000/list/info/?category_id=1";
  const dropBoxListMock = "./data/dropBoxList.json";

  useEffect(() => {
    fetch(dropBoxList)
      .then((res) => res.json())
      .then((data) => setCategoryDropBox(data));
  }, []);

  const totalLength: number = Math.ceil(list.length / 8);
  const pageLimit = 5;

  const prevPage = () => {
    setBlockPage(blockPage - 1);
  };

  const prevFirstPage = () => {
    setBlockPage(0);
  };

  const nextPage = () => {
    setBlockPage(blockPage + 1);
  };

  const LastPage = () => {
    setBlockPage(totalLength - pageLimit);
  };

  useEffect(() => {
    if (ListRef.current) {
      ListRef.current.style.transform = `translateY(${currentList}px)`;
    }
  }, [currentList]);

  return (
    <div className="listWrapper">
      <div className="mainListWrap">
        <div className="categoryName">
          {selectedCategory ? <h1>{selectedCategory}</h1> : <h1>전체 보기</h1>}
        </div>
      </div>

      <div className="introduceCompany">
        <div className="categoryBox">
          <DropBox
            categoryDropBox={categoryDropBox}
            setList={setList}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <button>우리 회사 소개하기</button>
      </div>

      <div className="listContentWrapper">
        <div ref={ListRef} className="listWrapper">
          {list.length !== 0 ? (
            list.map((el: any) => {
              const { id, image, corporation_name, introduction } = el;
              return (
                <ListBox
                  key={id}
                  img={image}
                  categoryName={corporation_name}
                  content={introduction}
                />
              );
            })
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>

      <div className="pagenationWrpaer">
        <button
          disabled={blockPage === 0}
          onClick={prevFirstPage}
          className="pagefirst"
        >
          ◀
        </button>
        <button
          disabled={blockPage === 0}
          onClick={prevPage}
          className="pageLeftBtn"
        >
          ◁
        </button>

        <ListPagenation
          totalLength={totalLength}
          blockPage={blockPage}
          setBlockPage={setBlockPage}
          pageLimit={pageLimit}
          setCurrentList={setCurrentList}
        />

        <button
          disabled={blockPage + pageLimit === totalLength}
          onClick={nextPage}
          className="pageRightBtn"
        >
          ▷
        </button>
        <button
          disabled={blockPage + pageLimit === totalLength}
          onClick={LastPage}
          className="pageLeftBtn"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default List;
