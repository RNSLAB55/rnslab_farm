import { useLocation, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import GetStorage from "../../../../../api/getStorage";
import ECharts, {EChartsReactProps} from 'echarts-for-react';
import moment from "moment";

import leftIcon from "../../../../../assets/img/left.png";
import { unit } from "../../../../../common";

import {meanBy,maxBy,map,minBy} from "lodash";

const nameByItem = (item) => {
    let name = "";
    switch (item) {
      case "T":
        name = "온도";
        break;
      case "H":
        name = "습도";
        break;
      case "co":
        name = "일산화탄소";
        break;
      case "METHAN":
        name = "메탄가스";
        break;
      case "H2S":
        name = "황화수소가스";
        break;
      case "NOx":
        name = "질소화합물가스";
        break;
      default:
        name = "";
        break;
    }
  
    return name;
};

const EachSensor = () => {
    const {node,sensorLastTime} = useLocation().state;
    const {item} = useParams();
    const {rangeData, rangeLoading} = GetStorage({node,sensorLastTime});
    const [xRange, setXRange] = useState([]);
    const [yRange, setYRange] = useState([]);
    const [options, setOptions] = useState({});

    const parse = (str) => {
        let y = str.substr(0,4);
        let m = str.substr(5,2);
        let d = str.substr(8,2);
        let h = (Number(str.substr(11,2))+9)%24;
        let min = str.substr(14,2);
        let s = str.substr(17,2);
    
        // return `${y}-${(m-1)}-${d} ${h}:${min}:${s}`;
        return `${h}:${min}:${s}`;
    }

    useEffect(() => {
        if(rangeData){
           setXRange(rangeData.map((v) => v.value[item]).reverse());
           setYRange(rangeData.map((v) => parse(v.timestamp)).reverse());
        }
    },[rangeData]);
    console.log(rangeData);

    useEffect(() => {
        if(xRange && yRange){
            setOptions({
                title : {},
                tooltip: {
                    trigger : 'axis',
                    axisPointer : {
                        type : 'cross',
                        label : {backgroundColor : "#22AF4F"}
                    }
                },
                legend : {
                    right : 'right',
                    data : [`${item}`]
                },
                grid : {
                    left : '3%',
                    rigth : '4%',
                    bottom : '3%',
                    containLabel : true
                },
                xAxis : [{
                    type : 'category',
                    data : yRange,
                    itemStyle : {
                        color : "#22AF4F"
                    }
                }],
                yAxis : [{
                    type : 'value'
                }],
                series : [{
                    name : `${item}`,
                    type : 'line',
                    data : xRange,
                    itemStyle : {nomal : {color : "#22AF4F", lineStyle : {color : "#22AF4F"}}}
                    ,itemStyle : {
                        color : '#22AF4F'
                    }
                }]
                // visualMap : [
                //     {
                //         show: false,
                //         type : 'continuous',
                //         seriesIndex : 0,
                //         min : 0,
                //         max: 800,
                //         color:"#22AF4F"
                //     },
                // ],
                // yAxis: [
                //     {}
                // ],
                // series : [
                //     {
                //         data : xRange,
                //         type: 'line',
                //         showSymbol: false,
                //         smooth: true,
                //         itemStyle:{ //차트의 색상 변경
                //             color:"#22AF4F"
                //         }
                //     }
                // ],
                // tooltip: {
                //     trigger: "axis",
                // },
            })
        }
    },[xRange, yRange]);


    return (
        !options ? <></> : (
           <>
                <div className="eachSensor">
                    <div className="header">
                        <button onClick={() => {window.history.back();}}> 
                            <img src={leftIcon} alt=""/> 
                        </button>
                        <div className="title">{nameByItem(item)}</div>
                        <div className="temp"></div>
                    </div>
                    <div className="body">
                        {rangeLoading ? <></> : (
                            <>
                                <div className="date">
                                    <div className="dt">
                                        <div className="title">측정 날짜</div>
                                        <div className="tt">
                                            {moment(sensorLastTime).format("YYYY/MM/DD")}
                                        </div>
                                    </div>
                                    <div className="time">
                                        <div className="title">측정 시간</div>
                                        <div className="tt">
                                            {moment(sensorLastTime).format("HH:mm:ss")}
                                        </div>
                                    </div>
                                </div>
                                <div className="chart">
                                    <div className="titleArea">
                                        <div className="title">
                                         {node.node_type.split('"')[3].slice(0,6)} {nameByItem(item)}({unit(item)})
                                        </div>
                                    </div>
                                    <div className="chartArea">
                                        {rangeLoading ? <></> : (
                                            <ECharts option={options} style={{widt : 'auto', higth:'auto'}} opts={{renderer:'svg'}} notMerge={true}/>
                                        )}
                                    </div>
                                    <div style={{textAlign: "right", marginTop:"20px"}} className="right"></div>
                                </div>
                                <div className="average">
                                    <div className="value">
                                        <div>현재 측정값</div>
                                        <div style={{color : "#22AF4F"}}>
                                            {xRange.length>0 && xRange[xRange.length-1].toFixed(1)}
                                            {unit(item)}
                                        </div>
                                    </div>
                                    <div className="value">
                                        <div>1시간 평균값</div>
                                        <div style={{color : "#22AF4F"}}>
                                            {xRange.length>0 && meanBy(xRange.slice(xRange.length>500? xRange.length-500 : 0,xRange.length-1)).toFixed(1)}
                                            {unit(item)}
                                        </div>
                                    </div>
                                    <div className="value">
                                        <div>지난주의 평균값</div>
                                        <div style={{color: "#22AF4F"}}>
                                            {xRange.length>0 && meanBy(xRange).toFixed(1)}
                                            {unit(item)}
                                        </div>
                                    </div>
                                </div>
                                <div className="minmax">
                                    <div className="value">
                                        <div>{nameByItem(item)}최대</div>
                                        <div>
                                            <div className="range"></div>
                                            {xRange.length>0 && maxBy(map(xRange))}
                                            {unit(item)}
                                        </div>
                                    </div>
                                    <div className="value">
                                        <div>{nameByItem(item)}최소</div>
                                        <div>
                                            <div className="range"></div>
                                            {xRange.length>0 && minBy(map(xRange))}
                                            {unit(item)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
           </>
        )
    )

}

export default EachSensor;