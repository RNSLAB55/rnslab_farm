import { useLocation,useNavigate } from "react-router-dom";
import { SpinLoading } from "antd-mobile";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import InputDataNodes from "../api/inputDataNodes";

const Type = () => {
    const navigate = useNavigate();
    const id = useLocation().state;
    const [nodes, setNodes] = useState([]);

    //id와 맞는 node들을 가지는 변수
    const [userNodes, setUserNodes] = useState();
    const [userNodesLoading, setUserNodesLoading] = useState(false);

    //추가할 node의 이름 
    const [inputId, setInputId] = useState("");
    const [inputIdLoading, setInputIdLoading] = useState(false);
    
    //DB에 유저의 기기 노드들 추가
    const {inputDataLoading} = InputDataNodes(nodes, id);

    const [nodesLoading, setNodesLoading] = useState(false);
    const url = "https://iotown.rnslab.com/api/v1.0/nodes";

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

    //유저의 노드들의 개수
    const userNodesCount = () => {
        if(userNodes) {
            return userNodes.length;
        }
    }


    //유저의 노드들 가져오기
    const render = async() => {
        setUserNodesLoading(true);
        try {
            const response = await axios.post('/getUserNodes',{id});
            setUserNodes(response.data);
            setUserNodesLoading(false);
        }catch(err) {
            console.log(err);
        }
    }

    //DB에 노드 추가
    const addUserNode = () => {
        nodes && nodes.map(async (node) => {
            setInputIdLoading(true);
            try {
                if(node.node_id === inputId) {
                    const nodeId = node.node_id;
                    await axios.post("/addNode",{id, nodeId});
                    setInputIdLoading(false);
                    render();
                }
            }catch(err) {
                console.log(err);
                setInputIdLoading(false);
            }
        });
    }

    const getNodes = async() => {
        setNodesLoading(true);
        try {
            const response = await axios.post('/getNodes', {url});
            setNodes(response.data.nodes);
            setNodesLoading(false);
            console.log(response.data.nodes);
        }catch (err) {
            console.log("Error >>",err);
        }
    }

    //처음에 유저노드들 가져오기
    useEffect(() => {
        render();
        getNodes();
    },[inputDataLoading, inputIdLoading]);


    return (
        <>
            {nodes === null || userNodesLoading || inputDataLoading || inputIdLoading || nodesLoading ? spinLoading() : (
                <div className="type">
                    <div className="header">프로필 선택</div>
                    <div className="body">
                        <div className="inputBox">
                            <input type="text" className="inputText" placeholder="node의 아이디를 입력해주세요 ex) LW0000000000000001" onChange={(e) => setInputId(e.target.value)}/>
                            <button className="addNode" onClick={addUserNode}>add</button>
                        </div>
                        <div className="center">
                            {nodes && nodes.map((node) => (
                                userNodes && userNodes.map((userNode) => (
                                    userNode.node_Id === node.node_id && userNode.id === id ? (
                                        <div className="item" key={node.node_id}>
                                        <div className="info">
                                            <div className="title">프로필 명</div>
                                            <div>{userNode.node_Type === null ? node.node_id : userNode.node_Type}</div>
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
                                            <button onClick={() => navigate("/main",{state : {nodes,node,userNode}})}>선택</button>
                                        </div>
                                    </div>
                                    ) : null
                                ))
                            ))}
                        </div>
                        <div className="bottom">
                            <p>보유 기기 : {userNodesCount()}개</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Type;