import { configureStore } from '@reduxjs/toolkit';

import { timezonesSlice } from '@/features';

export const store = configureStore({
    reducer: {
        timezones: timezonesSlice.reducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
