
import baseUrl from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}


export const AllAdsData = createAsyncThunk<any, void>(
  "getAllAdsSlice/AllAdsData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const data = await baseUrl.get(`api/v0/portal/ads?page=1&size=5`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const getAllAdsSlice = createSlice({
  name: "AllAdsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllAdsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AllAdsData.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(AllAdsData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default getAllAdsSlice.reducer;
