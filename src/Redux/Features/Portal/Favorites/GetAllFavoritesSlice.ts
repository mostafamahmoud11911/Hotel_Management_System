/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const getFavoriteItems = createAsyncThunk<any, void>(
  "GetAllFavoritesSlice/getFavoriteItems",
  async () => {
    const token = localStorage.getItem("authToken");

    const data = await baseUrl.get(`/api/v0/portal/favorite-rooms`, {
      headers: {
        Authorization: token,
      },

      params: {
        pageNumber: 1,
        pageSize: 3,
      }

    })
    return data?.data;

  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const GetAllFavoritesSlice = createSlice({
  name: "getFavoriteItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavoriteItems.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getFavoriteItems.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
  },
});

export default GetAllFavoritesSlice.reducer;
