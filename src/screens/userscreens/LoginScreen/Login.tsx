import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import styles from './Login.styles';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useLogin from '../../../hooks/useLogin';
import CustomInput from '../../../components/CustomInput/CustomInput';
import {useTranslation} from '../../../contexts/TranslationContext';

interface LoginResponse {
  response?: {
    user: {
      name: string;
      email: string;
      type: string;
      id: number;
    };
    token: string;
  };
  success?: boolean;
}

const LoginScreen = ({navigation}: {navigation: any}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin, isLoading} = useLogin();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(t.loginSignup.errors.noEmailOrPassword);
      return;
    }

    console.log('🔍 DEBUG: Attempting login with:', {
      email,
      passwordLength: password.length
    });

    try {
      const result = await handleLogin({email, password});
      
      console.log('🔍 DEBUG: Login result:', result);
      
      if (result.success) {
        console.log('🔍 DEBUG: Login successful');
        // Navigation will be handled by the navigation system based on user type
        // No need to manually navigate here
      } else {
        console.log('🔍 DEBUG: Login failed:', result.error);
      }
    } catch (error) {
      console.error('🔍 DEBUG: Login error caught:', error);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonCircle}
            onPress={() => navigation.goBack()}>
            {/* <View style={styles.backButtonCircle}> */}
            <Icon name="arrow-back" size={20} color={Colors.black} />
            {/* </View> */}
          </TouchableOpacity>
        </View>
        {/* <Image
        source={require('../../../assets/images/prettyLogo.png')}
        style={styles.logo}
        resizeMode="contain"
        /> */}
        <View style={styles.loginForm}>
          <Text style={styles.title}>{t.loginSignup.login}</Text>
          <Text style={styles.description}>{t.loginSignup.loginDesc}</Text>
          <CustomInput
            label={t.loginSignup.email}
            placeholder={t.loginSignup.writeEmail}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            isPassword={false}
          />

          <CustomInput
            label={t.loginSignup.password}
            placeholder={t.loginSignup.writePassword}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>
              {t.loginSignup.forgotPassword}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignIn}
            disabled={isLoading}>
            <Text style={styles.loginButtonText}>
              {isLoading ? t.loginSignup.loading : t.loginSignup.signIn}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
