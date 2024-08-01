/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteDialog = createAsyncThunk(
  "delete/deleteDialog",
  async ({ id, currentUrl }: any) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await baseUrl.delete(
        `/api/v0/admin/${currentUrl}/${id}`,
        {
          headers: {
            AuthOrization: token,
          },
        }
      );
      return response;
    } catch (error) {
      return error
    }
  }
);

const initialState = { data: [], loading: false, error: null };
const deleteItemSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDialog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDialog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteDialog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default deleteItemSlice.reducer;
