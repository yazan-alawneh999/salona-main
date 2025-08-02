import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import {useTranslation} from '../../../../contexts/TranslationContext';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const {t, isRTL} = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, isRTL && styles.modalContentRTL]}>
          <Text style={styles.modalTitle}>{t.account.logoutConfirmTitle}</Text>
          <Text style={styles.modalMessage}>
            {t.account.logoutConfirmMessage}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>{t.account.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>{t.account.logout}</Text>
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
    width: Dimensions.get('window').width * 0.85,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalContentRTL: {
    direction: 'rtl',
  },
  modalTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: Colors.softGray,
  },
  confirmButton: {
    backgroundColor: Colors.softGray,
  },
  cancelButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
  },
  confirmButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Maitree-Bold',

},
});

export default LogoutModal; 