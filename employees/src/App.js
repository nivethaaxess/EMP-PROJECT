import Admin_Dash from "./Admin Dashboard/Admin_Dash";
 import User from "./component/user"

import MenuBar from "./Header/MenuBar";
import NavBar from "./Header/NavBar";
import Sidebar from "./side bar/Sidebar";
// import Login from "./Admin_Dashboard/Login";
import Sidepanel from "./component/sidepanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          s<Route path="/" element={<Login />} />
          <Route path="/user" element={<Sidepanel />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
