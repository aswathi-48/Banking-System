import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addAccount = createAsyncThunk(
  'clientAccount/addAccount',
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7100/user/add-account', accountData);
      return response.data.data; // Assuming the backend returns the newly created account data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const accountSlice = createSlice({
  name: 'clientAccount',
  initialState: {
    account: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.account = action.payload;
        state.error = null;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
