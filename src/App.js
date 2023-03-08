import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./page/login";
import Type from "./page/type";
<<<<<<< HEAD
=======
import Main from "./page/main/main";
>>>>>>> parent of 6e55476c (prefect)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/type"} element={<Type />}></Route>
<<<<<<< HEAD
=======
        <Route path={"/main"} element={<Main />}></Route>
>>>>>>> parent of 6e55476c (prefect)
      </Routes>
    </BrowserRouter>
  );
}

export default App;
