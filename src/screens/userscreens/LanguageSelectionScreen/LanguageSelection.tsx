import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from '../../../contexts/TranslationContext';
import {useLanguageChange} from '../../../hooks/useLanguageChange';
import Colors from '../../../constants/Colors';

const LanguageSelectionScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {handleLanguageChange} = useLanguageChange();

  const handleLanguageSelect = (language: 'en' | 'ar') => {
    handleLanguageChange(language);
    navigation.navigate('LoginSignupScreen' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language please</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('en')}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('ar')}>
          <Text style={styles.buttonText}>العربية</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'semibold',
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default LanguageSelectionScreen;
