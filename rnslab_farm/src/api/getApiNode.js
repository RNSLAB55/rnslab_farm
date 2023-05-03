import { useState, useEffect } from "react";
import axios from "axios";

const GetApiNode = (nodeID) => {
    //노드센서의 값을 api로 호출함
    const [sensorValue, setSensorValue] = useState([]);
    const [sensorLastTime, setSensorLastTime] = useState("");
    const [sensorValueLoading, setSensorValueLoading] = useState(false);
    const url = `https://iotown.rnslab.com/api/v1.0/node/${nodeID}`;

    //node api 호출 함수
    const getNode = async() => {
        setSensorValueLoading(true);
        try {
            const response = await axios.post('/getNode',{url});
            setSensorValue(response.data.node.last_data);
            setSensorLastTime(response.data.node.last_timestamp);
            setSensorValueLoading(false);
            console.log(response.data);
        }catch(err){
            console.log("Error >>", err);
        }
    }

    useEffect(() => {
        getNode();

        //1분에 한번씩 getNode함수 실행;
        const time = setInterval(() => {
            getNode();
        },60000);

        //컴포넌트 마운트제어로 setinterval를 종료시킴
        return() => {
            clearInterval(time);
        }
    },[]);

    return {sensorValue, sensorLastTime, sensorValueLoading};
}

export default GetApiNode;