import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import leftIcon from "../../../../../assets/img/left.png";
import useSensorWithRange from "../../../../../api/sensorWithRange";
import moment from "moment";
import { unit } from "../../../../../common";
import { SpinLoading } from "antd-mobile";
import { LineChart, Line, XAxis, YAxis } from "recharts";

import { map, maxBy, meanBy, minBy, reverse } from "lodash";
const nameByItem = (item) => {
  let name = "";
  switch (item) {
    case "TEMP":
      name = "온도";
      break;
    case "HUM":
      name = "습도";
      break;
    case "co":
      name = "일산화탄소";
      break;
    case "METHANE":
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
  const nodeid = useLocation();
  const [maxDate, setMaxDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxVal, setMaxVal] = useState(null);
  const [minVal, setMinVal] = useState(null);
  const [localData, setLocalData] = useState(null);
  const {
    sensorWithRangeLoading,
    rangeData,
    last_timestamp,
    lastWeekRangeData,
    lastDayRangeData,
  } = useSensorWithRange(nodeid.state);
  console.log(
    sensorWithRangeLoading,
    rangeData,
    last_timestamp,
    lastWeekRangeData,
    lastDayRangeData
  );
  const { item } = useParams();

  useEffect(() => {
    if (lastWeekRangeData.length > 0) {
      setLocalData(
        reverse(
          map(rangeData, (p) => {
            return { ...p.value, time: moment(p.timestamp).format("HH:mm:ss") };
          }),
          item
        )
      );
      setMaxVal(
        maxBy(
          map(lastWeekRangeData, (p) => {
            return p.value;
          }),
          item
        )[item].toFixed(1)
      );
      setMinVal(
        minBy(
          map(lastWeekRangeData, (p) => {
            return p.value;
          }),
          item
        )[item].toFixed(1)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastWeekRangeData]);
  return (
    <div className="eachSensor">
      <div className="header">
        <div className="backButton">
          <button
            onClick={() => {
              window.history.back();
            }}
          >
            <img src={leftIcon} alt="" />
          </button>
        </div>
        <div className="title">{nameByItem(item)}</div>
        <div className="temp"></div>
      </div>
      <div className="body">
        {sensorWithRangeLoading ? (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              paddingTop: "80%",
              justifyContent: "center",
            }}
          >
            <SpinLoading></SpinLoading>
          </div>
        ) : (
          <>
            <div className="date">
              <div className="dt">
                <div className="title">측정 날짜</div>
                <div className="tt">
                  {moment(last_timestamp).format("YYYY/MM/DD")}
                </div>
              </div>
              <div className="time">
                <div className="title">측정 시간</div>
                <div className="tt">
                  {moment(last_timestamp).format("HH:mm:ss")}
                </div>
              </div>
            </div>
            <div className="chart">
              <div className="titleArea">
                <div className="title">
                  RSX323 {nameByItem(item)}({unit(item)})
                </div>
                {/* <div className="range">
                  <ClockCircleOutline
                    style={{
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}
                  />
                  구간 선택
                </div> */}
              </div>
              <div className="chartArea">
                {sensorWithRangeLoading ? (
                  <></>
                ) : (
                  <LineChart
                    width={300}
                    height={240}
                    data={localData}
                    a
                    margin={{ left: -35, top: 20, bottom: 20, right: 20 }}
                  >
                    <Line
                      type="monotone"
                      dataKey={item}
                      stroke="#22AF4F"
                      isAnimationActive={false}
                    ></Line>
                    <XAxis
                      fontSize={"0.5rem"}
                      dataKey="time"
                      interval={0}
                    ></XAxis>
                    <YAxis></YAxis>
                  </LineChart>
                )}
              </div>
              <div
                style={{ textAlign: "right", marginTop: "20px" }}
                className="fight"
              ></div>
            </div>
            <div className="average">
              <div className="value">
                <div>현재 측정값</div>
                <div
                  style={{
                    color: "#22AF4F",
                  }}
                >
                  {rangeData.length > 0 && rangeData[0].value[item].toFixed(1)}
                  {unit(item)}
                </div>
              </div>
              <div className="value">
                <div>지난주의 평균값</div>
                <div style={{ color: "#22AF4F" }}>
                  {lastWeekRangeData.length > 0 &&
                    meanBy(lastWeekRangeData, (p) => {
                      return p.value[item];
                    }).toFixed(1)}
                  {unit(item)}
                </div>
              </div>
            </div>
            <div className="minmax">
              <div className="value">
                <div>{nameByItem(item)} 최대</div>
                <div>
                  <div className="range">{maxDate}</div>
                  {lastWeekRangeData.length > 0 && maxVal}
                  {unit(item)}
                </div>
              </div>
              <div className="value">
                <div>{nameByItem(item)} 최소</div>
                <div>
                  <div className="range">{minDate}</div>
                  {lastWeekRangeData.length > 0 && minVal}
                  {unit(item)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EachSensor;
