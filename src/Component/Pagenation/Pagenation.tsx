import React from "react";
import "./Pagenation.scss";

interface pagenationInter {
  totalLength: number;
  blockPage: number;
  setBlockPage: Function;
  pageLimit: number;
  setCurrentBanner: Function;
}

function Pagenation({
  totalLength,
  blockPage,
  pageLimit,
  setCurrentBanner,
}: pagenationInter) {
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
            onClick={() => setCurrentBanner((el - 1) * -1310)}
            key={el}
            className="pagenation"
          >
            {el}
          </button>
        );
      })}
    </>
  );
}

export default Pagenation;
