import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    products: [],
}

const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
});

export const { setLoading, setProducts } = adminProductSlice.actions;
export default adminProductSlice.reducer;