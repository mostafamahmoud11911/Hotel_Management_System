/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
  count:number
}

interface IProps {
  startDate?:string
  endDate?:string
  id?:string
  price?:number
}


export const CreateBooking = createAsyncThunk<any, void>(
  "CreateBookingSlice/CreateBooking",
  async ({startDate,endDate,id,price}:IProps) => {

    const token = localStorage.getItem("authToken");
    try {
      const data = await baseUrl.post(`/api/v0/portal/booking`,{
        startDate,
        endDate,
        room:id,
        totalPrice:price
      },{
        headers: {
          Authorization: token,
        },
      });
      return data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        autoClose: 2000,
        theme: "colored",
      })
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
  count:0
};


const CreateBookingSlice = createSlice({
  name: "CreateBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateBooking.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.count = action.payload;
    });
    builder.addCase(CreateBooking.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default CreateBookingSlice.reducer;
