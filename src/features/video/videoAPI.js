import axios from "../../utils/axios";

export const getVideo = async (id) => {
  const { data } = await axios.get(`/videos/${id}`);
  return data;
};
