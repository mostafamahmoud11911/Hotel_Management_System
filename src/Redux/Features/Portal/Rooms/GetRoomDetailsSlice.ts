/** @format */
import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const roomDetails = createAsyncThunk<any, void>(
  "GetRoomDetailsSlice/roomDetails",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const data = await baseUrl.get(`/api/v0/portal/rooms/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const GetRoomDetailsSlice = createSlice({
  name: "roomDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(roomDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(roomDetails.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(roomDetails.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetRoomDetailsSlice.reducer;
