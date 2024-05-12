import {createSlice} from "@reduxjs/toolkit";
import {
    fetchHousingCreate,
    fetchHousingDelete,
    fetchHousingUpdate,
    fetchHousingWithFilters,
    fetchUserHousing
} from "@/entities/housing";



const initialState = {
    housing: [],
    userHousing: [],
    isLoading: false,
    error: "",
    refresh: false
}


const housingSlice = createSlice({
    name: 'housing',
    initialState,
    reducers: {

    },
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
            .addCase(fetchUserHousing.pending, (state, action)=> {
                state.isLoading = true
            })
            .addCase(fetchUserHousing.fulfilled, (state, action)=> {
                state.isLoading = false
                state.userHousing = action.payload
                state.error = ""
            })
            .addCase(fetchUserHousing.rejected, (state, action)=> {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(fetchHousingCreate.pending, (state, action)=> {
                state.isLoading = true
            })
            .addCase(fetchHousingCreate.fulfilled, (state, action)=> {
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchHousingCreate.rejected, (state, action)=> {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(fetchHousingUpdate.pending, (state, action)=> {
                state.isLoading = true
            })
            .addCase(fetchHousingUpdate.fulfilled, (state, action)=> {
                state.isLoading = false
                state.error = ""
            })
            .addCase(fetchHousingUpdate.rejected, (state, action)=> {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(fetchHousingDelete.fulfilled, (state, action)=> {
                state.refresh = !state.refresh
            })
    }
});

export const housingReducer = housingSlice.reducer;
