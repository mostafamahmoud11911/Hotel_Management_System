/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const chartsData = createAsyncThunk<any, void>(
  "ChartsSlice/chartsData",
  async () => {

    const token = localStorage.getItem("authToken");

    try {
      const data = await baseUrl.get(`/api/v0/admin/dashboard`, {
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
};

const ChartsSlice = createSlice({
  name: "chartsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(chartsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(chartsData.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(chartsData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default ChartsSlice.reducer;
