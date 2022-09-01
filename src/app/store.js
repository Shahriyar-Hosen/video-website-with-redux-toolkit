import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";
import tagReducer from "../features/tags/tagSlice";
import videoReducer from "../features/video/videoSlice";
import relatedVideosReducer from "../features/relatedVideos/relatedVideosSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    tags: tagReducer,
    video: videoReducer,
    relatedVideos: relatedVideosReducer,
  },
});
