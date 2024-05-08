import logo from './logo.svg';
import Sidebar from "./Components/Sidenavbar"
import Addcourse from './Components/Course';
import { Route,Routes,createBrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
 <Sidebar/>
    <Addcourse/>
    </>
  );
}

export default App;
