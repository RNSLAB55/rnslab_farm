import React from "react";

import METHANEImg from "../../../../assets/img/methane.png";
import NOxImg from "../../../../assets/img/bus.png";
import coImg from "../../../../assets/img/carbon-monoxide.png";
import TEMPImg from "../../../../assets/img/temperature.png";
import HUMImg from "../../../../assets/img/humidity.png";
import H2SImg from "../../../../assets/img/sulfide.png";

import { Toast } from "antd-mobile";
import { unit } from "../../../../common";

const Setting = (props) => {
  const { changeMenu } = props;
  const settingRange = JSON.parse(localStorage.getItem("range"));

  const Sensor = (props) => {
    const { title, img, item } = props;
    return (
      <div className="item">
        <div className="imgArea">
          <img src={img} alt=""></img>
        </div>
        <div style={{ fontSize: "14px" }} className="infoArea">
          {title}
        </div>
        <div className="valueArea">
          {item === "TEMP" ? (
            <div
              style={{
                display: "flex",
                fontSize: "10px",
                marginTop: "-24px",
                marginBottom: "10px",
              }}
            >
              <div style={{ flexGrow: 1, textAlign: "center" }}>최솟값</div>
              <div style={{ flexGrow: 1, textAlign: "center" }}>최댓값</div>
            </div>
          ) : (
            <></>
          )}
          <div style={{ display: "flex" }}>
            <input
              step="0.1"
              name={"min" + item}
              defaultValue={Number(settingRange[`min${item}`]).toFixed(1)}
              type="number"
            ></input>
            <input
              step="0.1"
              name={"max" + item}
              defaultValue={Number(settingRange[`max${item}`]).toFixed(1)}
              type="number"
            ></input>
          </div>
          <div
            style={{ fontSize: "10px", textAlign: "right", marginTop: "2px" }}
          >
            단위 :{unit(item)}
          </div>
        </div>
      </div>
    );
  };
  const handleSubmint = (event) => {
    event.preventDefault();
    console.log(event);
    localStorage.setItem(
      "range",
      JSON.stringify({
        minT: event.target[0].value,
        maxT: event.target[1].value,
        minH: event.target[2].value,
        maxH: event.target[3].value,
        minCO: event.target[4].value,
        maxCO: event.target[5].value,
        minMETHAN: event.target[6].value,
        maxMETHAN: event.target[7].value,
        minH2S: event.target[8].value,
        maxH2S: event.target[9].value,
        minNOx: event.target[10].value,
        maxNOx: event.target[11].value,
        minCO2: event.target[12].value,
        maxCO2: event.target[13].value,
        minB: event.target[14].value,
        maxB: event.target[15].value,
        minEC: event.target[16].value,
        maxEC: event.target[17].value,
        minSH: event.target[18].value,
        maxSH: event.target[19].value,
        minST: event.target[20].value,
        maxST: event.target[21].value,
      })
    );
    Toast.show({
      content: "저장되었습니다",
      position: "bottom",
    });
    changeMenu(1);
  };
  return (
    <form onSubmit={handleSubmint}>
      <div className="setting">
        <div className="body">
          <Sensor item="T" img={TEMPImg} title="온도"></Sensor>
          <Sensor item="H" img={HUMImg} title="습도"></Sensor>
          <Sensor item="CO" img={coImg} title="일산화탄소"></Sensor>
          <Sensor item="METHAN" img={METHANEImg} title="메탄가스"></Sensor>
          <Sensor item="H2S" img={H2SImg} title="황화수소가스"></Sensor>
          <Sensor item="NOx" img={NOxImg} title="질소화합물가스"></Sensor>
          <Sensor item="CO2" img={coImg} title="이산화탄소"></Sensor>
          <Sensor item="B" img={coImg} title="배터리"></Sensor>
          <Sensor item="EC" img={coImg} title="전기 전도도"></Sensor>
          <Sensor item="SH" img={coImg} title="SH"></Sensor>
          <Sensor item="ST" img={coImg} title="ST"></Sensor>
        </div>
        <div className="footer">
          <button type="submit">저장하기</button>
        </div>
      </div>
    </form>
  );
};

export default Setting;
