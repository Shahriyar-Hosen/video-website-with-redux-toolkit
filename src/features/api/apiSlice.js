import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    // Query --> like get
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    // /videos?tags_like=javascript&tags_like=react&id_ne=4&limit=5
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tagsString = title
          .split(" ")
          .map((tag) => `tags_like=${tag}`)
          .join("&");
        const queryString = `/videos?${tagsString}&limit=5`;
        return queryString;
      },
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery } =
  apiSlice;
