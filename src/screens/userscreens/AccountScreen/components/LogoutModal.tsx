import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, onConfirm }) => {
  const { t, isRTL } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, isRTL && styles.modalContentRTL]}>
          <Text style={styles.title}>{t.account.logoutConfirmTitle}</Text>
          <Text style={styles.message}>{t.account.logoutConfirmMessage}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{t.account.cancel}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, styles.logoutButtonText]}>
                {t.account.logout}
              </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  title: {
    fontSize: 20,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.softGray,
  },
  logoutButton: {
    backgroundColor: Colors.softGray,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
  },
  logoutButtonText: {
    color: Colors.white,
  },
});

export default LogoutModal; 