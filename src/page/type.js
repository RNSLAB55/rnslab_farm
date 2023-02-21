import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nodes from "../api/nodes";
import UserNodes from "../api/userNodes";

const Type = () => {
    const id = useLocation().state;
    const {nodes,nodesLoading} = Nodes();
    const {userNodes, userNodesLoading} = UserNodes();

    useEffect(() => {
        console.log(id,nodes, nodesLoading, userNodes, userNodesLoading);
    },[nodes]);
}

export default Type;