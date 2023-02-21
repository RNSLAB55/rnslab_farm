import axios from "axios";
import { useEffect,useState} from "react";

const Nodes = () => {
    const [nodes,setNodes] = useState([]);
    const [nodesLoading, setNodesLoading] = useState(false);

    useEffect(() => {
        setNodesLoading(true);
        axios.get("/api/v1.0/nodes", {
            headers: {
                Token: "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
            },
        }).then((res) => {
            setNodes(res.data.nodes);
        })
        setNodesLoading(false);
    },[])

    return {nodes, nodesLoading};
}

export default Nodes;