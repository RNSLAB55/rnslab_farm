import { useEffect,useState } from "react";
import axios from "axios";
import moment from "moment";

const GetStorage = (props) => {
    const {node,sensorLastTime} = props;
    const nodeId = node.node_id;
    const time = moment(sensorLastTime);
    const current = time.toISOString();
    const lastDay = time.subtract(1,"days").toISOString();
    const lastWeek = time.subtract(7,"days").toISOString();
    const url = `https://iotown.rnslab.com/api/v1.0/storage/?nid=${nodeId}&from=${lastWeek}&to=${current}`
    const [rangeData, setRangeData] = useState([]);
    const [rangeLoading, setRangeLoading] = useState(false);
    console.log(time,current)

    const getStorage = async() => {
        setRangeLoading(true);
        try {
            const response = await axios.post('/getStorage', {url});
            setRangeData(response.data.data);
            setRangeLoading(false);
        }catch(err){
            console.log("Error >>",err);
        }
    }

    useEffect(() => {
        getStorage();
    },[]);

    return {rangeData,rangeLoading};
}

export default GetStorage;