// src/redux/slice/accountSlide.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUserLoginInfo: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUserLoginInfo: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUserLoginInfo, clearUserLoginInfo } = accountSlice.actions;

export default accountSlice.reducer;
