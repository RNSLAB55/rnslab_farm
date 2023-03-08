import axios from "axios";
import { useEffect,useState } from "react";

const UserNodes = () => {
    const [userNodes, setUserNodes] = useState([]);
    const [userNodesLoading, setUserNodesLoading] = useState(false);

    useEffect(() => {
        setUserNodesLoading(true);
        axios.post('http://localhost:3003/getusernodes').then((res) => setUserNodes(res.data));
        setUserNodesLoading(false);
    },[]);

    return {userNodes, userNodesLoading};
}

export default UserNodes;