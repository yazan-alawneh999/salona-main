import {useUpdateUserMutation} from '../redux/api/authApi';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/authSlice';
import {Alert} from 'react-native';
import { useTranslation } from '../contexts/TranslationContext';
interface UpdateUserData {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

const useUpdateUser = () => {
  const [updateUserApi, {isLoading}] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleUpdateUser = async (userData: UpdateUserData) => {
    try {
      const response = await updateUserApi(userData).unwrap();
      
      // Ensure we have the required user data
      if (!response.user) {
        throw new Error('Invalid response: missing user data');
      }

      dispatch(
        setUser({
          name: response.user.name,
          email: response.user.email,
          token: response.token,
          id: response.user.id,
          isActive: response.user.is_active === 1,
          addresses: [],
          type: response.user.type || undefined
        })
      );

      Alert.alert(t.editProfile.updateProfileSuccess.updateProfile, t.editProfile.updateProfileSuccess.updateProfileMessage);
      return {success: true, data: response};
    } catch (error: any) {
        console.error('Error details:', error); // Log detailed error information

      const errorMessage =
        error?.data?.message ||
        t.editProfile.error.updateProfile;
      Alert.alert(t.editProfile.error.updateProfile, errorMessage);
      return {success: false, error: errorMessage};
    }
  };

  return {handleUpdateUser, isLoading};
};

export default useUpdateUser;
