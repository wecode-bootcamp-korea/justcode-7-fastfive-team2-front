import React from "react";

function Banner({ img }: { img: string }) {
  return (
    <div>
      <img className="banner" alt="banner" src={img} />
    </div>
  );
}

export default Banner;
