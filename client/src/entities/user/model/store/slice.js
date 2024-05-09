import {createSlice} from "@reduxjs/toolkit";
import {
    fetchUserLogin,
    fetchUserLogout,
    fetchUserRefresh,
    fetchUserRegistration
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
    isLoading: false,
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
            .addCase(fetchUserRefresh.fulfilled, (state, action) => {
                state.error = '';
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(fetchUserLogout.fulfilled, (state, action) => {
                state.error = '';
                state.user = initialUser;
                state.isAuth = false;
            })
    }
});

export const userReducer = userSlice.reducer;
