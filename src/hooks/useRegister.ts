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
      console.log('data when trying to register', data);
      const response = await register(data).unwrap();
      console.log('response when trying to register', response);
      // dispatch(setUser({
      //   name: response.user.name,
      //   email: response.user.email,
      //   // token: response.token,
      //   id: response.user.id,
      //   // isActive: response.user.is_active === 1,
      //   type: response.user.type || '',
      //   isAuthenticated: false,
      // }));
      
    //  Alert.alert(t.signup.success.registrationSuccessful, t.signup.success.loginToContinue);

      return { 
        success: true, 
        response 
      };
    } catch (error: any) {
      console.log('REGISTER ERROR:', error);
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
      }
      Alert.alert(t.signup.error.registrationFailed , errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  return { handleRegister, isLoading };
};

export default useRegister;
