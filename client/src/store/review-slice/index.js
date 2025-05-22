import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isReviewLoading: false,
    reviews: [],
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setIsReviewLoading: (state, action) => {
            state.isReviewLoading = action.payload;
        },
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
    },
});

export const {setIsReviewLoading, setReviews} = reviewSlice.actions;
export default reviewSlice.reducer;