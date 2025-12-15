import axios from "axios";

const fetchStopETA = async (stop_id) => {
  const result = await axios.get(
    `https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stop_id}`
  );

  return result.data;
};

export default {
  fetchStopETA,
};
