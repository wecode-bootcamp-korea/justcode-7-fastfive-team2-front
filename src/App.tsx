import React from "react";
import "./App.scss";
import "./Style/reset.scss";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Sidebar from "./Component/Sidebar/Sidebar";
import Router from "./Pages/Router";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="mainWrapper">
          <Sidebar />
          <div className="mainContent">
            <Router />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
