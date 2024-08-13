import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
