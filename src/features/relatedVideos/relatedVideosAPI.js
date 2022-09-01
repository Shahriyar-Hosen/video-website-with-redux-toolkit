import axios from "../../utils/axios";

// ?tags_like=javascript&tags_like=react&id_ne=4&limit=5

export const getRelatedVideos = async ({ tags, id }) => {
  const limit = 5;
  const queryString =
    tags?.length > 0
      ? tags.map((tag) => `tags_like=${tag}`).join("&") +
        `&id_ne=${id}` +
        `&limit=${limit}`
      : `id_ne=${id}&limit=${limit}`;
  console.log(`/videos?${queryString}`);
  const { data } = await axios.get(`/videos?${queryString}`);
  return data;
};
