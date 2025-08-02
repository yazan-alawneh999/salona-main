import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
    password: '',
    mobileNumber: '',
    address: '',
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

      // Validate phone number: must be 9 or 10 digits
      const isValidPhone = /^\d{9,10}$/.test(profileData.mobileNumber);
      if (!isValidPhone) {
        Alert.alert(t.editProfile.error.invalidPhoneNumber || 'Invalid phone number.');
        return;
      }

      const requestPayload = {
        name: profileData.fullName,
        email: profileData.email,
        phone_number: `+962${profileData.mobileNumber}`,
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
          style={styles.input}
          placeholder={t.editProfile.email}
          placeholderTextColor={Colors.hardGray}
          keyboardType="email-address"
          value={profileData.email}
          onChangeText={value => handleInputChange('email', value)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.softGray, borderRadius: 12, backgroundColor: Colors.black, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 15 }}>
          <Text style={{ fontSize: 22, marginRight: 6 }}>🇯🇴</Text>
          <Text style={{ fontSize: 16, marginHorizontal: 6, color: Colors.white }}>+962</Text>
          <Text style={{ fontSize: 16, color: Colors.white }}>0</Text>
          <TextInput
            style={{ flex: 1, color: Colors.white, fontSize: 16, padding: 0, backgroundColor: 'transparent' }}
            keyboardType="number-pad"
            value={profileData.mobileNumber}
            onChangeText={value => handleInputChange('mobileNumber', value.replace(/[^0-9]/g, ''))}
            placeholder="7XXXXXXXX"
            placeholderTextColor={Colors.hardGray}
            maxLength={10}
          />
        </View>
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
  );
};

export default EditProfileScreen;

