import Admin_Dash from "./Admin Dashboard/Admin_Dash";
 // import User from "./component/user"
  import User from "./component/nive"

import MenuBar from "./Header/MenuBar";
import NavBar from "./Header/NavBar";
import Sidebar from "./side bar/Sidebar";
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Route, Navigate, Routes } from 'react-router-dom';


function App() {
  return (
    <div >

      {/* <Sidebar/> */}
     {/* <MenuBar/> */}
      {/* <Admin_Dash /> */}
     {/* <NavBar/> */}
     {/* <User/> */}
     <Routes>
     <Route path="/" element={<Sidebar/>} />
      {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
      <Route path="/*" element={<Navigate to="/login" />} /> */}
      </Routes>
     

        <User/>
    </div>
  );
}

export default App;

