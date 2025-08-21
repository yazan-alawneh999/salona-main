import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/slices/authSlice';
import { Alert, NativeModules, Platform } from 'react-native';
import { getFCMToken } from '../services/firebase';
import { useTranslation } from '../contexts/TranslationContext';

const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getDeviceLanguage = (): string => {
    // Get the device language
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS
        : NativeModules.I18nManager.localeIdentifier; // Android

    console.log('📱 Device language:', deviceLanguage);

    // Extract the primary language code (e.g., 'en' from 'en-US')
    const primaryLanguage = deviceLanguage.split(/[-_]/)[0].toLowerCase();
    
    // For now, we'll support 'en' and 'ar', defaulting to 'en' for others
    const supportedLanguages = ['en', 'ar'];
    const finalLanguage = supportedLanguages.includes(primaryLanguage) ? primaryLanguage : 'en';
    
    console.log('🌐 Using language:', finalLanguage);
    return finalLanguage;
  };

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      console.log('🔄 Starting login process...');
      
      // Get FCM token before login
      console.log('🔄 Getting FCM token...');
      const fcmToken = await getFCMToken();
      console.log('✅ FCM token obtained:', fcmToken || 'No token available');
      
      // Get device language
      const deviceLang = getDeviceLanguage();
      console.log('📱 Device language detected:', deviceLang);
      
      // Log the exact token being sent
      const tokenToSend = fcmToken || "dummy_fcm_token_123";
      console.log('📤 SENDING FCM TOKEN WITH LOGIN REQUEST:', tokenToSend);
      
      // Log the full request body
      const requestBody = {
        ...credentials,
        fcm_token: tokenToSend,
        current_lang: deviceLang
      };
      console.log('📤 Full login request body:', requestBody);
      
      console.log('🔄 Attempting login with credentials...');
      const response = await login(requestBody).unwrap();

      console.log('📥 Login API Response:', {
        user: response.user,
        token: response.token ? 'Token received' : 'No token',
        userType: response.user.type
      });

      if (!response.token) {
        console.error('❌ No authentication token received from server');
        Alert.alert(
              t.login.errors.loginFailed,
              t.login.errors.loginFailedMessage
        );
        return { success: false, error: 'No token received from server' };
      }

      console.log('✅ Login API call successful');
      console.log('💾 Storing authentication token...');
      
      // Log the full token for debugging
      console.log('🔑 AUTH TOKEN:', response.token);
      console.log('👤 USER ID:', response.user.id);
      console.log('📧 USER EMAIL:', response.user.email);
      console.log('👥 USER TYPE:', response.user.type || 'user');
      
      // First dispatch the token to ensure it's available for subsequent API calls
      dispatch(setToken(response.token));
      console.log('💾 Token stored in Redux and AsyncStorage');
      
      console.log('💾 Storing user data...');
      console.log('User type from API:', response.user.type);
      console.log('User type to be stored:', response.user.type || 'user');
      
      // Then set the user data
      dispatch(setUser({
        name: response.user.name,
        email: response.user.email,
        type: response.user.type || 'user',
        id: response.user.id,
        isActive: true,
        addresses: []
      }));
      
      console.log('✅ Login process completed successfully');
      
      // Show success message
      // Alert.alert(
      //   'Login Successful',
      //   'Welcome back!'
      // );
      
      return { success: true, response };
    } catch (error: any) {
      console.error('❌ Login error:', error);
      console.error('❌ Full error object:', JSON.stringify(error, null, 2));
      
      // Handle different types of errors
      let errorMessage = 'There was a problem logging in. Please try again.';
      
      if (error.status === 401) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
        console.error('🔍 DEBUG: 401 Unauthorized - Invalid credentials');
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
        console.error('🔍 DEBUG: 500 Server Error');
      } else if (error.message?.includes('invalid JSON')) {
        errorMessage = 'Server communication error. Please try again later.';
        console.error('🔍 DEBUG: Invalid JSON response');
      } else if (error.data?.message) {
        errorMessage = error.data.message;
        console.error('🔍 DEBUG: Backend error message:', error.data.message);
      } else if (error.message) {
        errorMessage = error.message;
        console.error('🔍 DEBUG: Error message:', error.message);
      }
      
      // Log the response data if available
      if (error.data) {
        console.error('🔍 DEBUG: Backend response data:', error.data);
      }
      
      console.error('❌ Final error message:', errorMessage);
      
      Alert.alert(t.login.errors.loginFailed, errorMessage);
      
      return { success: false, error };
    }
  };

  return { handleLogin, isLoading };
};

export default useLogin;
