import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";
interface ForgetPasswordState {
  loading: boolean;
  errors: string | null;
}
const initialState: ForgetPasswordState = {
  loading: false,
  errors: null,
};

const fetchData = createAsyncThunk(
  "ForgetPassword/fetchData",
  async (userData) => {
    try {
      const response = await baseUrl
        .post(`/api/v0/portal/users/forgot-password`, userData)
      return response
    } catch (error) {
      return error
    }

  }
);
const ForgetPasswordSlice = createSlice({
  name: "ForgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});
export { fetchData };
export default ForgetPasswordSlice.reducer;
