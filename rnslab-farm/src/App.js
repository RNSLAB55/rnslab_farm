import "./App.css"
import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./page/login";
import Main from "./page/main/main";
import Type from "./page/type";
import EachSensor from "./page/main/components/everySensor/eachSensor/eachSensor";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}/>
      <Route path="/type" element={<Type></Type>}/>
      <Route path="/main" element={<Main></Main>}/>
      <Route path="/eachSensor/:item" element={<EachSensor></EachSensor>}/>
    </Routes>
  );
};

export default App;