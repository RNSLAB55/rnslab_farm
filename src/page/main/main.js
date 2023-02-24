import { useLocation } from "react-router-dom";
import { SpinLoading } from "antd-mobile";
import { useState } from "react";

import EverySensor from "./components/everSensor/everySensor";
import Setting from "./components/setting/setting";

import leftIcon from "../../assets/img/left.png";

const Main = () => {
    const id = useLocation().state.id;
    const node = useLocation().state.node;
    const userNode = useLocation().state.userNode;
    console.log(id, node, userNode);
    const [menu, setMenu] = useState(1);
    const changeMenu = (menuNo) => {
        setMenu(menuNo);
    }

    const spinLoading = () => {
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{
                    flexGrow: 2,
                    display: "flex",
                    paddingTop: "70%",
                    justifyContent: "center",
                }}>
                    <SpinLoading></SpinLoading>
                </div>
                <p style={{marginTop:"20px"}}>Loading...</p>
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
                    {node == null ? (
                        spinLoading()
                    ):(
                        <>
                            <div className="title">{userNode.node_Type === null ? node.node_id : userNode.node_Type}</div>
                            <div className="temp">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>    
                    )}
                </div>
                {node == null ? null : (
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
            {node == null ? null : (
                <div className="body">
                    {menu === 1 ? (
                        <EverySensor init={{node,id}}></EverySensor>
                    ): menu === 4 ? (
                        <Setting changeMenu={changeMenu} init={{node,id}}></Setting>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default Main;