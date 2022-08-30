import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "../features/videos/videosSlice";
import tagReducer from "../features/tags/tagSlice";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    tags: tagReducer,
  },
});
