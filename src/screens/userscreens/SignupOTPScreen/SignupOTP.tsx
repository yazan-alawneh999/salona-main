import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import styles from './SignupOTP.styles';
import { useVerifyOtpMutation } from '../../../redux/api/authApi';
import { OtpInput } from 'react-native-otp-entry';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '../../../contexts/TranslationContext';

const SignupOTPScreen = () => {
  const [timer, setTimer] = useState<number>(60);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [otpCode, setOtpCode] = useState('');
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const { t } = useTranslation();
  const handleConfirm = async () => {
    if (!otpCode || otpCode.length !== 6) {
      Alert.alert(t.signup.error.invalidOtp);
      return;
    }

    try {
      console.log('Submitting OTP verification:', {
        otp: otpCode,
        token: route.params?.uuid
      });

      const response = await verifyOtp({ 
        otp: otpCode,
        token: route.params?.uuid 
      }).unwrap();
      
      console.log('OTP verification response:', response);
      
      if (response.success && response.message === 'OTP verified successfully.') {
        Alert.alert(t.signup.success.registrationSuccessful, t.signup.success.loginToContinue);
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert(t.signup.error.otpVerificationFailed);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert(t.signup.error.otpVerificationFailed);
    }
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    // Logic to resend OTP
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButtonCircle}>
            <Icon name="arrow-back" size={20} color={Colors.black} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>{t.signup.verifyYourAccount}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          {t.signup.enterTheOtpSentToYourEmailToVerifyYourAccount}
        </Text>

        <OtpInput
          numberOfDigits={6}
          focusColor={Colors.gold}
          autoFocus={true}
          blurOnFilled={true}
          hideStick={true}
          onTextChange={(text) => setOtpCode(text)}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            placeholderTextStyle: styles.placeholderText,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
          }}
        />

        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} 
          onPress={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.submitButtonText}>{t.signup.submit}</Text>
          )}
        </TouchableOpacity>

        {/* <Text style={styles.timerText}>
          {timer > 0 ? `Resend in 00:${timer < 10 ? `0${timer}` : timer}` : ''}
        </Text>
        {timer === 0 && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupOTPScreen;
