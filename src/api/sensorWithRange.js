import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

const useSensorWithRange = (last_timestamp,nodeId) => {
  const [range, setRange] = useState(null);
  const [sensorWithRangeLoading, setSensorWithRangeLoading] = useState(false);
  const [rangeData, setRangeData] = useState([]);

  useEffect(() => {
      if (last_timestamp) {
        setRange([
          moment(last_timestamp).subtract(1, "days"),
          moment(last_timestamp),
        ]);
    }
  }, []);

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
  return {
    range,
    sensorWithRangeLoading,
    rangeData
  };
};

export default useSensorWithRange;
