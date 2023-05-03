import { useEffect,useState } from 'react';
import axios from 'axios';

const GetNodes = () => {
    const [nodesLoading, setNodesLoading] = useState(false);
    const [nodes, setNodes] = useState([]);
    const url = "https://iotown.rnslab.com/api/v1.0/nodes";

    const getNodes = async() => {
        setNodesLoading(true);
        try {
            const response = await axios.post('/getNodes', {url});
            setNodes(response.data.nodes);
            setNodesLoading(false);
        }catch(err) {
            console.log("Error >>",err);
        }
    }

    useEffect(() => {
        getNodes();
    },[]);

    if(nodes){
        return {nodes,nodesLoading};
    }
}

export default GetNodes;