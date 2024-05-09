import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserService} from "@/entities/user/model/index.js";

export const fetchUserRegistration = createAsyncThunk(
    "user/register",
    async (values, thunkAPI) => {
        try {
            const response = await UserService.registration(values);
            const {access_token: accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            return user;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchUserLogin = createAsyncThunk(
    "user/login",
    async (values, thunkAPI) => {
        try {
            const response = await UserService.login(values);
            const {access_token: accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            return user;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchUserRefresh = createAsyncThunk(
    "user/refresh",
    async (values, thunkAPI) => {
        try {
            const response = await UserService.refresh();
            const {access_token: accessToken, user} = response.data;
            localStorage.setItem('token', accessToken);
            return user;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchUserLogout = createAsyncThunk(
    "user/logout",
    async (values, thunkAPI) => {
        try {
            const response = await UserService.logout();
            localStorage.removeItem('token');
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchUserUpdate = createAsyncThunk(
    "user/update",
    async ({id, values}, thunkAPI) => {
        try {
            const response = await UserService.update(id, values);
            return response.data;
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

export const fetchUserDelete = createAsyncThunk(
    "user/delete",
    async (id, thunkAPI) => {
        try {
            const response = await UserService.delete(id);
            localStorage.removeItem('token');
        } catch (e) {
            throw thunkAPI.rejectWithValue(e.response?.data?.message);
        }
    }
);

