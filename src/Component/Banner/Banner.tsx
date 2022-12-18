import React from "react";

/* TODO :: interface bannerRefType {
   bannerRef: React.ForwardedRef<HTMLDivElement>;
 }
 { img, bannerRef }: bannerRefType, img: string */
function Banner() {
  return (
    <div className="mainBanner">
      <img className="banner" alt="banner" />
    </div>
  );
}

export default Banner;
