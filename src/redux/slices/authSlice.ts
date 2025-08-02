import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Address } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  is_online: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  is_online: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', action.payload);
      console.log('Token set in Redux:', action.payload.substring(0, 10) + '...');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.is_online = action.payload;
      AsyncStorage.setItem('is_online', action.payload.toString());
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      state.is_online = false;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('is_online');
    },
    loadUserFromStorage: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      console.log('Loaded from storage - Token:', action.payload.token.substring(0, 10) + '...');
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      if (state.user) {
        state.user.addresses = [...(state.user.addresses || []), action.payload];
        AsyncStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    deleteAddress: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.addresses = (state.user.addresses || []).filter(
          (addr) => addr.id !== action.payload
        );
        AsyncStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    updateAddress: (state, action: PayloadAction<{ id: number; isFavorite?: boolean; isPrimary?: boolean; description?: string }>) => {
      if (state.user) {
        state.user.addresses = (state.user.addresses || []).map((addr) => {
          if (addr.id === action.payload.id) {
            return {
              ...addr,
              isFavorite: action.payload.isFavorite !== undefined ? action.payload.isFavorite : addr.isFavorite,
              isPrimary: action.payload.isPrimary !== undefined ? action.payload.isPrimary : addr.isPrimary,
              description: action.payload.description !== undefined ? action.payload.description : addr.description,
            };
          }
          return addr;
        });
        AsyncStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  logout,
  loadUserFromStorage,
  addAddress,
  deleteAddress,
  updateAddress,
  setOnlineStatus,
} = authSlice.actions;

export default authSlice.reducer;
