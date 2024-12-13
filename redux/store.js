import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlice'; // Import your slice reducer

const store = configureStore({
    reducer: {
        account: accountReducer, // Add other reducers here
    },
});

export default store;
