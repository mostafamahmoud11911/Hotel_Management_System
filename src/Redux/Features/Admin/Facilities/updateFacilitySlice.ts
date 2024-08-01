/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const updateFacilityData = createAsyncThunk<any, void>(
  "updateFacilities/updateFacilityData",
  async ({ data, id }, thunkAPI) => {
    const token = localStorage.getItem("authToken");
    const { name } = data;
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await baseUrl.put(
        `/api/v0/admin/room-facilities/${id}`,
        {
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const updateFacilitySlice = createSlice({
  name: "updateFacilities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateFacilityData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateFacilityData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      updateFacilityData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default updateFacilitySlice.reducer;
