import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartId: '',
    cartItems: [],
    isLoading: false,
}

const shopCartSlice = createSlice({
    name: 'shopCart',
    initialState,
    reducers: {
        setCartId: (state, action) => {
            state.cartId = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        setCartLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        resetCart: (state) => {
            state.cartId = '';
            state.cartItems = [];
        }
    }
});

export const { setCartId, setCartLoading, setCartItems, resetCart } = shopCartSlice.actions;
export default shopCartSlice.reducer;
