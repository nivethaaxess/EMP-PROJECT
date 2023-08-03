import React, { useState } from "react";
import "./sidepanel.css";
 import User from './user';
// import Admin_Dash from '../Admin Dashboard/Admin_Dash';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";

const Sidepanel = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebarWidth = () => {
    setIsSidebarExpanded((prevState) => !prevState);
  };

  return (
    <div 
    className={`menu-with-sidebar ${isSidebarExpanded ? "expanded" : ""}`}

    >
      <div className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
        <div className="sidebar-content">
          {/* <button onClick={toggleSidebarWidth}>
            {isSidebarExpanded ? 'Decrease ' : 'Increase '}
          </button> */}

          <ListIcon className="icon-color" onClick={toggleSidebarWidth} />

          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebarExpanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebarExpanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebarExpanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebarExpanded ? "Search" : ""}
            </span>
          </div>

          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebarExpanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebarExpanded ? "Search" : ""}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`top-menu ${isSidebarExpanded ? "sidebar-expanded" : ""}`}

      >
        <div className="menu-icon">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      {/* <div className="check">
            nsdkvn
        </div> */}
      <div
        className={` ${
          isSidebarExpanded ? "sidebar-expanded1" : "main-content"
        }`}
      >
        <User />
      </div>
    </div>
  );
};

export default Sidepanel;
