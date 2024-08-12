import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

interface SearchState {
  products: IProduct[];
}

const initialState: SearchState = {
  products: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
