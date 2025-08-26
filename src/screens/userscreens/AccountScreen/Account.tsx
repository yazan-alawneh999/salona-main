import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import styles from './Account.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import Footer from '../../../components/Footer/Footer';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import useLogout from '../../../hooks/useLogout';
import { useTranslation } from '../../../contexts/TranslationContext';
import { useResetPasswordMutation, useLazyGetUserInfoQuery } from '../../../redux/api/authApi';
import { setUser } from '../../../redux/slices/authSlice';
import LogoutModal from './components/LogoutModal';
import DeleteAccountModal from './components/DeleteAccountModal';
import { useLanguageChange } from '../../../hooks/useLanguageChange';
import { useDeleteUserMutation } from '../../../redux/api/salonApi';
import LanguageChangeModal from './components/LanguageChangeModal';
import StatusModal from './components/StatusModal';

const AccountScreen = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promotionalNotifications, setPromotionalNotifications] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [languageChangeModalVisible, setLanguageChangeModalVisible] = useState(false);
  const [newLanguage, setNewLanguage] = useState<string>('');
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [statusModalType, setStatusModalType] = useState<'success' | 'error'>('success');
  const [statusModalTitle, setStatusModalTitle] = useState('');
  const [statusModalMessage, setStatusModalMessage] = useState('');
  const navigation = useNavigation<any>();
  const { t, language, isRTL } = useTranslation();
  const { handleLanguageChange } = useLanguageChange();
  const [getUserInfo, { isLoading: isLoadingUserInfo }] = useLazyGetUserInfoQuery();
  const dispatch = useDispatch();
  
  const togglePushNotifications = () =>
    setPushNotifications(!pushNotifications);
  const togglePromotionalNotifications = () =>
    setPromotionalNotifications(!promotionalNotifications);
    
  const handleOptionPress = (option: string) => {
    if (option === 'Language') {
      // Show language change modal instead of directly changing
      const newLang = language === 'en' ? 'ar' : 'en';
      setNewLanguage(newLang);
      setLanguageChangeModalVisible(true);
    }
  };
  
  const user = useSelector((state: RootState) => state.auth.user);
  const {handleLogout} = useLogout();
  
  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    handleLogout();
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteUser().unwrap();
      if (result.success) {
        handleLogout();
        navigation.navigate('LoginSignupScreen');
      } else {
        Alert.alert(t.account.error, t.account.deleteAccountError);
      }
    } catch (error) {
      Alert.alert(t.account.error, t.account.deleteAccountError);
    }
  };

  const showStatusModal = (type: 'success' | 'error', title: string, message: string) => {
    setStatusModalType(type);
    setStatusModalTitle(title);
    setStatusModalMessage(message);
    setStatusModalVisible(true);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showStatusModal('error', 'Error', t.account.passwordsDontMatch);
      return;
    }

    setIsLoading(true);
    try {
      const result = await resetPassword({
        old_password: oldPassword,
        password: newPassword,
        password_confirmation: confirmPassword
      }).unwrap();

      // Close the modal and clear fields
      setPasswordModalVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      console.log('result password change', result);
      
      if (result.message === 'Password reset successfully') {
        showStatusModal('success', 'Success', t.account.passwordChanged);
      } else {
        showStatusModal('error', 'Error', result.message || t.account.passwordChangeError);
      }
    } catch (error: any) {
      // Close the modal and clear fields
      setPasswordModalVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showStatusModal('error', 'Error', error.data?.message || t.account.passwordChangeError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChangeConfirm = () => {
    setLanguageChangeModalVisible(false);
    handleLanguageChange(newLanguage as any);
  };

  // Fetch user data on focus (including when returning from EditProfileScreen)
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          console.log('Account screen focused, refetching user data...');
          const userData = await getUserInfo().unwrap();
          if (userData && userData.data) {
            dispatch(setUser(userData.data));
            console.log('User data refreshed in Redux store:', userData.data);
          }
        } catch (error) {
          console.error('Failed to fetch user data on focus:', error);
        }
      };

      fetchUserData();
    }, [getUserInfo, dispatch])
  );

  return (
    console.log('isRtl>>>>>>',isRTL),
    
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <ImageBackground
        source={require('../../../assets/images/pink-bg.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <ScrollView>
        <ProfileHeader
          image={user?.image_url || user?.avatar}
          name={user?.name || 'Guest'}
          email={user?.email}
          onBackPress={() => navigation.goBack()}
          isProvider={false}
          back={false}
        />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.account.myAccount}</Text>

          <View style={[styles.optionWrapper, isRTL && styles.optionRTL]}>

          <TouchableOpacity
            style={[styles.option, !isRTL && styles.optionRTL]}
            onPress={() => navigation.navigate('EditProfileScreen')}>
          <Icon name="person-outline" size={20} color={Colors.gold} / >
          <Text style={[styles.optionText]}>{t.account.personalInfo}</Text>

          </TouchableOpacity>
        

          </View>

          <View style={[styles.optionWrapper, isRTL && styles.optionRTL]}>
          <TouchableOpacity
            style={[styles.option, !isRTL && styles.optionRTL]}
            onPress={() => handleOptionPress('Language')}>
          <Icon name="language" size={20} color={Colors.gold} />
            <Text style={[styles.optionText, isRTL && styles.optionTextRTL]}>{t.account.language}</Text>
          </TouchableOpacity>
          </View>
          <View style={[styles.optionWrapper, isRTL && styles.optionRTL]}>
          <TouchableOpacity 
            style={[styles.option, !isRTL && styles.optionRTL]}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
          <Icon name="policy" size={20} color={Colors.gold}  />
          <Text style={[styles.optionText, isRTL && styles.optionTextRTL]}>{t.account.privacyPolicy}</Text>
          </TouchableOpacity>
          </View>
          <View style={[styles.optionWrapper, isRTL && styles.optionRTL]}>
          <TouchableOpacity
            style={[styles.option, !isRTL && styles.optionRTL]}
            onPress={() => navigation.navigate('TermsPolicyScreen')}>
          <Icon name="description" size={20} color={Colors.gold} />
            <Text style={[styles.optionText, isRTL && styles.optionTextRTL]}>{t.account.termsOfService}</Text>
          </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>{t.account.notifications}</Text>

          <View style={[styles.notificationOption, isRTL && styles.notificationOptionRTL]}>
            <Text style={[styles.optionText]}>{t.account.pushNotifications}</Text>
            <Switch
              value={pushNotifications}
              onValueChange={togglePushNotifications}
              trackColor={{false: Colors.softGray, true: Colors.green}}
              thumbColor={pushNotifications ? Colors.green : Colors.softGray}
            />
            {/* <Icon name="notifications-none" size={20} color={Colors.gold} /> */}
          </View>
          <View style={[styles.notificationOption, isRTL && styles.notificationOptionRTL]}>
            <Text style={[styles.optionText]}>{t.account.promotionalNotifications}</Text>
            <Switch
              value={promotionalNotifications}
              onValueChange={togglePromotionalNotifications}
              trackColor={{false: Colors.softGray, true: Colors.green}}
              thumbColor={
                promotionalNotifications ? Colors.green : Colors.softGray
              }
            />

              {/* <Icon name="notifications-none" size={20} color={Colors.gold} /> */}

          </View>

          <Text style={styles.sectionTitle}>{t.account.more}</Text>
          <TouchableOpacity
            style={[styles.moreOption, !isRTL && styles.moreoptionRTL]}
            onPress={() => navigation.navigate('HelpCenterScreen')}>
            <Text style={[styles.optionText, !isRTL && styles.optionTextRTL]}>{t.account.helpCenter}</Text>
            <Icon name="help-outline" size={20} color={Colors.gold} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.moreOption, !isRTL && styles.moreoptionRTL]}
            onPress={() => setPasswordModalVisible(true)}>
            <Text style={[styles.optionText, !isRTL && styles.optionTextRTL]}>{t.account.changePassword}</Text>
            <Icon name="lock-outline" size={20} color={Colors.gold} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.moreOption, !isRTL && styles.moreoptionRTL ,{borderWidth: 1, borderColor: Colors.red , borderRadius: 10 , paddingHorizontal: 10 , paddingVertical: 5 }]}
            onPress={handleLogoutPress}>
            <Text style={[styles.optionText, isRTL && styles.optionTextRTL , {color: Colors.red}]}>{t.account.logout}</Text>
            <Icon name="logout" size={20} color={Colors.red} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.moreOption, !isRTL && styles.moreoptionRTL , {borderWidth: 1, borderColor: 'rgba(244, 41, 41, 0.85)' , borderRadius: 10 , paddingHorizontal: 10 , paddingVertical: 5 , marginTop: 10, backgroundColor: 'rgba(244, 41, 41, 0.4)' , marginBottom: 10}]}
            onPress={() => setDeleteAccountModalVisible(true)}>
            <Text style={[styles.optionText, !isRTL && styles.optionTextRTL , {color: 'rgba(244, 41, 41, 0.85)'}]}>{t.account.deleteAccount}</Text>
            <Icon name="delete-outline" size={20} color={'rgba(244, 41, 41, 0.85)'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />

      {/* Password Change Modal */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setPasswordModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t.account.changePassword}</Text>

            </View>

            <TextInput
              style={styles.input}
              placeholder={t.account.oldPassword}
              placeholderTextColor={Colors.softGray}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <TextInput
              style={styles.input}
              placeholder={t.account.newPassword}
              placeholderTextColor={Colors.softGray}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              style={styles.input}
              placeholder={t.account.confirmPassword}
              placeholderTextColor={Colors.softGray}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>{t.account.submit}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Status Modal */}
      <StatusModal
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        type={statusModalType}
        title={statusModalTitle}
        message={statusModalMessage}
      />

      {/* Logout Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        onClose={() => setDeleteAccountModalVisible(false)}
        onConfirm={handleDeleteAccount}
      />

      <LanguageChangeModal
        visible={languageChangeModalVisible}
        onClose={() => setLanguageChangeModalVisible(false)}
        onConfirm={handleLanguageChangeConfirm}
        newLanguage={newLanguage}
      />
    </View>
  );
};

export default AccountScreen;
