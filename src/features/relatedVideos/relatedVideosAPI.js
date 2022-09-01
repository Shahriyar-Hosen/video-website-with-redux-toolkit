import axios from "../../utils/axios";

export const getRelatedVideos = async ({ tags, id }) => {
    const limit = 5;
    const queryString = tags.length > 0 ? ``:``;
  const { data } = await axios.get("/videos");
  return data;
};
