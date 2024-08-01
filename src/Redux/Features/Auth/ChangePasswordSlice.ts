import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseUrl from "../../../utils/Custom/Custom";
interface ChangePasswordState {
  isConfirmPassword: boolean;
  loading: boolean;
  data: [];
}
const initialState: ChangePasswordState = {
  data: [],
  loading: false,
  isConfirmPassword: false,
};

const fetchData = createAsyncThunk(
  "changePassword/fetchData",
  async (userData) => {
    const token = localStorage.getItem("authToken");
    const response = await baseUrl.post(`/api/v0/admin/users/change-password`, userData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        toast.success(res.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(error.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      });
  }
);
const ChangePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.isConfirmPassword = true;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
  },
});
export { fetchData };
export default ChangePasswordSlice.reducer;
