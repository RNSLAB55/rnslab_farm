export const unit = (item) => {
    let unit = "";
    switch (item) {
      case "T":
        unit = "°C";
        break;
      case "H":
        unit = "%";
        break;
      case "CO":
        unit = "ppm";
        break;
      case "METHANE":
        unit = "ppm";
        break;
      case "H2S":
        unit = "ppm";
        break;
      case "NOx":
        unit = "ppm";
        break;
      case "CO2":
        unit = "ppm";
      case "EC":
        unit = "uS/cm";
      case "ST":
        unit = "°C";
      case "SH":
        unit = "%";
      default:
        unit = "ppm";
        break;
    }
    return unit;
};