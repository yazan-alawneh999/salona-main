import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { ar } from '../translations/ar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { View } from 'react-native';
import RNRestart from 'react-native-restart';
export type Language = 'en' | 'ar';
type TranslationType = typeof en;

interface TranslationContextType {
  t: TranslationType;
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);
  const translations = { en, ar };

  // Load language from storage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('language');
        console.log('🔍 Loading language from AsyncStorage:', storedLang);
        
        let lang: Language = 'en';
        if (!storedLang) {
          console.log('📝 No language found in AsyncStorage, setting default to "en"');
          await AsyncStorage.setItem('language', 'en');
        } else {
          lang = storedLang === 'ar' ? 'ar' : 'en';
          console.log('🌐 Setting language from AsyncStorage:', lang);
        }

        // Set RTL based on the loaded language
        const rtl = lang === 'ar';
        console.log('🔄 Initializing RTL to:', rtl);
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);
      
        if (I18nManager.isRTL !== isRTL) {
          console.log('Restarting app for RTL changes');
          RNRestart.restart();
        
        }
        // I18nManager.forceRTL(rtl);
        setIsRTL(rtl);
        
        setCurrentLanguage(lang);
      } catch (error) {
        console.error('❌ Error loading language:', error);
        await AsyncStorage.setItem('language', 'en');
        setCurrentLanguage('en');
        I18nManager.allowRTL(false);
        // I18nManager.forceRTL(false);
        setIsRTL(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      console.log('🔄 Setting new language:', lang);
      
      // First update RTL settings
      const rtl = lang === 'ar';
      console.log('🔄 Setting RTL to:', rtl);
      I18nManager.allowRTL(rtl);
      // I18nManager.forceRTL(rtl);
      setIsRTL(rtl);
      
      // Then update language in storage and state
      await AsyncStorage.setItem('language', lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('❌ Error setting language:', error);
    }
  };

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
  }

  console.log('🌐 Current language:', currentLanguage, 'isRTL:', isRTL);

  const value = {
    t: translations[currentLanguage],
    language: currentLanguage,
    setLanguage,
    isRTL,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 