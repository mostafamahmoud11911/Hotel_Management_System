/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
  remove:number
  
}


export const RemoveFavoriteItem = createAsyncThunk<any, void>(
  "RemoveFavoriteItemSlice/RemoveFavoriteItem",
  async (roomId) => {
    const token = localStorage.getItem("authToken");
    try {
      const data = await baseUrl.delete(`/api/v0/portal/favorite-rooms/${roomId}`,{
        headers: {
          Authorization: token,
        },
        data:{roomId}
      }
      );
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
  remove:0
};


const RemoveFavoriteItemSlice = createSlice({
  name: "RemoveFavoriteItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RemoveFavoriteItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveFavoriteItem.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.remove = action.payload;
    });
    builder.addCase(RemoveFavoriteItem.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default RemoveFavoriteItemSlice.reducer;


