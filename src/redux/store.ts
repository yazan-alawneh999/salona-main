import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import authReducer from './slices/authSlice';
import { salonApi } from './api/salonApi';
import salonsReducer from './slices/salonSlice';
import serviceAreaReducer from './slices/serviceAreaSlice';
import { addressApi } from './api/addressApi';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    auth: authReducer,
    [salonApi.reducerPath]: salonApi.reducer,
    salons:salonsReducer,
    serviceArea: serviceAreaReducer,
    [addressApi.reducerPath]: addressApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
      .concat(salonApi.middleware)
      .concat(addressApi.middleware),
   
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
