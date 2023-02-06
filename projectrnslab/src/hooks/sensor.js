import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
const useSensor = (node) => {
  const [loading, setLoading] = useState(false);
  const [sensorInfo, setSensorInfo] = useState({
    created_at: null,
    last_timestamp: null,
  });
  const [sensorValue, setSensorValue] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1.0/node/${node}`, {
        headers: {
          Token:
            "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
        },
      })
      .then((res) => {
        setSensorInfo({
          created_at: moment(res.data.node.created_at).format("YYYY-MM-DD"),
          last_timestamp: moment(res.data.node.last_timestamp).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        });
        setSensorValue(res.data.node.last_data);
        setLoading(false);
      });
  }, []);

  return { sensorInfo, sensorValue, loading };
};

export default useSensor;
