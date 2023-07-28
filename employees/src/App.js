import Admin_Dash from "./Admin Dashboard/Admin_Dash";
 // import User from "./component/user"
  import User from "./component/nive"

import MenuBar from "./Header/MenuBar";
import NavBar from "./Header/NavBar";
import Sidebar from "./side bar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <Sidebar/>
     {/* <MenuBar/> */}
      {/* <Admin_Dash /> */}
     {/* <NavBar/> */}

    </div>
  );
}

export default App;

