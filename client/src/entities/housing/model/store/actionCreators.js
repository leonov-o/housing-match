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

export const fetchUserHousing = createAsyncThunk(
    "housing/user",
    async (id, thunkAPI) => {
        try{
            const response = await HousingService.getWithFilters({limit: 100,filters: {ownerId: id, sort: "newest"}});
            return response.data;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchHousingCreate = createAsyncThunk(
    "housing/create",
    async (values, thunkAPI) => {
        try{
            const response = await HousingService.create(values);
            return response.data;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchHousingUpdate = createAsyncThunk(
    "housing/update",
    async ({id, values}, thunkAPI) => {
        try{
            const response = await HousingService.update(id, values);
            return response.data;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);


export const fetchHousingDelete = createAsyncThunk(
    "housing/delete",
    async (id, thunkAPI) => {
        try{
            const response = await HousingService.delete(id);
            return response.data;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);
