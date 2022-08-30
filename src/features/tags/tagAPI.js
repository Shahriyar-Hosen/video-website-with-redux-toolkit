import axios from "../../utils/axios";

export const getTags = async () => {
  const { data } = await axios.get("/tags");
  return data;
};
