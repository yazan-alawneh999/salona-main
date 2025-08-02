import { getFCMToken } from '../services/firebase';

/**
 * Utility function to get the FCM token for the backend developer
 * This can be called from anywhere in the app to get the current FCM token
 */
export const getFCMTokenForBackend = async (): Promise<string | null> => {
  try {
    const token = await getFCMToken();
    if (token) {
      console.log('FCM Token for backend:', token);
      return token;
    } else {
      console.log('Failed to get FCM token');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token for backend:', error);
    return null;
  }
};

export default getFCMTokenForBackend; 