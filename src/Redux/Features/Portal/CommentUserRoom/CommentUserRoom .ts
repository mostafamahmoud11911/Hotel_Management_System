/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const CommentUserRoom = createAsyncThunk(
  "comment/CommentUserRoom",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const tokens = localStorage.getItem("authToken");
    try {
      const response = await baseUrl.post(
        `/api/v0/portal/room-comments`,
        data,
        {
          headers: {
            Authorization:tokens
          },
        }
      );
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

const CommentUerRoomSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CommentUserRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        CommentUserRoom.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        CommentUserRoom.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export default CommentUerRoomSlice.reducer;
