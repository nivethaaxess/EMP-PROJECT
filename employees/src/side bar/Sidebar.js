import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Admin_Dash from "../Admin_Dashboard/Admin_Dash";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List"; 
import Admin_user from "../Admin user/Admin_user";
import Admin_User_check from "../Admin user/Admin_User_check";
import Userdata from  "./Userdata"
import User from "../component/user";
import Dash_check from "../Admin_Dashboard/Dash_check";
import { useNavigate } from "react-router-dom";

import Admin_dash_check from "../Admin_Dashboard/Admin_dash_check";

import Userchange from "./Userchange";


const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [sideBarName, setSideBarName] = useState([
    "DASHBOARD",
    "ADMIN",
    "USER DATA",
    "Change Password",


  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState("DASHBOARD");
  const [logout, setlogout] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admin")) navigate("/");
  }, [logout]);

  const logoutHandler = () => {
    localStorage.removeItem("admin");
    setlogout(true);
  };

  const toggleSidebarWidth = () => {
    setIsSidebarExpanded((prevState) => !prevState);
  };

  //   const handleMouseOver = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseOut = () => {
  //   setIsHovered(false);
  // };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={`menu-with-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
      <div className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
        <div className="sidebar-content">
          {/* <button onClick={toggleSidebarWidth}>
            {isSidebarExpanded ? 'Decrease ' : 'Increase '}
          </button> */}

          <ListIcon className="icon-color" onClick={toggleSidebarWidth} />

          {sideBarName.map((item, index) => (
            <div
              key={index}
              className="icon-and-name"
              onClick={() => handleMenuItemClick(item)}
            >
              <AccountCircleIcon className="icon-color" />
              <span className="icon-content">
                {isSidebarExpanded ? item : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`top-menu ${isSidebarExpanded ? "sidebar-expanded" : ""}`}
      >
        <div className="menu-icon">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
            <div>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      {console.log("selectedItem======>>>>>>>>>>>>", selectedItem)}

      <div
        className={` ${
          isSidebarExpanded ? "sidebar-expanded1" : "main-content"
        }`}
      >
       {selectedItem === "DASHBOARD" ? (
         <Admin_dash_check/>
        ) : selectedItem === "ADMIN" ? (
          <Admin_User_check />

        ) : selectedItem === "USER DATA" ? (
          <Userdata/>

        ) : selectedItem ===  "Change Password" ? (
          <Userchange />

        ) : null}
           
      </div>
    </div>
  );
};

export default Sidebar;
