import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLikeUnlike } from "./LikeUnlikeAPI";

const initialState = {
  likes: 0,
  unlikes: 0,
  isLoading: false,
  isError: false,
  error: "",
};

// Async Thunk
export const fetchLikeUnlike = createAsyncThunk(
  "likeUnlike/fetchLikeUnlike",
  async ({ id, lu, update }) => {
    const likeUnlike = await getLikeUnlike(id, lu, update);
    return likeUnlike;
  }
);

// likeUnlike Slice
const likeUnlikeSlice = createSlice({
  name: "likeUnlike",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikeUnlike.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchLikeUnlike.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.lu === "likes") {
          state.likes = action.payload.data.likes;
        }
        if (action.payload.lu === "unlikes") {
          state.unlikes = action.payload.data.unlikes;
        }
      })
      .addCase(fetchLikeUnlike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export default likeUnlikeSlice.reducer;
