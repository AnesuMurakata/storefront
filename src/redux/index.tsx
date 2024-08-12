import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
