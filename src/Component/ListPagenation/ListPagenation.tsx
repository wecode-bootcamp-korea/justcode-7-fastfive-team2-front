import React from "react";
import "./ListPagenation.scss";

function ListPagenation({
  totalLength,
  blockPage,
  pageLimit,
  setCurrentList,
}: {
  totalLength: number;
  blockPage: number;
  setBlockPage: Function;
  pageLimit: number;
  setCurrentList: Function;
}) {
  const pageNumber = [];

  for (let i = 1; i <= totalLength; i++) {
    pageNumber.push(i);
  }

  const page = pageNumber.slice(blockPage, pageLimit + blockPage);

  return (
    <>
      {page.map((el: number) => {
        return (
          <button
            onClick={() => setCurrentList((el - 1) * -524)}
            key={el}
            className="listpagenation"
          >
            {el}
          </button>
        );
      })}
    </>
  );
}

export default ListPagenation;
