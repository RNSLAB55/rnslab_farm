import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./page/login";
import Type from "./page/type";
import Main from "./page/main/main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/type"} element={<Type />}></Route>
        <Route path={"/main"} element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
