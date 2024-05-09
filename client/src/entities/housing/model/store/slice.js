import {createSlice} from "@reduxjs/toolkit";
import {fetchHousingWithFilters} from "@/entities/housing/model/index.js";



const initialState = {
    housing: [],
    isLoading: false,
    error: ""
}


const housingSlice = createSlice({
    name: 'housing',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchHousingWithFilters.pending, (state, action)=> {
                state.isLoading = true
            })
            .addCase(fetchHousingWithFilters.fulfilled, (state, action)=> {
                state.isLoading = false
                state.housing = action.payload
                state.error = ""
            })
            .addCase(fetchHousingWithFilters.rejected, (state, action)=> {
                state.isLoading = false
                state.error = action.payload
            })
    }
});

export const housingReducer = housingSlice.reducer;
