import { useState,useEffect } from "react";
import moment from "moment";
import axios from "axios";

const SensorWithRange = (node) => {
    const [range, setRange] = useState(null);
    const [rangeData, setRangeData] = useState([]);
    const last_timestamp = moment(node.last_timestamp).format("YYYY-MM-DD HH:mm:ss");
    const [sensorWithRangeLoading, setSensorWithRangeLoading] = useState(false);
    const url = 'https://iotown.rnslab.com/api/v1.0/storage';
    
    useEffect(() => {
        setRange([moment(last_timestamp).subtract(1, "days"),moment(last_timestamp)]);
        console.log(range,moment(last_timestamp).subtract(1, "days"));
    },[]);

    useEffect(() => {
        const axiosGetStorage = async() => {
            try {
                console.log(range);
                if(range !== null){
                    setSensorWithRangeLoading(true);
                    const nodeId = node.node_id;
                    const response = await axios.post('/getStorage',{nodeId, range, url});
                    console.log(response);
                    setSensorWithRangeLoading(false);
                }
            }catch(err) {
                console.log(err);
            }
        }
        axiosGetStorage();
    },[range]);

}

export default SensorWithRange;