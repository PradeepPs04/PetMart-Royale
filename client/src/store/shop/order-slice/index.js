import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOrderLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

const shopOrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderLoading: (state, action) => {
            state.isOrderLoading = action.payload;
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        resetOrders: (state) => {
            state.orderId = null;
            state.orderList = [];
            state.orderDetails = null;
        },
    }
});

export const { setOrderLoading, setOrderId, setOrderList, setOrderDetails, resetOrders } = shopOrderSlice.actions;
export default shopOrderSlice.reducer;