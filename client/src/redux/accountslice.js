// accountSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Function to get the token from localStorage (or wherever you store it)
const getToken = () => localStorage.getItem('token');

export const addAccount = createAsyncThunk(
  'clientAccount/addAccount',
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7100/account/addaccount', accountData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAllAccounts = createAsyncThunk(
    'clientAccount/fetchAllAccounts',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:7100/account/allaccount', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        console.log('Fetch all accounts response:', response); // Log the response
        return response.data.data; // Ensure this matches the structure returned by your backend
      } catch (error) {
        console.error('Error fetching accounts:', error.response);
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  

const accountSlice = createSlice({
  name: 'clientAccount',
  initialState: {
    account: null,
    accounts: [],
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
      })
      .addCase(fetchAllAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts = action.payload; // Ensure accounts is set correctly
        state.error = null;
      })
      .addCase(fetchAllAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
