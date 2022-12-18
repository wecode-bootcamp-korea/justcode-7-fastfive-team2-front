import React from "react";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <>
      <div className="sidebarBody">
        <ul className="sidebarWraper">
          <div>
            <ul className="community">
              커뮤니티
              <li>멤버 소개</li>
              <hr />
            </ul>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
