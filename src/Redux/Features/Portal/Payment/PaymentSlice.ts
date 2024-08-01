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


export const paymentByVisa = createAsyncThunk<any, void>(
  "PaymentSlice/paymentByVisa",
  async ({id,tokenId:token}:any) => {
    const tokens = localStorage.getItem("authToken");
    try {
      const data = await baseUrl.post(`/api/v0/portal/booking/${id}/pay`,{
        token
      },{
        headers: {
          Authorization: tokens,
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


const PaymentSlice = createSlice({
  name: "paymentByVisa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(paymentByVisa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(paymentByVisa.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.count = action.payload;
    });
    builder.addCase(paymentByVisa.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default PaymentSlice.reducer;
