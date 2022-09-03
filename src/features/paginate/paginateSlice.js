import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageVideo: [],
  pageSize: 5,
  pageNumber: 1,
};

// paginate Slice
const paginateSlice = createSlice({
  name: "paginate",
  initialState,
  reducers: {
    paginateNumber: (state, action) => {
      //action destructure
    //   const { array, page_size, page_number } = action.payload;
      state.pageNumber = action.payload;

      //     // slice array of index index
      //     state.pageVideo = array?.slice(
      //       (page_number - 1) * page_size,
      //       page_number * page_size
      //     );
    },
  },
});
export const { paginateNumber } = paginateSlice.actions;
export default paginateSlice.reducer;
