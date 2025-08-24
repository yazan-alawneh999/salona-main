import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Alert} from 'react-native';
import styles from './EditProfile.styles';
import { useTranslation } from '../../../contexts/TranslationContext';
import { useUpdateUserMutation } from '../../../redux/api/authApi';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {user, token} = useSelector((state: RootState) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
  });
  const { t, isRTL } = useTranslation();
  const handleInputChange = (field: string, value: string) => {
    setProfileData({...profileData, [field]: value});
  };
  const handleUpdateProfile = async () => {
    try {
      console.log('Starting profile update...');
      console.log('Token status:', token ? 'Token exists' : 'Token missing');
      
      // Check if token exists in Redux state
      if (!token) {
        console.log('Error: Authentication token is missing');
        Alert.alert(t.editProfile.error.tokenMissing);
        return;
      }



      const requestPayload = {
        name: profileData.fullName,
        email: profileData.email,
      };
      
      console.log('Making API request with payload:', requestPayload);
      
      const response = await updateUser(requestPayload).unwrap();
      console.log('API Response:', response);

      if (response.message === "User updated successfully") {
        console.log('Profile update successful');
        Alert.alert(t.editProfile.success, t.editProfile.updateProfile);
        navigation.goBack();
      } else {
        console.log('Profile update failed:', response.message);
        Alert.alert(t.editProfile.error.updateProfile, response.message || t.editProfile.error.updateProfile);
      }
    } catch (error: any) {
      console.error('Update failed with error:', error);
      console.error('Error details:', {
        status: error.status,
        data: error.data,
        message: error.message
      });
      Alert.alert(t.editProfile.error.updateProfile);
    }
  };

  // Initialize profile data with user's current info
  React.useEffect(() => {
    if (user) {
      console.log('Initializing profile data with user info:', {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number
      });
      // Remove +962 prefix and leading 0 if they exist in the phone number
      let phoneNumber = user.phone_number || '';
      if (phoneNumber.startsWith('+962')) {
        phoneNumber = phoneNumber.substring(4);
      }
      if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.substring(1);
      }
      
      setProfileData({
        ...profileData,
        fullName: user.name || '',
        email: user.email || '',
        mobileNumber: phoneNumber,
      });
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t.editProfile.title}</Text>
          </View>

      <View style={styles.profilePictureContainer}>
        <Image
          source={require('../../../assets/images/eyebrow.png')}
          style={styles.profilePicture}
        />
      </View>
   
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t.editProfile.fullName}
          placeholderTextColor={Colors.hardGray}
          value={profileData.fullName}
          onChangeText={value => handleInputChange('fullName', value)}
        />
        <TextInput
          style={[styles.input, styles.disabledInput]}
          placeholder={t.editProfile.email}
          placeholderTextColor={Colors.hardGray}
          value={profileData.email}
          editable={false}
        />
        <TouchableOpacity 
          style={[styles.phoneInputContainer, styles.disabledInput]}
          onPress={() => {
            // Show toast message that mobile can't be changed
            Alert.alert(
              'Mobile Number Restricted',
              'Mobile number can only be changed by a supervisor. Please contact support if you need to update your mobile number.',
              [{ text: 'OK' }]
            );
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 22, marginRight: 6 }}>🇯🇴</Text>
          <Text style={{ fontSize: 16, marginHorizontal: 6, color: Colors.softGray }}>+962</Text>
          <Text style={{ fontSize: 16, color: Colors.softGray }}>0</Text>
          <Text style={{ flex: 1, color: Colors.softGray, fontSize: 16, padding: 0 }}>
            {profileData.mobileNumber || '7XXXXXXXX'}
          </Text>
        </TouchableOpacity>
      </View>
   
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateProfile}
        disabled={isLoading}>
        <Text style={styles.updateButtonText}>
          {isLoading ? t.editProfile.updatingProfile : t.editProfile.updateProfile}
        </Text>
      </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

