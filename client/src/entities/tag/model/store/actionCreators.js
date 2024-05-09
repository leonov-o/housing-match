import {createAsyncThunk} from "@reduxjs/toolkit";
import {TagService} from "@/entities/tag";


export const fetchTags = createAsyncThunk(
    "tag/fetchTags",
    async (_, thunkAPI) => {
        try {
            const response = await TagService.getTags()
            return response.data
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
)
