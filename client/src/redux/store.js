import { configureStore } from '@reduxjs/toolkit';
import clientUserSlice from './clientUserSlice';
import accountslice from './accountslice';

const store = configureStore({
  reducer: {
    clientUsers: clientUserSlice,
    account:accountslice,
  },
});

export default store;