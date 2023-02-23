import axios from "axios";
import { useEffect, useState } from "react";

const InputData = (nodes, id) => {
    const [inputDataLoading, setinputDataLoading] = useState(false);
    useEffect(() => {
        setinputDataLoading(true);
        nodes.map((node) => {
            if(node.node_desc === id) {
                const nodeId = node.node_id;
                axios.post('http://localhost:3003/inputdata',{id,nodeId});
            }
        setinputDataLoading(false);
        })
    })

    return {inputDataLoading};
}

export default InputData;