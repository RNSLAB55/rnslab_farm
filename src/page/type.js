import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SpinLoading } from "antd-mobile";
import moment from "moment";
import axios from "axios";
import Nodes from "../api/nodes";
import InputData from "../api/inputData";

const Type = () => {
    const id = useLocation().state;
    const navigate = useNavigate();
    const {nodes,nodesLoading} = Nodes();
    const {inputDataLoading} = InputData(nodes, id);
    const [inputId, setInputId] = useState("");

    const [userNodes, setUserNodes] = useState([]);
    const [userNodesLoading, setUserNodesLoading] = useState(false);

    const render = () => {
        setUserNodesLoading(true);
        axios.post('http://localhost:3003/getusernodes').then((res) => {setUserNodes(res.data); console.log(res)});
        setUserNodesLoading(false);
    }

    useEffect(() => {
        console.log(id,nodes, nodesLoading, userNodes, userNodesLoading);    
        render();  
    },[inputDataLoading]);

    const addNode = async () => {
        nodes && nodes.map((node) => {
            if(node.node_id === inputId) {
                const nodeId = node.node_id;
                axios.post('http://localhost:3003/inputdata',{id,nodeId});
            }
        })
        render();
    }

    const spinLoading = () => {
        return (
            <div style={{textAlign: "center"}}>
                <div style={{display: 'flex', paddingTop: '60%', justifyContent:'center',}}>
                    <SpinLoading></SpinLoading>
                </div>
                <p style={{marginTop: "20px"}}>Loading...</p>
            </div>
        )
    }

    return (
        <>  
            { nodesLoading ? spinLoading() : inputDataLoading ? spinLoading() : userNodesLoading ? spinLoading() : (
                <div className="type">
                        <div className="header">프로필 선택</div>
                    <div className="body">
                        <div className="top">보유 프로필 : {userNodes.length}개</div>
                        <div className="inputBox">
                            <input type="text" value={inputId} onChange={(e) => setInputId(e.target.value)} className="inputText" placeholder="기기의 아이디를 입력해주세요 ex) LW0000000000000001"></input>
                            <button className="addNode" onClick={addNode}>add</button>
                        </div>
                        <div className="center">
                            {nodes && nodes.map((node) => (
                                userNodes && userNodes.map((userNode) => (
                                    userNode.node_Id == node.node_id ? (
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
                                            <button onClick={() => {navigate("/main", {state : {node,id}})}}>선택</button>
                                        </div>
                                    </div>
                                    ) : null
                                ))
                            ))}
                        </div>
                    </div>
                </div>
            )}    
        </>
    )
}

export default Type;