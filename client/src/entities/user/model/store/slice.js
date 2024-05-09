import {createSlice} from "@reduxjs/toolkit";
import {
    fetchUserLogin,
    fetchUserLogout,
    fetchUserRefresh,
    fetchUserRegistration, fetchUserUpdate
} from "@/entities/user/model/store/actionCreators.js";

const initialUser = {
    id: "",
    email: "",
    name: "",
    surname: "",
    avatar: "",
    is_activated: false
}

const initialState = {
    user: initialUser,
    isLoading: true,
    isAuth: false,
    error: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserRegistration.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUserRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(fetchUserRegistration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUserLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(fetchUserLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserRefresh.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUserRefresh.fulfilled, (state, action) => {
                state.error = '';
                state.user = action.payload;
                state.isAuth = true;
                state.isLoading = false
            })
            .addCase(fetchUserRefresh.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchUserLogout.fulfilled, (state, action) => {
                state.error = '';
                state.user = initialUser;
                state.isAuth = false;
            })
            .addCase(fetchUserUpdate.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
});

export const userReducer = userSlice.reducer;
