import Admin_Dash from "./Admin Dashboard/Admin_Dash";
import MenuBar from "./Header/MenuBar";
import NavBar from "./Header/NavBar";



function App() {
  return (
    <div className="App">
     <MenuBar/>
      <Admin_Dash />
     <NavBar/>
    </div>
  );
}

export default App;

