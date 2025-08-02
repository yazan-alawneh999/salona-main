import React, {useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import CustomButton from '../../../components/CustomButton/CustomButton';
import styles from './Onboarding.styles';
import {useTranslation} from '../../../contexts/TranslationContext';
import {useLanguageChange} from '../../../hooks/useLanguageChange';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LanguageChangeModal from '../../ProviderScreens/Account/components/LanguageChangeModal';

const OnboardingScreen = ({navigation}: {navigation: any}) => {
  const {t, language, isRTL} = useTranslation();
  const {handleLanguageChange} = useLanguageChange();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');

  const handleGetStarted = () => {
    navigation.navigate('LoginSignupScreen');
  };

  const handleOptionPress = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setNewLanguage(newLang);
    setShowLanguageModal(true);
  };

  const handleLanguageChangeConfirm = () => {
    setShowLanguageModal(false);
    handleLanguageChange(newLanguage as any);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/onboarding-new.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <ImageBackground
          source={require('../../../assets/images/prettyLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.languageButton,
          {flexDirection: isRTL ? 'row-reverse' : 'row'},
        ]}
        onPress={handleOptionPress}>
        <Icon name="language" size={20} color={Colors.gold} />
        <Text style={styles.languageButtonText}>
          {language === 'en' ? 'العربية' : 'English'}
        </Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.text}>{t.onboarding.takeCareOfYourBeauty}</Text>
        <CustomButton
          text={t.onboarding.getStarted}
          onPress={handleGetStarted}
          backgroundColor={Colors.black}
          textColor={Colors.white}
          borderRadius={8}
          style={styles.button}
        />
      </View>

      <LanguageChangeModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onConfirm={handleLanguageChangeConfirm}
        currentLanguage={language}
        newLanguage={newLanguage}
      />
    </ImageBackground>
  );
};

export default OnboardingScreen;
