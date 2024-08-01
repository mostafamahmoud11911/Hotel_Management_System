import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const AdsData = createAsyncThunk<any, void>(
  "GetAdsSlice/AdsData",
  async (_, thunkAPI) => {

    const token = localStorage.getItem("authToken");
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await baseUrl.get(`/api/v0/admin/ads?page=1&size=100`, {
        headers: {
          Authorization: token,
        },
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

const GetAdsSlice = createSlice({
  name: "AdsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AdsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AdsData.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(AdsData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetAdsSlice.reducer;
