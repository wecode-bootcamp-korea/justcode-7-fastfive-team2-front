import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import Pagenation from "../../Component/Pagenation/Pagenation";
import Contentbox from "../../Component/Contentbox/Contentbox";
// import Banner from "../../Component/Banner/Banner";

function Home() {
  // const [banner, setBanner] = useState<banner[]>([]);
  // const bannerRef = useRef<HTMLDivElement | null>(null);

  // const test = () => {
  //   if (bannerRef.current) {
  //     bannerRef.current.style.transform = "translateX(-2130px)";
  //   }
  // };

  // useEffect(() => {
  //   fetch("./data/banner.json")
  //     .then((res) => res.json())
  //     .then((data) => setBanner(data.data));
  // }, []);

  // interface banner {
  //   id: number;
  //   img: string;
  // }
  // // test();
  // console.log(banner);
  return (
    <>
      <div className="homeWrapper">
        <div className="mainBannerWrap">
          <button className="bannerButton">〈</button>
          <div className="mainbannerWrapper">
            {/* {banner &&
              banner.map((el: banner) => {
                const { img, id } = el;
                return <Banner key={id} img={img} bannerRef={bannerRef} />;
              })} */}
          </div>
          <button className="bannerButton">〉</button>
        </div>

        <div className="PagenationWrpaer">
          <Pagenation />
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
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
          <Contentbox />
        </div>

        <div className="ZendeskPageOpen">
          <span>멤버 소개 관련 문의</span>
        </div>
      </div>
    </>
  );
}

export default Home;
