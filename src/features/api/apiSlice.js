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
      // keepUnusedDataFor: 600,
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
    }),
    // /videos?tags_like=javascript&tags_like=react&id_ne=4&_limit=4`
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tagsString = title
          .split(" ")
          .map((tag) => `title_like=${tag}`)
          .join("&");
        const queryString = `/videos?${tagsString}&_limit=4`;
        return queryString;
      },
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
} = apiSlice;
