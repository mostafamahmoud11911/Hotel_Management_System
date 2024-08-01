/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseUrl from "../../../utils/Custom/Custom";

interface UserData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role: string;
  profileImage: FileList;
}

const initialState = {
  role: "user",
  loading: false,
  isRegister: false,
};

const fetchData = createAsyncThunk<string, UserData, { rejectValue: string }>(
  "login/fetchData",

  async (data, thunkAPI) => {
    try {
      data.role = "user";
      const addFormData = new FormData();
      addFormData.append("userName", data["userName"]);
      addFormData.append("email", data["email"]);
      addFormData.append("password", data["password"]);
      addFormData.append("confirmPassword", data["confirmPassword"]);
      addFormData.append("phoneNumber", data["phoneNumber"]);
      addFormData.append("country", data["country"]);
      addFormData.append("role", data["role"]);
      addFormData.append("profileImage", data["profileImage"][0]);
      await baseUrl.post(`/api/v0/admin/users`, addFormData).then(() => {
        toast.success("register successfully");
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      throw error;
    }
  }
);
const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.isRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.role = action.payload;
      state.loading = false;
      state.isRegister = true;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
      state.isRegister = false;
    });
  },
});
export const { fetchDataStart } = RegisterSlice.actions;
export { fetchData };
export default RegisterSlice.reducer;
