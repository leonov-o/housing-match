import {createSlice} from "@reduxjs/toolkit";
import {fetchTags} from "@/entities/tag/model/store/actionCreators.js";


const initialState = {
    tags: [],
    isLoading: false,
    error: ""
}


const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.isLoading = false
                state.tags = action.payload
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const tagReducer = tagSlice.reducer;
