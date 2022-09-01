import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  search: "",
};

// filter Slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    tagsSelected: (state, action) => {
      state.tags.push(action.payload);
    },

    tagsRemoved: (state, action) => {
      const indexToRemove = state.tags.indexOf(action.payload);

      if (indexToRemove > -1) {
        state.tags.splice(indexToRemove, 1);
      }
    },

    searched: (state, action) => {
      state.search = action.payload;
    },

    resetFilter: (state, action) => {
      state.tags = [];
      state.search = "";
    },
  },
});
export const { tagsSelected, tagsRemoved, searched, resetFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
