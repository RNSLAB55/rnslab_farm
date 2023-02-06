import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import EverySensor from "./components/everySensor/everySensor";
import Setting from "./components/setting/setting";
import InDevelop from "./components/inDevelop/inDevelop";

import leftIcon from "../../assets/img/left.png";

const Main = () => {
  const node = useLocation();
  // console.log(node);
  const [menu, setMenu] = useState(1);
  const changeMenu = (menuNo) => {
    setMenu(menuNo);
  };
  return (
    <div className="main">
      <div className="header">
        <div className="top">
          <div className="backButton">
            <button
              onClick={() => {
                window.history.back();
              }}
            >
              <img src={leftIcon} alt="" />
            </button>
          </div>
          <div className="title">{node.state.node_id}</div>
          <div className="temp">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div className="menu">
          <div className={menu === 1 ? "itemClicked" : "item"}>
            <button
              onClick={() => {
                changeMenu(1);
              }}
            >
              요약
            </button>
          </div>
          <div className={menu === 2 ? "itemClicked" : "item"}>
            <button
              onClick={() => {
                changeMenu(2);
              }}
            >
              CCTV
            </button>
          </div>
          <div className={menu === 3 ? "itemClicked" : "item"}>
            <button
              onClick={() => {
                changeMenu(3);
              }}
            >
              제어
            </button>
          </div>
          <div className={menu === 4 ? "itemClicked" : "item"}>
            <button
              onClick={() => {
                changeMenu(4);
              }}
            >
              설정
            </button>
          </div>
        </div>
      </div>
      <div className="body">
        {menu === 1 ? (
          <EverySensor init={node}></EverySensor>
        ) : menu === 2 ? (
          <InDevelop></InDevelop>
        ) : menu === 3 ? (
          <InDevelop></InDevelop>
        ) : menu === 4 ? (
          <Setting changeMenu={changeMenu}></Setting>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Main;
