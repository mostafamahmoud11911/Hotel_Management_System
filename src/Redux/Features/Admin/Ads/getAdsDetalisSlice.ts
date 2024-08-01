/** @format */

import baseUrl from "../../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const getAdsDetailsData = createAsyncThunk<any, void>(
  "adsDetails/getAdsData",
  async (id) => {
    const token = localStorage.getItem("authToken");
    const data = await baseUrl.get(`/api/v0/admin/ads/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data.data;
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const getAdsDetailsSlice = createSlice({
  name: "adsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdsDetailsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAdsDetailsData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      getAdsDetailsData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default getAdsDetailsSlice.reducer;
