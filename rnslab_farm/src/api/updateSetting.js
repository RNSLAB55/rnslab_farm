import axios from "axios";

const UpdateSetting = (eventArray, nodeId, userId) => {
    eventArray && eventArray.map((e) => {
        let uppercase = e.name.toUpperCase();
        let value = Number(e.value);
        axios.post("/updateSetting", {uppercase, value, nodeId, userId});
    })
}

export default UpdateSetting;