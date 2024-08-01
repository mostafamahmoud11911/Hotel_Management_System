import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../../utils/Custom/Custom";


export interface Props {
  data: any[]
  loading: boolean
  error: null | string
}


export const CreateFacility = createAsyncThunk<any, void>("CreateFacilitySlice/CreateFacility", async ({ name }: string) => {

  const token = localStorage.getItem("authToken")

  const data = await baseUrl.post(`/api/v0/admin/room-facilities`, {
    name
  }, {
    headers: {
      Authorization: token,
    }

  })

  return data.data
})


let initialState: Props = {
  data: [],
  loading: false,
  error: null
}


export const CreateFacilitySlice = createSlice({
  name: 'CreateFacility',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateFacility.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateFacility.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(CreateFacility.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  }

})

export default CreateFacilitySlice.reducer