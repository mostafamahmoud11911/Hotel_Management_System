/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const BookingData = createAsyncThunk<any, void>(
  "GetBookingSlice/BookingData",
  async () => {
    const token = localStorage.getItem("authToken");
    const data = await baseUrl.get(`/api/v0/admin/booking?page=1&size=100`, {
      headers: {
        Authorization: token,
      },
    });
    return data.data;
  }
);

let initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const GetBookingSlice = createSlice({
  name: "BookingData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BookingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      BookingData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      BookingData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default GetBookingSlice.reducer;
