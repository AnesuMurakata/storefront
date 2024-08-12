import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  title: string;
  image: string;
  price: number;
  category: string;
}

interface CartState {
  products: IProduct[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
