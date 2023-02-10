import Nodes from "../api/nodes";
import moment from "moment";
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SpinLoading } from "antd-mobile";

const Type = () => {
    const navigate = useNavigate();
    const id = useLocation();
    const {nodes,loading} = Nodes();

    console.log(id, nodes);

    useEffect(() => {
        !localStorage.getItem("rnage") && localStorage.setItem("rnage",
            JSON.stringify({
                minT: 0,
                maxT: 0,
                minH: 0,
                maxH: 0,
                minCO: 0,
                maxCO: 0,
                minMETHAN: 0,
                maxMETHAN: 0,
                minH2S: 0,
                maxH2S: 0,
                minNOx: 0,
                maxNOx: 0,
                minCO2: 0,
                maxCO2: 0,
                minB: 0,
                maxB: 0,
                minV: 0,
                maxV: 0,
                minEC: 0,
                maxEC: 0,
                minSH: 0,
                maxSH: 0,
                minST: 0,
                maxST: 0,
            }));
    }, []);

    const Count = () => {
        let num = 0;
        console.log(nodes);
        if(nodes !== undefined){
            nodes && nodes.map((node) => {
                return node.node_desc == id.state ? (num += 1) : "";
            })
            return num;
        }
    }

    return (
        <>
            { loading ? (
                <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  paddingTop: "60%",
                  justifyContent: "center",
                }}
              >
                <SpinLoading></SpinLoading>
              </div>
            ) : (
                <div className="type">
                    <div className="header">프로필 선택</div>
                    <div className="body">
                        <div className="top">보유 프로필 : {Count()}</div>
                        <div className="center">
                            {nodes && nodes.map((node) => {
                                return node.node_desc == id.state ? (
                                    <div className="item" key={node.node_id}>
                                        <div className="info">
                                            <div className="title">프로필 명</div>
                                            <div>{node.node_id}</div>
                                            <div className="title">type</div>
                                            <div>{node.node_type.split('"')[3]}</div>
                                            <div className="title">생성일</div>
                                            <div>{moment(node.created_at).format("YYYY-MM-DD")}</div>
                                            <div className="title">desc</div>
                                            <div>{node.node_desc}</div> 
                                        </div>
                                        <div className="status">
                                            <div style={{display: "flex", justifyContent: "flex-end", padding:"10px"}}>
                                                <div style={{background:"#22af4f", borderRadius:"100%", height:"14px", width:"14px", marginBottom:"20px",}}>
                                                    &nbsp;
                                                </div>
                                            </div>
                                            <div className="title">최근갱신</div>
                                            <div style={{fontSize:"12px"}}>{moment(node.last_timestamp).format("YYYY-MM-DD hh:mm:ss")}</div>
                                            <button onClick={() => {navigate("/main", {state : node})}}>선택</button>
                                        </div>
                                    </div>
                                ) : null
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Type;