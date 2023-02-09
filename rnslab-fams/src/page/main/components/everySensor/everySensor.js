import React, { useEffect, useState } from "react";
import useSensor from "../../../../api/sensor";

import METHANEImg from "../../../../assets/img/methane.png";
import NOxImg from "../../../../assets/img/bus.png";
import coImg from "../../../../assets/img/carbon-monoxide.png";
import TEMPImg from "../../../../assets/img/temperature.png";
import HUMImg from "../../../../assets/img/humidity.png";
import H2SImg from "../../../../assets/img/sulfide.png";
import { useNavigate } from "react-router-dom";
import { SpinLoading, Toast } from "antd-mobile";
import { unit } from "../../../../common";

const EverySensor = (node) => {
  const navigate = useNavigate();
  const { sensorValue, sensorInfo, loading } = useSensor(
    node.init.node_id
  );
  const [range, setRange] = useState(JSON.parse(localStorage.getItem("range")));

  useEffect(() => {
    setRange(JSON.parse(localStorage.getItem("range")));
  }, []);

  const Sensor = (props) => {
    const { title, img, value, item } = props;
    console.log(range, item);
    const isSetting = () => {
      return (
        (Number(range[`min${item}`]) === 0 &&
          Number(range[`max${item}`]) === 0) ||
        range[`max${item}`] === undefined
      );
    };
    const outOfRange = () => {
      return (
        !isSetting() &&
        (value > Number(range[`max${item}`]) ||
          value < Number(range[`min${item}`]))
      );
    };

    const setId = () => {
      let id = "";
      if (value) {
        if (outOfRange()) {
          id = "outOfRange";
        }
      } else {
        id = "noValue";
      }
      return id;
    };
    const setFontColor = () => {
      let color = "#22AF4F";
      if (value) {
        if (outOfRange()) {
          color = "#EBC271";
        }
      } else {
        color = "red";
      }
      return color;
    };

    return (
      <div
        onClick={() => {
          value != undefined
            ? navigate(`/eachSensor/${item}`, {
                state: node.init.node_id,
              })
            : Toast.show({ content: "데이터가 없습니다", position: "bottom" });
        }}
        id={setId()}
        className="item"
      >
        <div className="imgArea">
          <img src={img} alt=""></img>
        </div>
        <div style={{ fontSize: "18px" }} className="infoArea">
          {title}
          <div style={{ display: "flex", fontSize: "14px", marginTop: "3px" }}>
            {isSetting() ? (
              <div
                style={{ fontSize: "12px", marginTop: "6px", color: "#E47736" }}
              >
                범위를 설정해주세요
              </div>
            ) : (
              <>
                <div>{Number(range[`min${item}`]).toFixed(1)}</div>
                <div style={{ marginLeft: "6px", color: "#EBC271" }}>
                  {Number(range[`max${item}`]).toFixed(1)}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="valueArea">
          <span
            style={{
              fontSize: "24px",
              color: setFontColor(),
              marginTop: value ? "" : "-10px",
            }}
          >
            {value ? value.toFixed(1) : "no data"}
          </span>
          <span
            style={{
              marginTop: "10px",
              paddingLeft: "4px",
            }}
          >
            {value && unit(item)}
          </span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="everySensor">
        <div className="updateTime">
          최근 업데이트 시각
          <br /> {sensorInfo.last_timestamp}
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              textAlign: "center",
              paddingTop: "60%",
              justifyContent: "center",
            }}
          >
            <SpinLoading></SpinLoading>
          </div>
        ) : node.init.node_type.split('"')[3].slice(3, 6) == "322" ? (
          <>
            <Sensor
              item="T"
              img={TEMPImg}
              title="온도"
              value={sensorValue && sensorValue.T}
            ></Sensor>
            <Sensor
              item="H"
              img={HUMImg}
              title="습도"
              value={sensorValue && sensorValue.H}
            ></Sensor>
            <Sensor
              item="B"
              img={coImg}
              title="배터리"
              value={sensorValue && sensorValue.B}
            ></Sensor>
            <Sensor
              item="V"
              img={METHANEImg}
              title="버전"
              value={sensorValue && sensorValue.V}
            ></Sensor>
          </>
        ) : node.init.node_type.split('"')[3].slice(3, 6) == "321" ? (
          <>
            <Sensor
              item="T"
              img={TEMPImg}
              title="온도"
              value={sensorValue && sensorValue.T}
            ></Sensor>
            <Sensor
              item="H"
              img={HUMImg}
              title="습도"
              value={sensorValue && sensorValue.H}
            ></Sensor>
            <Sensor
              item="CO2"
              img={coImg}
              title="이산화탄소"
              value={sensorValue && sensorValue.CO2}
            ></Sensor>
            <Sensor
              item="V"
              img={METHANEImg}
              title="버전"
              value={sensorValue && sensorValue.V}
            ></Sensor>
            <Sensor
              item="EC"
              img={H2SImg}
              title="전기전도도"
              value={sensorValue && sensorValue.EC}
            ></Sensor>
            <Sensor
              item="SH"
              img={NOxImg}
              title="SH"
              value={sensorValue && sensorValue.SH}
            ></Sensor>
            <Sensor
              item="ST"
              img={NOxImg}
              title="ST"
              value={sensorValue && sensorValue.ST}
            ></Sensor>
          </>
        ) : (
          <>
            <Sensor
              item="V"
              img={TEMPImg}
              title="버전"
              value={sensorValue && sensorValue.V}
            ></Sensor>
            <Sensor
              item="CO"
              img={coImg}
              title="일산화탄소"
              value={sensorValue && sensorValue.CO}
            ></Sensor>
            <Sensor
              item="METHAN"
              img={METHANEImg}
              title="메탄가스"
              value={sensorValue && sensorValue.METHANE}
            ></Sensor>
            <Sensor
              item="H2S"
              img={H2SImg}
              title="황화수소가스"
              value={sensorValue && sensorValue.H2S}
            ></Sensor>
            <Sensor
              item="NOx"
              img={NOxImg}
              title="질소화합물가스"
              value={sensorValue && sensorValue.NOx}
            ></Sensor>
          </>
        )}
      </div>
    </>
  );
};

export default EverySensor;
