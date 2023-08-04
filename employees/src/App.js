
import Sidebar from "./side bar/Sidebar";
import Login from "./Admin_Dashboard/login";
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
