import { initializeApp, getApp } from '@react-native-firebase/app';
import { getMessaging } from '@react-native-firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKplQEnueX8njxb1Si1Zc7tLMn5mp-deM",
  authDomain: "spa1-46f3d.firebaseapp.com",
  databaseURL: "https://spa1-46f3d-default-rtdb.firebaseio.com",
  projectId: "spa1-46f3d",
  storageBucket: "spa1-46f3d.firebasestorage.app",
  messagingSenderId: "218571464302",
  appId: "1:218571464302:web:f501f4a1c6d6941e61907f",
  measurementId: "G-XHCYGWWCKS"
};

export const initializeFirebaseApp = () => {
  try {
    console.log('🔄 Attempting to get existing Firebase app...');
    return getApp();
  } catch (error) {
    console.log('📱 Initializing new Firebase app...');
    return initializeApp(firebaseConfig);
  }
};

export const initializeMessaging = async () => {
  try {
    console.log('🔄 Setting up Firebase messaging...');
    const app = initializeFirebaseApp();
    const messaging = getMessaging(app);
    console.log('✅ Firebase messaging initialized successfully');
    return messaging;
  } catch (error) {
    console.error('❌ Error initializing messaging:', error);
    throw error;
  }
}; 