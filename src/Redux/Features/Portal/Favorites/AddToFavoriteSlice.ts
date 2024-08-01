/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
  count:number
}


export const AddFavoriteItem = createAsyncThunk<any, void>(
  "AddToFavorite/AddFavoriteItem",
  async (roomId) => {
    const token = localStorage.getItem("authToken");
    try {
      const data = await baseUrl.post(`/api/v0/portal/favorite-rooms`,{
        roomId
      },{
        headers: {
          Authorization: token,
        },
      });
      return data.data;
    } catch (error) {
      toast.error(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
  count:0
};


const AddToFavorite = createSlice({
  name: "AddFavoriteItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddFavoriteItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddFavoriteItem.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.count = action.payload;
    });
    builder.addCase(AddFavoriteItem.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default AddToFavorite.reducer;
