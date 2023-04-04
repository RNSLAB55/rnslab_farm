import { SpinLoading } from "antd-mobile";
import moment from "moment";
import { useState } from "react";

import METHANEImg from "../../../../assets/img/methane.png";
import NOxImg from "../../../../assets/img/bus.png";
import coImg from "../../../../assets/img/carbon-monoxide.png";
import TEMPImg from "../../../../assets/img/temperature.png";
import HUMImg from "../../../../assets/img/humidity.png";
import H2SImg from "../../../../assets/img/sulfide.png";
import co2Img from "../../../../assets/img/co2.png";
import ECImg from "../../../../assets/img/ec.png";
import soilImg from "../../../../assets/img/soil.png";
import VImg from "../../../../assets/img/version.png";
import BImg from "../../../../assets/img/battery.png";
import pm1Img from "../../../../assets/img/pm1.png";
import pm10Img from "../../../../assets/img/pm10.png";
import pm25Img from "../../../../assets/img/pm2_5.png";
import aqsImg from "../../../../assets/img/aqs.png"

import { unit } from "../../../../common";

const EverySensor = (props) => {
    const {node, userNode}  = props.init;
    const sensorValue = node.last_data;
    const [clicked, setCliked] = useState(false);

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

    const Sensor = (props) => {
        const {max, min, img, title, value, item} = props;

        const isSetting = () => {
            return ( (max === 0 && min === 0) || max === undefined);
        }

        const outOfRange = () => {
            return (
                !isSetting() && (value > max || value < min)
            )
        }

        const setFontColor = () => {
            let color = "#22AF4F";
            if(value || value==0) {
                if(outOfRange()) {
                    color = "#EBC271";
                }
            }else{
                color = "red";
            }
            return color;
        }

        const setId = () => {
            let id = "";
            if(value || value==0) {
                if(outOfRange()) {
                    id = "outOfRange";
                }
            }else {
                id = "noValue";
            }
            return id;
        }

        return (
            <div className="item" id={setId()}>
                <div className="imgArea">
                    <img src={img} alt=""></img>
                </div>
                <div style={{fontSize: "18px"}} className="infoArea">
                    {title}
                    <div style={{display:"flex", fontSize:"14px", marginTop: "3px"}}>
                        {isSetting() ? (
                            <div style={{fontSize:"12px", marginTop:"6px", color:"#E47736"}}>범위를 설정해주세요</div>
                        ) : (
                            <>
                                <div>{min}</div>
                                <div style={{marginLeft: "6px", color : "#EBC271"}}>{max}</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="valueArea">
                    <span style={{fontSize: "24px", color: setFontColor(), marginTop: value ? "" : "-10px"}}>{value || value>=0 ? value : "noData"}</span>
                    <span style={{marginTop:"10px", paddingLeft: "6px", fontSize:"12px"}}>{value>=0 ? unit(item) : null}</span>
                </div>
            </div>
        )
    }

    const NoSensor = (props) => {
        const {img, title, value} = props;
        return (
            <div className="item" id="no">
                <div className="imgArea">
                    <img src={img} alt=""></img>
                </div>
                <div style={{fontSize: "18px"}} className="infoArea">
                    {title}
                    <div style={{display:"flex", fontSize: "14px", marginTop:"3px"}}>
                        <div style={{fontSize:"12px", marginTop:"6px", color:"#E47736"}}>Not Button</div>
                    </div>
                </div>
                <div className="valueArea">
                        <span style={{fontSize: "24px", color: "#22AF4F", marginTop: value ? "" : "-10px"}}></span>
                        <span style={{marginTop:"10px", paddingLeft: "4px"}}>{value}</span>
                </div>
            </div>
        )
    }

    const checkClick = () => {
        setCliked(!clicked);
    }

    return (
        <>
            <div className="everySensor">
                <div className="updateTime">
                    최근 업데이트 시각
                    <br/> {moment(node.last_timestamp).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                {!node ? (
                    spinLoading()
                ) : node.node_type.split('"')[3].slice(3,6) === "322" ? (
                    <>
                        <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" value={sensorValue && sensorValue.T} item="T"></Sensor>
                        <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" value={sensorValue && sensorValue.H} item="H"></Sensor>
                        {clicked ? 
                            <>
                                <NoSensor img={BImg} title="배터리" value={sensorValue && sensorValue.B}></NoSensor>
                                <NoSensor img={VImg} title="버전" value={sensorValue && sensorValue.V}></NoSensor>
                            </> 
                        : null}
                        <div className="ReadMore">
                            <button onClick={checkClick}>{clicked ? "버전 및 배터리 숨기기" : "자세히 보기" }</button>
                        </div>
                    </>
                ) : node.node_type.split('"')[3].slice(3,6) === "323" ? (
                    <>
                        <Sensor max={userNode.MAXCO} min={userNode.MINCO} img={coImg} title="일산화탄소" value={sensorValue && sensorValue.CO} item="CO"></Sensor>
                        <Sensor max={userNode.MAXSMETHAN} min={userNode.MINSMETHAN} img={METHANEImg} title="메탄가스" value={sensorValue && sensorValue.METHANE} item="METHANE"></Sensor>
                        <Sensor max={userNode.MAXH2S} min={userNode.MINH2S} img={H2SImg} title="황화수소가스" value={sensorValue && sensorValue.H2S} item="H2S"></Sensor>
                        <Sensor max={userNode.MAXNOX} min={userNode.MINNOX} img={NOxImg} title="질소화합물가스" value={sensorValue && sensorValue.NOx} item="NOX"></Sensor>
                        {clicked ? <NoSensor img={VImg} title="버전" value={sensorValue && sensorValue.V}></NoSensor> : null}
                        <div className="ReadMore">
                            <button onClick={checkClick}>{clicked ? "버전 숨기기" : "자세히 보기" }</button>
                        </div>
                    </>
                ) : node.node_type.split('"')[3].slice(3,6) === "321" ? (
                    <>
                        <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" value={sensorValue && sensorValue.T} item="T"></Sensor>
                        <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" value={sensorValue && sensorValue.H} item="H"></Sensor>
                        <Sensor max={userNode.MAXCO2} min={userNode.MINCO2} img={co2Img} title="이산화탄소" value={sensorValue && sensorValue.CO2} item="CO2"></Sensor>
                        <Sensor max={userNode.MAXEC} min={userNode.MINEC} img={ECImg} title="전기전도도" value={sensorValue && sensorValue.EC} item="EC"></Sensor>
                        <Sensor max={userNode.MAXSH} min={userNode.MINSH} img={soilImg} title="토양습도" value={sensorValue && sensorValue.SH} item="SH"></Sensor>
                        <Sensor max={userNode.MAXST} min={userNode.MINST} img={soilImg} title="토양온도" value={sensorValue && sensorValue.ST} item="ST"></Sensor>
                        {clicked ? <NoSensor img={VImg} title="버전" value={sensorValue && sensorValue.V}></NoSensor> : null}
                        <div className="ReadMore">
                            <button onClick={checkClick}>{clicked ? "버전 숨기기" : "자세히 보기" }</button>
                        </div>
                    </>
                ) : node.node_type.split('"')[3].slice(3,6) === "324" ? (
                    <>
                        <Sensor max={userNode.MAXAQS} min={userNode.MINAQS} img={TEMPImg} title="유해가스" value={sensorValue && sensorValue.AQS} item="AQS"></Sensor>
                    </>
                ) : node.node_type.split('"')[3].slice(3,6) === "334" ? (
                    <>
                        <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" value={sensorValue && sensorValue.T} item="T"></Sensor>
                        <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" value={sensorValue && sensorValue.H} item="H"></Sensor>
                        <Sensor max={userNode.MAXCO2} min={userNode.MINCO2} img={co2Img} title="이산화탄소" value={sensorValue && sensorValue.Co2} item="Co2"></Sensor>
                        <Sensor max={userNode.MAXNOX} min={userNode.MINNOX} img={NOxImg} title="질소화합물가스" value={sensorValue && sensorValue.NOX} item="NOX"></Sensor>
                        <Sensor max={userNode.MAXAQS} min={userNode.MINAQS} img={aqsImg} title="유해가스" value={sensorValue && sensorValue.AQS} item="AQS"></Sensor>
                        <Sensor max={userNode.MAXCH4} min={userNode.MINCH4} img={METHANEImg} title="메테인" value={sensorValue && sensorValue.CH4} item="CH4"></Sensor>
                        <Sensor max={userNode.MAXPM1} min={userNode.MINPM1} img={pm1Img} title="PM1" value={sensorValue && sensorValue.PM1} item="PM1"></Sensor>
                        <Sensor max={userNode.MAXPM10} min={userNode.MINPM10} img={pm10Img} title="PM10" value={sensorValue && sensorValue.PM10} item="PM10"></Sensor>
                        <Sensor max={userNode.MAXPM2_5} min={userNode.MINPM2_5} img={pm25Img} title="PM2.5" value={sensorValue && sensorValue.PM2_5} item="PM2_5"></Sensor>
                        {clicked ? <NoSensor img={VImg} title="버전" value={sensorValue && sensorValue.V}></NoSensor> : null}
                        <div className="ReadMore">
                            <button onClick={checkClick}>{clicked ? "버전 숨기기" : "자세히 보기" }</button>
                        </div>
                    </>
                ) : spinLoading()}
            </div>
        </>
    )
}

export default EverySensor;