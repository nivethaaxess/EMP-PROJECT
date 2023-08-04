import React, { useState } from 'react';
import './Sidebar.css';
import Admin_Dash from '../Admin Dashboard/Admin_Dash';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import Admin_user from '../Admin user/Admin_user';
import Admin_User_check from '../Admin user/Admin_User_check';
import User from '../component/user';
import Dash_check from '../Admin Dashboard/Dash_check';

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [sideBarName , setSideBarName] = useState(['DASHBOARD','ADMIN','VALUE','METHOD','DASHBOARD','DASHBOARD'])
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState('DASHBOARD');



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
    <div className={`menu-with-sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
      <div className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-content">
        
          {/* <button onClick={toggleSidebarWidth}>
            {isSidebarExpanded ? 'Decrease ' : 'Increase '}
          </button> */}

         
          <ListIcon className='icon-color' onClick={toggleSidebarWidth}/>

          {sideBarName.map((item, index) => (
        <div key={index} className="icon-and-name"  onClick={() => handleMenuItemClick(item)}>
          <AccountCircleIcon className='icon-color' />
          <span className="icon-content">
            {isSidebarExpanded ? item : ''}
          </span>
        </div>
      ))}

         
        </div>
      </div>
      <div className={`top-menu ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="menu-icon" >
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        </div>

       
       
      </div>
     
      {console.log('selectedItem======>>>>>>>>>>>>',selectedItem)}

      <div className={` ${isSidebarExpanded ? 'sidebar-expanded1' : 'main-content'}`}>
      {
        selectedItem == 'DASHBOARD' ? <Admin_Dash/> : selectedItem == 'ADMIN' ?  <Admin_User_check/> : selectedItem == 'VALUE' ? <Dash_check/> : null 
      }
      </div>


      

    </div>
  );
};

export default Sidebar;
