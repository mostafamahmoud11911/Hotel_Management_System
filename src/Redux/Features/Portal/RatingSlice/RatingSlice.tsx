/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const setRatingRooms = createAsyncThunk(
  "rate/RatingRooms",
  async (data, thunkAPI) => {
    const tokens = localStorage.getItem("authToken");
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.post(`/api/v0/portal/room-reviews`, data, {
        headers: {
          Authorization: tokens,
        },
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return rejectWithValue(error);
    }
  }
);

const initialState = { data: [], loading: false, error: null };

const RatingRoomSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RatingRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(RatingRooms.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(RatingRooms.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default RatingRoomSlice.reducer;
