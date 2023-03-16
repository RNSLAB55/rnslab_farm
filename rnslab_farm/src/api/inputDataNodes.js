import axios from "axios";
import { useState,useEffect } from "react";

const InputDataNodes =(nodes, id) => {
    const [inputDataLoading, setInputDataLoading] = useState(false);

    useEffect(() => {
        nodes && nodes.map(async (node) => {
            if(node.node_desc === id) {
                setInputDataLoading(true);
                try{
                    const nodeId = node.node_id;
                    await axios.post("/addNode",{id,nodeId});
                    setInputDataLoading(false);
                }catch(err){
                    console.log(err);
                }
            }
        })
    },[]);

    return {inputDataLoading};
}

export default InputDataNodes;