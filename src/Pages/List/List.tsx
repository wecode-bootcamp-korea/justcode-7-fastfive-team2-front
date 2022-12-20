import React, { useEffect, useState, useRef } from "react";
import DropBox from "../../Component/DropBox/DropBox";
import ListBox from "../../Component/ListBox/ListBox";
import ListPagenation from "../../Component/ListPagenation/ListPagenation";
import "./List.scss";

interface isList {
  id: number;
  img: string;
  categoryName: string;
  content: string;
}

function List() {
  const [list, setList] = useState<isList[]>([]);
  const [blockPage, setBlockPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const ListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("./data/List.json")
      .then((res) => res.json())
      .then((data) => setList(data.data));
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

  console.log(list);

  return (
    <div className="listWrapper">
      <div className="mainListWrap">
        <div className="categoryName">
          <h1>전체 보기</h1>
        </div>
      </div>

      <div className="introduceCompany">
        <div className="categoryBox">
          <DropBox />
        </div>
        <button>우리 회사 소개하기</button>
      </div>

      <div className="listContentWrapper">
        <div ref={ListRef} className="listWrapper">
          {list &&
            list.map((el) => {
              const { id, img, categoryName, content } = el;
              return (
                <ListBox
                  key={id}
                  img={img}
                  categoryName={categoryName}
                  content={content}
                />
              );
            })}
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
