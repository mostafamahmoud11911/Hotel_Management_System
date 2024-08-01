/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const UsersData = createAsyncThunk<any, void>(
  "GetUsersSlice/UsersData",
  async () => {
    const token = localStorage.getItem("authToken");
    let data = await baseUrl.get(`/api/v0/admin/users?page=1&size=100`, {
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

export const GetUsersSlice = createSlice({
  name: "UsersData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UsersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      UsersData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(UsersData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetUsersSlice.reducer;
