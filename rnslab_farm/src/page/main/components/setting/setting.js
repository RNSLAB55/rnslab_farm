import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SpinLoading } from "antd-mobile";

import METHANEImg from "../../../../assets/img/methane.png";
import NOxImg from "../../../../assets/img/bus.png";
import coImg from "../../../../assets/img/carbon-monoxide.png";
import TEMPImg from "../../../../assets/img/temperature.png";
import HUMImg from "../../../../assets/img/humidity.png";
import H2SImg from "../../../../assets/img/sulfide.png";

import UpdateSetting from "../../../../api/updateSetting";
import { unit } from "../../../../common";



const Setting = (props) => {
    const navigate = useNavigate();
    const {nodes, node, userNode} = props.init;
    const userId = userNode.id;
    const nodeId = userNode.node_Id;
    const [nodeType, setNodeType] = useState("");

    const spinLoading = () => {
        return (
            <div style={{textAlign: 'center'}}>
            <div style={{
                flexGrow: 2,
                display: "flex",
                paddingTop: "70%",
                justifyContent: "center",
            }}>
                <SpinLoading></SpinLoading>
            </div>
            <p style={{marginTop:"20px"}}>Loading...</p>
        </div>
        )
    }

    console.log(node, userNode);
    const Sensor = (props) => {
        const {max, min, img, title,item} = props;
        
        return (
            <div className="item">
                <div className="imgArea">
                    <img src={img} alt=""></img>
                </div>
                <div style={{fontSize:"14px"}} className="infoArea">{title}</div>
                <div className="valueArea">
                    {item === "T" ? (
                        <div style={{display: "flex", fontSize:"10px", marginTop: "-24px", marginBottom:"10px"}}>
                            <div style={{flexGrow:1, textAlign:"center"}}>최솟값</div>
                            <div style={{flexGrow:1, textAlign:"center"}}>최댓값</div>
                        </div>
                    ) : <></>}
                    <div style={{display:"flex"}}>
                        <input step="1" name={"min" + item} defaultValue={Number(min)} type="number"></input>
                        <input step="1" name={"max" + item} defaultValue={Number(max)} type="number"></input>
                    </div>
                    <div style={{fontSize:"10px", textAlign:"right", marginTop:"2px"}}>단위 : {unit(item)}</div>
                </div>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const eventArray = [];
        console.dir(event.target.length);
        if(node && node.node_type.split('"')[3].slice(3,6) === "322"){
            for(let i=0; i<4; i++){
                eventArray.push( event.target[i]);
            }
            UpdateSetting(eventArray,nodeId,userId);
        }else if(node && node.node_type.split('"')[3].slice(3,6) === "321"){
            for(let i=0; i<12; i++){
                eventArray.push( event.target[i]);
            }
            UpdateSetting(eventArray,nodeId,userId);
        }else if(node && node.node_type.split('"')[3].slice(3,6) === "323"){
            for(let i=0; i<8; i++){
                eventArray.push( event.target[i]);
            }
            UpdateSetting(eventArray,nodeId,userId);
        }else if(node && node.node_type.split('"')[3].slice(3,6) === "334"){
            for(let i=0; i<18; i++){
                eventArray.push( event.target[i]);
            }
            UpdateSetting(eventArray,nodeId,userId);
        }
        const id = userId;
        navigate("/type", {state : {nodes,id}});
    }

    const changeNodeType = () => {
        axios.post('/updateNodeType',{nodeType,userId, nodeId}).then((res) => console.log(res));
        const id = userId;
        navigate("/type", {state : {nodes, id}});
    }

    return (
        <>
            <div className="inputNodeTypebox">
                <input value={nodeType} onChange={(e) => setNodeType(e.target.value)} type="text"  className="inputText" placeholder="기기의 변경하실 이름을 적어주세요. ex)농장1-101호"/>
                <button className="addNode" onClick={changeNodeType}>변경</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="setting">
                    <div className="body">
                        {node && node.node_type.split('"')[3].slice(3,6) === "322" ? (
                            <>
                                <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" item="T"></Sensor>    
                                <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" item="H"></Sensor>
                            </>
                        ) : node && node.node_type.split('"')[3].slice(3,6) === "321" ? (
                            <>
                                <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도"  item="T"></Sensor>
                                <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" item="H"></Sensor>
                                <Sensor max={userNode.MAXCO2} min={userNode.MINCO2} img={coImg} title="이산화탄소" item="CO2"></Sensor>
                                <Sensor max={userNode.MAXEC} min={userNode.MINEC} img={HUMImg} title="전기전도도"  item="EC"></Sensor>
                                <Sensor max={userNode.MAXSH} min={userNode.MINSH} img={HUMImg} title="소일흄"  item="SH"></Sensor>
                                <Sensor max={userNode.MAXST} min={userNode.MINST} img={HUMImg} title="소일템"  item="ST"></Sensor>
                            </>
                        ) : node && node.node_type.split('"')[3].slice(3,6) === "323" ? (
                            <>
                                <Sensor max={userNode.MAXCO} min={userNode.MINCO} img={coImg} title="일산화탄소" item="CO"></Sensor>
                                <Sensor max={userNode.MAXMETHAN} min={userNode.MINMETHAN} img={METHANEImg} title="메탄가스" item="METHANE"></Sensor>
                                <Sensor max={userNode.MAXH2S} min={userNode.MINH2S} img={H2SImg} title="황화수소가스"  item="H2S"></Sensor>
                                <Sensor max={userNode.MAXNOX} min={userNode.MINNOX} img={NOxImg} title="질소화합물가스"  item="NOX"></Sensor>
                            </>
                        ) : node && node.node_type.split('"')[3].slice(3,6) === "324" ? (
                            <>
                                <Sensor max={userNode.MAXAQS} min={userNode.MINAQS} img={TEMPImg} title="유해가스" item="AQS"></Sensor>
                            </>
                        ) : node && node.node_type.split('"')[3].slice(3,6) === "334" ? (
                            <>
                                <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도"  item="T"></Sensor>
                                <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도"  item="H"></Sensor>
                                <Sensor max={userNode.MAXCO2} min={userNode.MINCO2} img={coImg} title="이산화탄소" item="CO2"></Sensor>
                                <Sensor max={userNode.MAXNOX} min={userNode.MINNOX} img={NOxImg} title="질소화합물가스" item="NOX"></Sensor>
                                <Sensor max={userNode.MAXAQS} min={userNode.MINAQS} img={TEMPImg} title="유해가스" item="AQS"></Sensor>
                                <Sensor max={userNode.MAXCH4} min={userNode.MINCH4} img={TEMPImg} title="메테인" item="CH4"></Sensor>
                                <Sensor max={userNode.MAXPM1} min={userNode.MINPM1} img={TEMPImg} title="PM1" item="PM1"></Sensor>
                                <Sensor max={userNode.MAXPM10} min={userNode.MINPM10} img={TEMPImg} title="PM10"item="PM10"></Sensor>
                                <Sensor max={userNode.MAXPM2_5} min={userNode.MINPM2_5} img={TEMPImg} title="PM2.5" item="PM2_5"></Sensor>
                            </>
                        ): spinLoading()}
                    </div>
                    <div className="footer">
                        <button type="submit">저장하기</button>
                    </div>
                </div>
            </form>
        </>
    )
};

export default Setting;