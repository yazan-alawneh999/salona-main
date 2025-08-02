import { useTranslation } from '../contexts/TranslationContext';
import { Language } from '../contexts/TranslationContext';

export const useLanguageChange = () => {
  const { setLanguage } = useTranslation();

  const handleLanguageChange = async (newLang: Language) => {
    try {
      await setLanguage(newLang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return {
    handleLanguageChange,
  };
}; 