import axios from "axios";
import {useState, useEffect} from "react";

const UserNode = (nodeId, id) => {
    const [userNode, setUserNode] = useState([]);
    const [userNodeLoading, setUserNodeLoading] = useState(false);
    useEffect(()=>{
        setUserNodeLoading(true);
        axios.post("http://localhost:3003/getusernode", {nodeId, id}).then((res) => {
            setUserNode(res.data[0]);
            console.log(res.data[0]);
        });
        setUserNodeLoading(false);
    },[]);
    return {userNode,userNodeLoading};
}

export default UserNode;