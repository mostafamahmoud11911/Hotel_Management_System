
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const RoomsData = createAsyncThunk<any, void>(
  "GetRoomsSlice/RoomsData",
  async () => {
    const token = localStorage.getItem("authToken");
    const data = await baseUrl.get(`/api/v0/admin/rooms?page=1&size=100`, {
      headers: {
        Authorization: token,
      },
    })
    return data.data;
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const GetRoomsSlice = createSlice({
  name: "RoomsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RoomsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      RoomsData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(RoomsData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetRoomsSlice.reducer;
