import Admin_Dash from "./Admin Dashboard/Admin_Dash";
 import User from "./component/user"
import MenuBar from "./Header/MenuBar";
import NavBar from "./Header/NavBar";
import Sidebar from "./side bar/Sidebar";
import Login from "./Admin Dashboard/Login";
import Sidepanel from "./component/sidepanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<Sidepanel />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
