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

#### 3. Api items Slice => Query in Api Get --> like videos

```sh
  endpoints: (builder) => ({
      // Query --> like get
      getVideos: builder.query({
         query: () => "/videos",
      }),
   }),

export const { useGetVideosQuery } = apiSlice;

```

#### 3.1 Get Api items --> like videos in UI

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

#### 4. Get Api item => Query in Api Slice --> like single video

```sh
   endpoints: (builder) => ({
         // Query --> like get
         getVideo: builder.query({
         query: (videoId) => `/videos/${videoId}`,
      }),
      }),

   export const { useGetVideoQuery } = apiSlice;

```

#### 4.1 Get Api item --> like single video in UI

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

#### 5. Related Search --> Get Api item title By Title => Get Api items --> like videos

```sh
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

export const { useGetRelatedVideosQuery } = apiSlice;

```

#### 6. Mutation - Add Items/video to server API => Mutation Api item --> Adding video - POST request

```sh
   endpoints: (builder) => ({
      addVideo: builder.mutation({
         query: (data) => ({
            url: "/videos",
            method: "POST",
            body: data,
         }),
      }),
   }),

   export const { useGetVideoQuery } = apiSlice;

```

#### 6.1 Mutation - Add Items/video to server API in UI

```sh
   const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();

   // Submit function
   const handleSubmit = (e) => {
      e.preventDefault();

      addVideo(data);

   };

```

#### 6.2 Cache Behavior - Revalidation => Automated Re-fetching --> Adding video - POST request

##### stapes -> (1)

```sh
   reducerPath: "api",
   baseQuery: fetchBaseQuery({}),

   // tag Types -> added Unique tags
   tagTypes: ["Videos", "Video", "RelatedVideos"],

   endpoints:{}

```

##### stapes -> (2)

```sh
   endpoints:({
      getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,

      // Provides This Query Unique Tags
      providesTags: ["Videos"],
    }),
```

#### or

```sh

   getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,

      // Provides This Query Unique Tags
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
   }),
```

#### or

```sh
   getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tagsString = title
          .split(" ")
          .map((tag) => `title_like=${tag}`)
          .join("&");
        const queryString = `/videos?${tagsString}&_limit=4`;
        return queryString;
      },

      // Provides This Query Unique Tags
      providesTags: (result, error, arg) => [
        { type: "RelatedVideos", id: arg.id },
      ],
   }),

   })

```

##### stapes -> (3)

```sh
   endpoints: (builder) => ({
      addVideo: builder.mutation({
         query: (data) => ({
            url: "/videos",
            method: "POST",
            body: data,
         }),

         // Invalidates tags videos catch & than Automated Re-fetching
         invalidatesTags: ["Videos"],

      }),
   }),

```

#### or

```sh
   endpoints: (builder) => ({
      editVideo: builder.mutation({
         query: ({ id, data }) => ({
            url: `/videos/${id}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: (result, error, arg) => [
            "Videos",
            { type: "Video", id: arg.id },
            { type: "RelatedVideos", id: arg.id },
         ],
      }),
   }),
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
