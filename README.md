# Video Website With Redux Toolkit

## RTK Query Configuration ⚜ ⬇⬇⬇

### API Slice creation & Store configuration

#### 1. Create Api Slice -

```sh
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

   export const apiSlice = createApi({
      reducerPath: "api",
      baseQuery: fetchBaseQuery({
         baseUrl: "http://localhost:9000",
      }),
      endpoints: (builder) => ({

   }),
});

```

#### 2. Store configuration

```sh
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
   },
   middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares().concat(apiSlice.middleware),
});

```

#### 3. Query in Api Slice => Get Api items --> like videos

```sh
  endpoints: (builder) => ({
      // Query --> like get
      getVideos: builder.query({
         query: () => "/videos",
      }),
   }),

export const { useGetVideosQuery } = apiSlice;

```

#### 3.1 Get Api items --> like videos in ui

```sh
  const { data: videos, isLoading, isError } = useGetVideosQuery();

   // decide what to render
   let content = null;

   if (isLoading) {
      content = <Loading />;
   }

   if (!isLoading && isError) {
      content = <Error message="There was an error" />;
   }

   if (!isLoading && !isError && videos?.length === 0) {
      content = <Error message="No videos found!" />;
   }

   if (!isLoading && !isError && videos?.length > 0) {
      content = videos.map((video) => <Video key={video.id} video={video} />);
   }

   return content;

   // likes -->
   // return (
   //    <>
   //       {content}
   //    </>
   // );

```

#### 4. Query in Api Slice => Get Api item --> like single video

```sh
   endpoints: (builder) => ({
         // Query --> like get
         getVideo: builder.query({
         query: (videoId) => `/videos/${videoId}`,
      }),
      }),

   export const { useGetVideoQuery } = apiSlice;

```

#### 4.1 Get Api item --> like single video in ui

```sh
   const { videoId } = useParams();
   const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

   let content = null;
   if (isLoading) {
      content = <Loading />;
   }

   if (!isLoading && isError) {
      content = <Error message="There was an error!" />;
   }

   if (!isLoading && !isError && video?.id) {
      content = video;
   }

      return content;

      // likes -->
      // return (
      //    <>
      //       {content}
      //    </>
      // );

```
