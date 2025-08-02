import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  numberOfNotifications: number;
}

const initialState: UserState = {
  numberOfNotifications: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    incrementNotifications: (state) => {
      state.numberOfNotifications += 1;
      // Save to AsyncStorage
      AsyncStorage.setItem('numberOfNotifications', state.numberOfNotifications.toString());
    },
    setNotifications: (state, action: PayloadAction<number>) => {
      state.numberOfNotifications = action.payload;
      // Save to AsyncStorage
      AsyncStorage.setItem('numberOfNotifications', action.payload.toString());
    },
    resetNotifications: (state) => {
      state.numberOfNotifications = 0;
      // Save to AsyncStorage
      AsyncStorage.setItem('numberOfNotifications', '0');
    },
  },
});

export const {
  updateUser,
  incrementNotifications,
  setNotifications,
  resetNotifications,
} = userSlice.actions;

export default userSlice.reducer; 