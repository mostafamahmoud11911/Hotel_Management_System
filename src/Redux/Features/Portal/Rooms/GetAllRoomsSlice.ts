/** @format */
import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const getRooms = createAsyncThunk<any, void>(
  "GetAllRoomsSlice/getRooms",
  async ({startDate,endDate,roomCount}:any) => {
    
    try {
      const data = await baseUrl.get(`/api/v0/portal/rooms/available`,{
        params:{
page:1,
size:roomCount,
startDate,
endDate
        }
      });
      return data.data;
    } catch (error) {
      toast.error(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const GetAllRoomsSlice = createSlice({
  name: "getRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRooms.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getRooms.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetAllRoomsSlice.reducer;
