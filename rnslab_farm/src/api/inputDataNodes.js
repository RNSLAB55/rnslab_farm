import axios from "axios";
import { useState } from "react";

const InputDataNodes = async (nodeId, id) => {
    const [inputDataLoading, setInputDataLoading] = useState(false);
    
    try {
        setInputDataLoading(true);
        const response = await axios.post('/addNode',{id,nodeId});
        setInputDataLoading(false);
        return inputDataLoading;
    }catch(err) {
        console.log(err);
        return true;
    }
}

export default InputDataNodes;