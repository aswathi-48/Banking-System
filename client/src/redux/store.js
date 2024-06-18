import { configureStore } from '@reduxjs/toolkit';
import clientUserSlice from './clientUserSlice';

const store = configureStore({
  reducer: {
    clientUsers: clientUserSlice,
  },
});

export default store;