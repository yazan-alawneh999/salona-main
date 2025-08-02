import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './LoginSignup.styles';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Colors from '../../../constants/Colors';
import {useTranslation} from '../../../contexts/TranslationContext';

import LinearGradient from 'react-native-linear-gradient';

const LoginSignupScreen = ({navigation}: {navigation: any}) => {
  const {t} = useTranslation();
  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const handleProviderLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const handleSignup = () => {
    //get to work copilot
    navigation.navigate('SignupScreen');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/onboarding-new.jpg')}
      style={{flex: 1}}
      resizeMode="cover">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleProviderLogin}
          style={styles.signUpProviderWrapper}>
          <Text style={styles.signUpProviderTxt}>
            {t.loginSignup.providerLogin}
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,1)',
          ]}
          style={styles.background}>
          <View style={styles.buttonContainer}>
            <Text style={styles.title}>Pella</Text>
            <Text style={styles.description}>
              {t.onboarding.takeCareOfYourBeauty}
            </Text>
            <CustomButton
              text={t.loginSignup.login}
              backgroundColor={Colors.black}
              textColor={Colors.white}
              onPress={handleLogin}
              style={[styles.loginButton, {borderColor: Colors.gold}]}
            />
            {/* <CustomButton
              text={t.loginSignup.providerLogin}
              backgroundColor={Colors.black}
              textColor={Colors.white}
              onPress={handleProviderLogin}
              style={[styles.loginButton, {borderColor: Colors.gold}]}
            /> */}
            {/* <CustomButton
              text={t.loginSignup.signup}
              backgroundColor={Colors.black}
              textColor={Colors.white}
              onPress={handleSignup}
              style={[styles.signupButton, {borderColor: Colors.gold}]}
            /> */}
            <Text style={styles.signInTxt}>
              {t.loginSignup.dontHaveAnAccount}
              {'  '}
              <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.loginTxtSapan}>{t.loginSignup.signup}</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

export default LoginSignupScreen;
