
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const updateRoomData = createAsyncThunk<any, void>(
  "updateRooms/updateRoomData",
  async ({ addFormData, roomId }: any) => {
    const token = localStorage.getItem("authToken");
    const data = await baseUrl.put(
      `/api/v0/admin/rooms/${roomId}`, addFormData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    }
    );
    return data.data;

  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const updateRoomsSlice = createSlice({
  name: "updateRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateRoomData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateRoomData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      updateRoomData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default updateRoomsSlice.reducer;
