import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface LanguageChangeModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  newLanguage: string;
}

const LanguageChangeModal: React.FC<LanguageChangeModalProps> = ({
  visible,
  onClose,
  onConfirm,
  newLanguage,
}) => {
  const { t, isRTL } = useTranslation();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{t.account.languageChange.title}</Text>
          <Text style={styles.message}>
            {t.account.languageChange.message} {newLanguage === 'ar' ? 'العربية' : 'English'}?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{t.account.languageChange.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{t.account.languageChange.confirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.black,
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
    marginBottom: 15,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: Colors.softGray,
  },
  confirmButton: {
    backgroundColor: Colors.gold,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
  },
});

export default LanguageChangeModal; 