import { useRegisterMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from '../contexts/TranslationContext';
interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number?: string;
}

interface RegisterResponse {
  user: {
    name: string;
    email: string;
    id: number;
    is_active: number;
  };
  token: string;
  message: string;
  success: boolean;
}


// type NavigationProp = NativeStackNavigationProp<any>

const useRegister = () => {
  const { t } = useTranslation();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleRegister = async (data: RegisterData) => {
    try {
      console.log('🔍 DEBUG: Sending registration data:', data);
      const response = await register(data).unwrap();
      console.log('🔍 DEBUG: Registration response received:', response);
      
      // Check if response has the expected structure
      if (!response.uuid) {
        console.error('🔍 DEBUG: No UUID in response:', response);
        throw new Error('No verification token received from server');
      }
      
      return { 
        success: true, 
        response 
      };
    } catch (error: any) {
      console.error('🔍 DEBUG: REGISTER ERROR:', error);
      console.error('🔍 DEBUG: Error details:', {
        status: error?.status,
        data: error?.data,
        message: error?.message,
        originalError: error
      });
      
      let errorMessage = 'An error occurred. Please try again.';
      const errors = error?.data?.errors || error?.errors;
      
      if (errors) {
        if (errors.email) {
          errorMessage = t.signup.error.emailAlreadyTaken;
        } else if (errors.phone_number) {
          errorMessage = t.signup.error.phoneNumberAlreadyTaken;
        } else if (errors.password) {
          errorMessage = t.signup.error.passwordsDoNotMatch;
        }
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      console.error('🔍 DEBUG: Final error message:', errorMessage);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  return { handleRegister, isLoading };
};

export default useRegister;
