import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import styles from './Signup.styles';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';
import useRegister from '../../../hooks/useRegister';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from '../../../contexts/TranslationContext';
import ScreenWrapper from '../../../components/ScreenWrapper/ScreenWrapper';

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const {t, isRTL} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {handleRegister, isLoading} = useRegister();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert(t.signup.error.allFieldsRequired);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(t.signup.error.passwordsDoNotMatch);
      return;
    }
    if (!acceptTerms) {
      Alert.alert(t.signup.error.mustAcceptTerms);
      return;
    }
    // Validate phone number: must be 9 or 10 digits
    const isValidPhone = /^\d{9,10}$/.test(phoneNumber);
    if (!isValidPhone) {
      Alert.alert(t.signup.error.invalidPhoneNumber);
      return;
    }
    // Send full phone number with +962 prefix
    const fullPhoneNumber = `+962${phoneNumber}`;
    const result = await handleRegister({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      phone_number: phoneNumber,
    });
    if (result.success && result.response) {
      navigation.navigate('SignupOTPScreen', {uuid: result.response.uuid});
    } else {
      // Alert.alert(t.signup.error.signupFailed);
      console.log('result.error', result.error);
    }
  };

  const toggleTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={Colors.customWhite} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <View style={styles.backButtonCircle}>
              <Icon name="arrow-back" size={20} color={Colors.black} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: 0, paddingBottom: 0},
          ]}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.registerTitle}>
            {t.signup && t.signup.signUp ? t.signup.signUp : 'Register'}
          </Text>
          <Text style={styles.registerSubtitle}>
            {t.signup.welcomeCreateAccount}
          </Text>

          {/* Name Input */}
          <View style={styles.inputGroupField}>
            <Text style={[styles.inputLabel, isRTL && styles.inputLabelRtl]}>
              {t.signup.name}
            </Text>
            <TextInput
              style={[styles.inputField, isRTL && styles.inputFieldRtl]}
              placeholder={t.signup.writeName}
              placeholderTextColor={Colors.softGray}
              value={name}
              onChangeText={setName}
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
          {/* Email Input */}
          <View style={styles.inputGroupField}>
            <Text style={[styles.inputLabel, isRTL && styles.inputLabelRtl]}>
              {t.signup.email}
            </Text>
            <TextInput
              style={[styles.inputField, isRTL && styles.inputFieldRtl]}
              placeholder="user@user.com"
              placeholderTextColor={Colors.softGray}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
          {/* Phone Input */}
          <View style={styles.inputGroupField}>
            <Text style={[styles.inputLabel, isRTL && styles.inputLabelRtl]}>
              {t.signup.phoneNumber}
            </Text>
            <View
              style={[styles.phoneInputRow, isRTL && styles.phoneInputRowRtl]}>
              <CountryPicker
                countryCode="JO"
                withFlag
                withCallingCode
                withFilter={false}
                withCountryNameButton={false}
                withAlphaFilter={false}
                withCallingCodeButton={false}
                onSelect={() => {}}
                theme={{
                  backgroundColor: Colors.customWhite,
                  onBackgroundTextColor: Colors.customBlack,
                }}
                containerButtonStyle={styles.flagIcon}
              />
              <Text style={styles.phonePrefix}>+962</Text>
              <TextInput
                style={[
                  styles.inputField,
                  styles.inputFieldPhone,
                  isRTL && styles.inputFieldRtl,
                ]}
                placeholder={t.signup.writePhoneNumber}
                placeholderTextColor={Colors.softGray}
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
                textAlign={isRTL ? 'right' : 'left'}
              />
            </View>
          </View>
          {/* Password Input */}
          <View style={styles.inputGroupField}>
            <Text style={[styles.inputLabel, isRTL && styles.inputLabelRtl]}>
              {t.signup.password}
            </Text>
            <TextInput
              style={[styles.inputField, isRTL && styles.inputFieldRtl]}
              placeholder={t.signup.writePassword}
              placeholderTextColor={Colors.softGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
          {/* Confirm Password Input */}
          <View style={styles.inputGroupField}>
            <Text style={[styles.inputLabel, isRTL && styles.inputLabelRtl]}>
              {t.signup.confirmPassword}
            </Text>
            <TextInput
              style={[styles.inputField, isRTL && styles.inputFieldRtl]}
              placeholder={t.signup.writeConfirmPassword}
              placeholderTextColor={Colors.softGray}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              {t.signup.agreeToThe}
              <Text
                style={styles.termsLink}
                onPress={() => navigation.navigate('TermsPolicyScreen')}>
                {t.signup.termsOfService}
              </Text>{' '}
              {t.signup.and}{' '}
              <Text
                style={styles.termsLink}
                onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                {t.signup.privacyPolicy}
              </Text>
            </Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                {backgroundColor: acceptTerms ? Colors.gold : 'transparent'},
              ]}
              onPress={toggleTerms}>
              {acceptTerms && (
                <Icon name="check" size={16} color={Colors.black} />
              )}
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.signUpButton,
              isLoading && styles.signUpButtonDisabled,
              {marginBottom: 32},
            ]}
            onPress={handleSignUp}
            disabled={isLoading}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={Colors.black} size="small" />
                <Text style={[styles.signUpButtonText, {marginLeft: 10}]}>
                  {t.signup.signingUp}
                </Text>
              </View>
            ) : (
              <Text style={styles.signUpButtonText}>{t.signup.signUp}</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
