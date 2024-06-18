
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClientUsers = createAsyncThunk('clientUsers/fetchClientUsers', async () => {
  const response = await axios.post('http://localhost:7100/user/clients'); 
  return response.data.data;
});

export const deleteClientUser = createAsyncThunk(
    'clientUsers/deleteClientUser',
    async (userId) => {
      const response = await axios.patch(`http://localhost:7100/user/delete`,{userId});
      return response.data.data; 
    }
  );

const clientUsersSlice = createSlice({
  name: 'clientUsers',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchClientUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteClientUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteClientUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted user from the state
        state.users = state.users.filter(user => user._id !== action.payload._id);
      })
      .addCase(deleteClientUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clientUsersSlice.reducer;
