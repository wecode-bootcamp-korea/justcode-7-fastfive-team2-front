import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import Pagenation from "../../Component/Pagenation/Pagenation";
import Contentbox from "../../Component/Contentbox/Contentbox";

function Home() {
  return (
    <>
      <div className="homeWrapper">
        <div className="mainBannerWrap">
          <button className="bannerButton">〈</button>
          <div className="mainbannerWrapper"></div>
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
