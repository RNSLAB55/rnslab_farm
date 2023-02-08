import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import {SpinLoading} from "antd-mobile";

import EverySensor from "./components/everySensor/everySensor";
import Setting from "./components/setting/setting";

import leftIcon from "../../assets/img/left.png";

const Main = () => {
    const node = useLocation();
    const [menu, setMenu] = useState(1);
    const changeMenu = (menuNo) => {
        setMenu(menuNo);
    }

    const spinLoading = () => {
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{
                    display: 'flex',
                    paddingTop: "60%",
                    justifyContent: 'center',
                }}>
                    <SpinLoading></SpinLoading>
                </div>
                <p style={{marginTop:"20px"}}>프로필 화면으로 돌아가주세요.</p>
            </div>
        )
    }

    return (
        <div className="main">
            <div className="header">
                <div className='top'>
                    <div className='backButton'>
                        <button onClick={() => {
                            window.history.back();
                        }}>
                            <img src={leftIcon}/>
                        </button>
                    </div>
                    {node.state == null ? (
                        spinLoading()
                    ):(
                        <>
                            <div className="title">{node.state.node_id}</div>
                            <div className="temp">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>    
                    )}
                </div>
                {node.state == null ? null : (
                    <>
                        <div className="menu">
                            <div className={menu === 1 ? "itemClicked" : "item"}>
                                <button onClick={() => {
                                    changeMenu(1);
                                }}>요약</button>
                            </div>
                            <div className={menu === 4 ? "itemClicked" : "item"}>
                                <button onClick={() => {
                                    changeMenu(4);
                                }}>설정</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {node.state == null ? null : (
                <div className="body">
                    {menu === 1 ? (
                        <EverySensor init={node.state}></EverySensor>
                    ): menu === 4 ? (
                        <Setting changeMenu={changeMenu} init={node.state}></Setting>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default Main;