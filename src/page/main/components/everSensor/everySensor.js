

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const EverySensor = (props) => {
    const navigate = useNavigate();
    const {node,id,sensorWithRangeLoading,rangeData,last_timestamp} = props.init;
    const nodeData = node;
    const nodeId = nodeData.node_id;
    const {userNode, userNodeLoading} = UserNode(nodeId, id);
    const userNodeData = nodeData.last_data;
    console.log(nodeData,id,userNode,userNodeLoading,userNodeData);

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
            if(value) {
                if(outOfRange) {
                    color = "#EBC271";
                }else{
                    color = "red";
                }
                return color;
            }
        }
        const setId = () => {
            let id = "";
            if(value) {
                if(outOfRange) {
                    id = "outOfRange";
                }else {
                    id = "noValue";
                }
                return id;
            }
        }

        return (
            <div className="item" id={setId()} onClick={() => {
                value !== undefined ? navigate(`/eachSensor/${item}`, {state : {sensorWithRangeLoading,rangeData,last_timestamp}}) : Toast.show({content : "no data", position:"bottom"});
            }}>
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
                                <div>{max}</div>
                                <div style={{marginLeft: "6px", color : "#EBC271"}}>{min}</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="valueArea">
                    <span style={{fontSize: "24px", color: setFontColor(), marginTop: value ? "" : "-10px"}}></span>
                    <span style={{marginTop:"10px", paddingLeft: "4px"}}>{value}</span>
                </div>
            </div>
        )
    }

    const NoSensor = (props) => {
        const {img, title, value} = props;
        return (
            <div className="item" id="outOfRange">
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

    return (
        <>  
            {userNode===undefined ? (<SpinLoading></SpinLoading>) : (
                <div className="everySensor">
                <div className="updateTime">
                    최근 업데이트 시각 <br/>
                    {moment(nodeData.last_timestamp).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                {userNodeLoading ? (
                    <div style={{display: 'flex',textAlign: 'center',paddingTop:"70%",justifyContent:"center"}}>
                        <SpinLoading></SpinLoading>
                    </div>
                ) : nodeData && nodeData.node_type.split('"')[3].slice(3,6) === "322" ? (
                    <>
                        <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" value={userNodeData && userNodeData.T} item="T"></Sensor>
                        <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" value={userNodeData && userNodeData.H} item="H"></Sensor>
                        <NoSensor img={TEMPImg} title="배터리" value={userNodeData && userNodeData.B}></NoSensor>
                        <NoSensor img={TEMPImg} title="버전" value={userNodeData && userNodeData.V}></NoSensor>
                    </>
                ) : nodeData && nodeData.node_type.split('"')[3].slice(3,6) === "321" ? (
                    <>
                        <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" value={userNodeData && userNodeData.T} item="T"></Sensor>
                        <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" value={userNodeData && userNodeData.H} item="H"></Sensor>
                        <Sensor max={userNode.MAXCO2} min={userNode.MINCO2} img={coImg} title="이산화탄소" value={userNodeData && userNodeData.CO2} item="CO2"></Sensor>
                        <Sensor max={userNode.MAXEC} min={userNode.MINEC} img={HUMImg} title="전기전도도" value={userNodeData && userNodeData.EC} item="EC"></Sensor>
                        <Sensor max={userNode.MAXSH} min={userNode.MINSH} img={HUMImg} title="소일흄" value={userNodeData && userNodeData.SH} item="SH"></Sensor>
                        <Sensor max={userNode.MAXST} min={userNode.MINST} img={HUMImg} title="소일템" value={userNodeData && userNodeData.ST} item="ST"></Sensor>
                        <NoSensor img={TEMPImg} title="버전" value={userNodeData && userNodeData.V}></NoSensor>
                    </>
                ) : nodeData && nodeData.node_type.split('"')[3].slice(3,6) === "323" ? (
                    <>
                        <Sensor max={userNode.MAXCO} min={userNode.MINCO} img={coImg} title="일산화탄소" value={userNodeData && userNodeData.CO} item="CO"></Sensor>
                        <Sensor max={userNode.MAXSMETHAN} min={userNode.MINSMETHAN} img={METHANEImg} title="메탄가스" value={userNodeData && userNodeData.METHANE} item="METHANE"></Sensor>
                        <Sensor max={userNode.MAXH2S} min={userNode.MINH2S} img={H2SImg} title="황화수소가스" value={userNodeData && userNodeData.H2S} item="H2S"></Sensor>
                        <Sensor max={userNode.MAXNOX} min={userNode.MINNOX} img={NOxImg} title="질소화합물가스" value={userNodeData && userNodeData.NOx} item="NOX"></Sensor>
                        <NoSensor img={TEMPImg} title="버전" value={userNodeData && userNodeData.V}></NoSensor>
                    </>
                ) : nodeData && nodeData.node_type.split('"')[3].slice(3,6) === "324" ? ( 
                    <>
                        <Sensor max={userNode.MAXT} min={userNode.MINT} img={TEMPImg} title="온도" value={userNodeData && userNodeData.T} item="T"></Sensor>
                        <Sensor max={userNode.MAXH} min={userNode.MINH} img={HUMImg} title="습도" value={userNodeData && userNodeData.H} item="H"></Sensor>
                        <Sensor max={userNode.MAXCO2} min={userNode.MINCO2} img={coImg} title="이산화탄소" value={userNodeData && userNodeData.CO2} item="CO2"></Sensor>
                        <Sensor max={userNode.MAXNOX} min={userNode.MINNOX} img={NOxImg} title="질소화합물가스" value={userNodeData && userNodeData.NOx} item="NOX"></Sensor>
                        <Sensor max={userNode.MAXAQS} min={userNode.MINAQS} img={TEMPImg} title="유해가스" value={userNodeData && userNodeData.AQS} item="AQS"></Sensor>
                        <Sensor max={userNode.MAXCH4} min={userNode.MINCH4} img={TEMPImg} title="메테인" value={userNodeData && userNodeData.CH4} item="CH4"></Sensor>
                        <NoSensor img={TEMPImg} title="배터리" value={userNodeData && userNodeData.B}></NoSensor>
                    </>
                ) :null}
            </div>
            )}
        </>
    )
=======
=======
>>>>>>> parent of 6e55476c (prefect)
=======
>>>>>>> parent of 6e55476c (prefect)
const EverySensor = (node) => {
    const nodeData = node.init.node;
    const id = node.init.id;
    console.log(nodeData,id);
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 6e55476c (prefect)
=======
>>>>>>> parent of 6e55476c (prefect)
=======
>>>>>>> parent of 6e55476c (prefect)
}

export default EverySensor;