
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  value: CartItem[];
}

const initialState: CartState = {
  value: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.value.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.value.push({ ...newItem, quantity: 1 });
      }
    },

    removeItems: (state, action: PayloadAction<{ id: number }>) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },

    updateItems: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const existingItem = state.value.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },

    emptyCart: (state) => {
      state.value = [];
    },
  },
});

export const { addItems, removeItems, updateItems, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
