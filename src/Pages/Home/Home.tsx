import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Home.scss";
import Pagenation from "../../Component/Pagenation/Pagenation";
import Contentbox from "../../Component/Contentbox/Contentbox";
import Banner from "../../Component/Banner/Banner";

interface isBanner {
  id: number;
  img: string;
  num: number;
}

interface isCategorys {
  id: number;
  img: string;
  categoryName: string;
  content: string;
}

//TODO ::
// type IntersectHandler = (
//   entry: IntersectionObserverEntry,
//   observer: IntersectionObserver
// ) => void;

function Home() {
  const [banner, setBanner] = useState<isBanner[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentBannerCount, setCurrentBannerCount] = useState(1);
  const [blockPage, setBlockPage] = useState(0);
  const [categorys, setCategorys] = useState<isCategorys[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const pageNumber = [];
  const pageLimit = 5;

  useEffect(() => {
    fetch("./data/banner.json")
      .then((res) => res.json())
      .then((data) => setBanner(data.data));
  }, []);

  useEffect(() => {
    fetch("./data/category.json")
      .then((res) => res.json())
      .then((data) => setCategorys(data.data));
  }, []);

  //TODO ::
  // const handleObserver = useCallback(async (entries: any) => {
  //   const target = entries[0];
  //   if (target.isIntersecting) {
  //     console.log("성공!?");
  //     fetch("./data/category.json")
  //       .then((res) => res.json())
  //       .then((data) => setCategorys(data.data));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!observerRef.current) return;
  //   const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
  //   observer.observe(observerRef.current);
  //   return () => observer.disconnect();
  // }, [observerRef]);

  // console.log(categorys);

  const totalLength: number = Math.ceil(banner.length / 2);

  for (let i = 1; i <= totalLength; i++) {
    pageNumber.push(i);
  }

  const NextBanner = () => {
    if (currentBannerCount >= totalLength) {
      setCurrentBanner(0);
      setCurrentBannerCount(1);
    } else {
      setCurrentBannerCount(currentBannerCount + 1);
      setCurrentBanner(currentBanner - 1310);
    }
  };

  const PrevBanner = () => {
    if (currentBannerCount === 1) {
      setCurrentBanner(-((totalLength - 1) * 1310));
      setCurrentBannerCount(totalLength);
    } else {
      setCurrentBannerCount(currentBannerCount - 1);
      setCurrentBanner(currentBanner + 1310);
    }
  };

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.style.transition = "all 0.5s ease-in-out";
      bannerRef.current.style.transform = `translateX(${currentBanner}px)`;
    }
  }, [currentBanner]);

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

  const ZendeskOpen = () => {
    window.open("https://www.zendesk.kr/");
  };

  return (
    <div className="homeWrapper">
      <div className="mainBannerWrap">
        <button onClick={PrevBanner} className="bannerButton">
          〈
        </button>
        <div className="mainbannerWrapper">
          <div ref={bannerRef} className="mainBanner">
            {banner.map((el) => {
              const { id, img } = el;
              return <Banner key={id} img={img} />;
            })}
          </div>
        </div>
        <button onClick={NextBanner} className="bannerButton">
          〉
        </button>
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

        <Pagenation
          totalLength={totalLength}
          blockPage={blockPage}
          setBlockPage={setBlockPage}
          pageLimit={pageLimit}
          setCurrentBanner={setCurrentBanner}
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

      <div className="introduceCompany">
        <button>우리 회사 소개하기</button>
      </div>

      <div className="categoryShow">
        <div className="sectorsView">
          <span>업종별 살펴보기</span>
        </div>
        <div className="allView">
          <button>전체 보기</button>
        </div>
      </div>

      <div className="contentWrapper">
        {categorys.map((el) => {
          const { id, img, categoryName, content } = el;
          return (
            <Contentbox
              key={id}
              img={img}
              categoryName={categoryName}
              content={content}
            />
          );
        })}
        {!isLoading && <div ref={observerRef} />}
      </div>

      <div className="ZendeskPageOpen">
        <button onClick={ZendeskOpen}>멤버 소개 관련 문의</button>
      </div>
    </div>
  );
}

export default Home;
