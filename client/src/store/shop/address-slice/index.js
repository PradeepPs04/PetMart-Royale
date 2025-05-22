import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAddressLoading: false,
    addressList: [],
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddressLoading: (state, action) => {
            state.isAddressLoading = action.payload;
        },
        setAddressList: (state, action) => {
            state.addressList = action.payload;
        }
    }
});

export const {setAddressLoading, setAddressList} = addressSlice.actions;
export default addressSlice.reducer;