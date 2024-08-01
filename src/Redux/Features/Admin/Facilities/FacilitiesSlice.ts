/** @format */

import baseUrl from "../../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const FacilitiesData = createAsyncThunk<any, void>(
  "GetFacilitiesSlice/FacilitiesData",
  async () => {
    const token = localStorage.getItem("authToken")
    const data = await baseUrl.get(
      `/api/v0/admin/room-facilities?page=1&size=100`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data.data;
  }
);

let initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const GetFacilitiesSlice = createSlice({
  name: "FacilitiesData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FacilitiesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      FacilitiesData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      FacilitiesData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default GetFacilitiesSlice.reducer;
