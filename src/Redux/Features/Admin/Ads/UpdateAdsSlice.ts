/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const updateAdsData = createAsyncThunk<any, void>(
  "updateAds/updateAdsData",
  async ({ discount, isActive, id }: any, thunkAPI) => {
    const token = localStorage.getItem("authToken");
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.put(
        `/api/v0/admin/ads/${id}`,
        {
          discount,
          isActive,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error);
      toast.error(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const UpdateAdsSlice = createSlice({
  name: "updateAds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAdsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateAdsData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      updateAdsData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default UpdateAdsSlice.reducer;
