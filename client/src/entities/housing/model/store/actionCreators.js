import {createAsyncThunk} from "@reduxjs/toolkit";
import {HousingService} from "@/entities/housing/model/index.js";

export const fetchHousingWithFilters = createAsyncThunk(
    "housing/getWithFilters",
    async (values, thunkAPI) => {
        try {
            const response = await HousingService.getWithFilters(values);
            return response.data;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);
