import { loadUserFromStorage } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeAuth = async (dispatch: any) => {
  try {
    console.log('Initializing auth...');
    const storedUser = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');

    console.log('Stored user exists:', !!storedUser);
    console.log('Token exists:', !!token);

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      console.log('User type from storage:', user.type);
      
      // Load both user and token into Redux state
      dispatch(loadUserFromStorage({
        user: {
          ...user,
          isActive: user.isActive
        },
        token
      }));

      console.log('Auth initialization complete - User and token loaded');
    } else {
      console.log('Auth initialization complete - No stored credentials found');
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
  }
};
