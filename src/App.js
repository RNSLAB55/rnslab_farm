import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./page/login";
import Type from "./page/type";
import Main from "./page/main/main";
import EachSensor from './page/main/components/everSensor/eachSensor/eachSensor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/type"} element={<Type />}></Route>
        <Route path={"/main"} element={<Main />}></Route>
        <Route path={"/eachSensor/:item"} element={<EachSensor/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
