import axios from "../../utils/axios";

export const getLikeUnlike = async (id, lu, update) => {
  if (lu === "likes") {
    const { data } = await axios.patch(
      `/videos/${id}`,
      {
        likes: update,
      },
      {
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    return { data, lu };
  }
  if (lu === "unlikes") {
    const { data } = await axios.patch(
      `/videos/${id}`,
      {
        unlikes: update,
      },
      {
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    return { data, lu };
  }
};
