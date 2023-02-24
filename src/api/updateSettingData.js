import axios from "axios";

const UpdateSettingData = (eventArray,nodeId, id) => {
    eventArray.map((e) => {
        let uppercase = e.name.toUpperCase();
        let value = Number(e.value);
        console.log(eventArray, nodeId, id, uppercase, value);
        axios.post("http://localhost:3003/updatesettingdata",{uppercase,value,nodeId,id}).then((res) => console.log(res));
    } )
}

export default UpdateSettingData;