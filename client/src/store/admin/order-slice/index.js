import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAdminOrdersLoading: false,
    orderList: [],
    orderDetails: null,
}

const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState,
    reducers: {
        setAdminOrderLoading: (state, action) => {
            state.isAdminOrdersLoading = action.payload;
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload;
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        }
    }
});

export const {setAdminOrderLoading, setOrderList, setOrderDetails} = adminOrderSlice.actions
export default adminOrderSlice.reducer;