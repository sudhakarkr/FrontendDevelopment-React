import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled', 'auth/refresh/fulfilled'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
