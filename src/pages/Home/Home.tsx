import React from 'react';
import './Home.scss';

function Home() {
  const areYouCool: boolean = true;
  const a = () => {
    console.log(areYouCool);
  };

  a();
  return <div>홈</div>;
}

export default Home;
