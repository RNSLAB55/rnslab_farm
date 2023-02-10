import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import useSensor from "./sensor";

const useSensorWithRange = (nodeId) => {
  const { sensorInfo, loading } = useSensor(nodeId);
  const { last_timestamp } = sensorInfo;
  const [range, setRange] = useState(null);
  const [sensorWithRangeLoading, setSensorWithRangeLoading] = useState(false);
  const [rangeData, setRangeData] = useState([]);
  const [lastWeekRangeData, setLastWeekRangeData] = useState([]);
  const [lastWeekRange, setLastWeekRange] = useState([]);
  const [lastDayRangeData, setLastDayRangeData] = useState([]);
  const [lastDayRange, setLastDayRange] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (sensorInfo.last_timestamp) {
        setRange([
          moment(last_timestamp).subtract(1, "days"),
          moment(last_timestamp),
        ]);
        setLastWeekRange([
          moment(last_timestamp).subtract(7, "days"),
          moment(last_timestamp),
        ]);
        setLastDayRange([
          moment(last_timestamp).subtract(2, "days"),
          moment(last_timestamp).subtract(1, "days"),
        ]);
      }
    }
  }, [loading]);

  useEffect(() => {
    setSensorWithRangeLoading(true);
    range &&
      axios
        .get("/api/v1.0/storage", {
          headers: {
            Token:
              "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
          },
          params: {
            nid: `${nodeId}`,
            from: range[0].toString(),
            to: range[1].toString(),
          },
        })
        .then((res) => {
          setRangeData(res.data.data);
        });
  }, [range]);

  useEffect(() => {
    range &&
      axios
        .get("/api/v1.0/storage", {
          headers: {
            Token:
              "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
          },
          params: {
            nid: `${nodeId}`,
            from: lastWeekRange[0].toString(),
            to: lastWeekRange[1].toString(),
          },
        })
        .then((res) => {
          setLastWeekRangeData(res.data.data);
          setSensorWithRangeLoading(false);
        });
  }, [range]);

  useEffect(() => {
    range &&
      axios
        .get("/api/v1.0/storage", {
          headers: {
            Token:
              "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
          },
          params: {
            nid: `${nodeId}`,
            from: lastWeekRange[0].toString(),
            to: lastWeekRange[1].toString(),
          },
        })
        .then((res) => {
          setLastWeekRangeData(res.data.data);
          setSensorWithRangeLoading(false);
        });
  }, [range]);
  useEffect(() => {
    range &&
      axios
        .get("/api/v1.0/storage", {
          headers: {
            Token:
              "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
          },
          params: {
            nid: `${nodeId}`,
            from: lastDayRange[0].toString(),
            to: lastDayRange[1].toString(),
          },
        })
        .then((res) => {
          setLastDayRangeData(res.data.data);
          setSensorWithRangeLoading(false);
        });
  }, [range]);
  return {
    range,
    sensorWithRangeLoading,
    rangeData,
    last_timestamp,
    lastWeekRangeData,
    lastDayRangeData,
  };
};

export default useSensorWithRange;