import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: [],
    productDetails: null,
    relatedProducts: [],
}

const shopProductSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        },
        setRelatedProducts: (state, action) => {
            state.relatedProducts = action.payload;
        },
    }
});

export const { setLoading, setProducts, setProductDetails, setRelatedProducts } = shopProductSlice.actions;
export default shopProductSlice.reducer;