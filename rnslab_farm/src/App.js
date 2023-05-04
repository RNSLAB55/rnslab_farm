import React, {lazy, Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./page/login";
// import Type from "./page/type";
// import Main from "./page/main/main";
// import EachSensor from './page/main/components/everSensor/eachSensor/eachSensor';
import ScrollToTop from './ScrollTop';

const Type = lazy(async () => await import('./page/type'));
const Main = lazy(async () => await import('./page/main/main'));
const EachSensor = lazy(async () => await import('./page/main/components/everSensor/eachSensor/eachSensor'));


function App() {
  return (
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route path={"/type"} element={<Suspense fallback={<></>}><Type/></Suspense>}></Route>
          <Route path={"/main"} element={<Suspense fallback={<></>}><Main/></Suspense>}></Route>
          <Route path={"/eachSensor/:item"} element={<Suspense fallback={<></>}><EachSensor/></Suspense>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
