import React, { useState,useEffect } from "react";
import "./sidepanel.css";
 import User from './user';
// import Admin_Dash from '../Admin Dashboard/Admin_Dash';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from 'react-router-dom';

const Sidepanel = () => {
  const [isSidebar1Expanded, setIsSidebar1Expanded] = useState(false);
  const navigate = useNavigate();

  const [logout,setlogout] = useState(false);

  const toggleSidebar1Width = () => {
    setIsSidebar1Expanded((prevState) => !prevState);
  };
  useEffect(()=>{
    if(!localStorage.getItem('auth'))
       navigate('/');
        
 },[logout])


  const logoutHandler =()=>
  {
     localStorage.removeItem('auth')
     localStorage.removeItem('userId')
     setlogout(true);
  }


  return (
    <div 
    className={`menu-with-sidebar1 `}

    >
      <div className={`sidebar1 ${isSidebar1Expanded ? "expanded" : ""}`}>
        <div className="sidebar1-content">
          {/* <button onClick={toggleSidebar1Width}>
            {isSidebar1Expanded ? 'Decrease ' : 'Increase '}
          </button> */}

          <ListIcon className="icon-color" onClick={toggleSidebar1Width} />

          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebar1Expanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebar1Expanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebar1Expanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebar1Expanded ? "Search" : ""}
            </span>
          </div>

          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebar1Expanded ? "Search" : ""}
            </span>
          </div>
          <div className="icon-and-name">
            <AccountCircleIcon className="icon-color" />
            <span className="icon-content">
              {isSidebar1Expanded ? "Search" : ""}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`top-menu1 ${isSidebar1Expanded ? "sidebar1-expanded" : ""}`}

      >
        <div className="menu-icon ">
          <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            
          </ul>
          <div><button onClick={logoutHandler}>Logout</button></div>
          </div>
        </div>
      </div>
      {/* <div className="check">
            nsdkvn
        </div> */}
      <div
        className={` ${
          isSidebar1Expanded ? "sidebar1-expanded1" : "main-content"
        }`}
      >
        <User />
      </div>
    </div>
  );
};

export default Sidepanel;
