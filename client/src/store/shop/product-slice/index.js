import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isProductDetailsLoading: false,
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
        setProductDetailsLoading: (state, action) => {
            state.isProductDetailsLoading = action.payload;
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

export const { 
    setLoading, 
    setProductDetailsLoading, 
    setProducts, 
    setProductDetails, 
    setRelatedProducts 
} = shopProductSlice.actions;

export default shopProductSlice.reducer;