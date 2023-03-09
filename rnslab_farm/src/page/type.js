import { useLocation } from "react-router-dom";
import { SpinLoading } from "antd-mobile";
import { useEffect, useState } from "react";
import axios from "axios";

import InputDataNodes from "../api/inputDataNodes";

const Type = () => {
    const {id,nodes} = useLocation().state;

    //id와 맞는 node들을 가지는 변수
    const [userNodes, setUserNodes] = useState();
    const [userNodesLoading, setUserNodesLoading] = useState(false);

    //추가할 node의 이름 
    const [inputId, setInputId] = useState("");
    let inputDataLoading = false;


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

    //DB에 노드 추가
    const addUserNode = () => {
        nodes && nodes.map((node) => {
            if(node.node_id === inputId){
                const nodeId = node.node_id;
                inputDataLoading = InputDataNodes(nodeId, id);
            }
        });
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

    //유저의 노드의 개수가 0이면 노드(api)에서 자기의 id와 맞는 노드들 DB에 추가하기
    const renderUserNodes = () => {
        nodes && nodes.map((node) => {
            if(node.node_desc === id) {
                const nodeId = node.node_id;
                inputDataLoading = InputDataNodes(nodeId, id);
            }
        });
    }


    //처음에 유저노드들 가져오기
    useEffect(() => {
        render();
    },[]);

    useEffect(() => {
        console.log(userNodes);
        if(userNodes !== undefined) {
            if(userNodes.length === 0){
                renderUserNodes();
            }
        }
    },[userNodes]);
    
    return (
        <>
            {nodes === null ? spinLoading() : userNodesLoading ? spinLoading() : inputDataLoading ? spinLoading() : (
                <div className="type">
                    <div className="header">프로필 선택</div>
                    <div className="body">
                        <div className="top">보유 기기 : {userNodesCount()}개</div>
                        <div className="inputBox">
                            <input type="text" className="inputText" placeholder="node의 아이디를 입력해주세요 ex) LW0000000000000001" onChange={(e) => setInputId(e.target.value)}/>
                            <button className="addNode" onClick={addUserNode()}>add</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Type;