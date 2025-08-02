import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import {useTranslation} from '../../../../contexts/TranslationContext';
import Colors from '../../../../constants/Colors';

interface LanguageChangeModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentLanguage: string;
  newLanguage: string;
}

const LanguageChangeModal: React.FC<LanguageChangeModalProps> = ({
  visible,
  onClose,
  onConfirm,
  currentLanguage,
  newLanguage,
}) => {
  const {t, isRTL} = useTranslation();
  
  // Get language names based on the current language
  const getLanguageName = (lang: string) => {
    if (currentLanguage === 'ar') {
      return lang === 'en' ? 'الإنجليزية' : 'العربية';
    } else {
      return lang === 'en' ? 'English' : 'Arabic';
    }
  };

  // Get message based on the current language
  const getMessage = () => {
    if (currentLanguage === 'ar') {
      return `هل أنت متأكد أنك تريد تغيير اللغة من ${getLanguageName(currentLanguage)} إلى ${getLanguageName(newLanguage)}؟`;
    } else {
      return `Are you sure you want to change the language from ${getLanguageName(currentLanguage)} to ${getLanguageName(newLanguage)}?`;
    }
  };

  // Get button text based on the current language
  const getButtonText = () => {
    if (currentLanguage === 'ar') {
      return {
        cancel: 'إلغاء',
        confirm: 'تأكيد',
        title: 'تغيير اللغة'
      };
    } else {
      return {
        cancel: 'Cancel',
        confirm: 'Confirm',
        title: 'Change Language'
      };
    }
  };

  const buttonText = getButtonText();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, isRTL && styles.modalContentRTL]}>
          <Text style={styles.modalTitle}>{buttonText.title}</Text>
          <Text style={styles.modalMessage}>
            {getMessage()}
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>{buttonText.cancel}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>{buttonText.confirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalContentRTL: {
    direction: 'rtl',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Maitree-Medium',
  },
  modalMessage: {
    fontSize: 16,
    color: Colors.softGray,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Maitree-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: Colors.softGray,
  },
  confirmButton: {
    backgroundColor: Colors.gold,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Maitree-Medium',
  },
  confirmButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Maitree-Medium',
  },
});

export default LanguageChangeModal; 