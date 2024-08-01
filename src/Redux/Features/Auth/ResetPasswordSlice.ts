import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";
interface ResetPasswordState {
  loading: boolean;
  errors: string | null;
}
const initialState: ResetPasswordState = {
  loading: false,
  errors: null,
};

export const handleResetPassword = createAsyncThunk(
  "ResetPasswordSlice/handleResetPassword",
  async (userData) => {
    try {
      const response = await baseUrl
        .post(`/api/v0/portal/users/reset-password`, userData)
      return response
    } catch (error) {
      return error
    }

  }
);
const ResetPasswordSlice = createSlice({
  name: "ResetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleResetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleResetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(handleResetPassword.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default ResetPasswordSlice.reducer;
