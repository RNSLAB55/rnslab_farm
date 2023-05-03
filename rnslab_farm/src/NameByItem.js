const NameByItem = (item) => {
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
      case "EC":
        name = "전기전도도";
        break;
      case "ST":
        name = "토양온도";
        break;
      case "SH":
        name = "토양습도";
        break;
      case "AQS":
        name = "유해가스";
        break;
      case "PM1":
        name = "PM1";
        break;
      case "PM10":
        name = "PM10";
        break;
      case "PM25":
        name = "PM2.5";
        break;
      case "CH4":
        name = "메테인";
        break;
      default:
        name = "Value";
        break;
    }
  
    return name;
};

export default NameByItem;