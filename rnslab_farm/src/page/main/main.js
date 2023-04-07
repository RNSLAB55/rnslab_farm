import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SpinLoading } from "antd-mobile";

import EverySensor from "./components/everSensor/everSensor";
import Setting from "./components/setting/setting";
import SensorWithRange from "../../api/sensorWithRange";

import leftIcon from "../../assets/img/left.png";

const Main = () => {
    const {nodes,node,userNode} = useLocation().state;
    const [menu, setMenu] = useState(1);

    //로딩중
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

    const changeMenu = (menuNo) => {
        setMenu(menuNo);
    }

    return (
        <div className="main">
            <div className="header">
                <div className="top">
                    <div className="backButton">
                        <button onClick={() => {
                            window.history.back();
                        }}><img src={leftIcon} alt=""/></button>
                    </div>
                    {node === null ? (
                        spinLoading()
                    ) : (
                        <>
                            <div className="title">{userNode.node_Type === null ? node.node_id : userNode.node_Type}</div>
                            <div className="temp">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </>
                    )}
                </div>
                {node === null ? spinLoading() : (
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
            {node === null ? spinLoading() : (
                <div className="body">
                    {menu === 1 ? (
                        <EverySensor init={{userNode, node}}></EverySensor>
                    ) : (
                        <Setting init={{nodes,userNode, node}}></Setting>
                    )}
                </div>
            )}
        </div>
    )
}

export default Main;