import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const UserDetails = createAsyncThunk<any, void>(
  "GetUserDetailsSlice/UserDetails",
  async (id) => {
    const token = localStorage.getItem("authToken");
    let data = await baseUrl.get(`/api/v0/admin/users/${id}`, {
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

export const GetUserDetailsSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      UserDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(UserDetails.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetUserDetailsSlice.reducer;
