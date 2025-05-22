import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearchLoading: false,
    searchResults: [],
}

const searchSlice = createSlice({
    name: 'shopSearch',
    initialState,
    reducers: {
        setIsSearchLoading: (state, action) => {
            state.isSearchLoading = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
    } 
});

export const { setIsSearchLoading, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;