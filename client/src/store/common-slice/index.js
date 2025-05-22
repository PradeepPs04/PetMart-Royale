import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    featureImageList: [],
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setFeatureImageList: (state, action) => {
            state.featureImageList = action.payload;
        },
    }
});

export const {setLoading, setFeatureImageList} = commonSlice.actions;
export default commonSlice.reducer;