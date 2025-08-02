import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StatusModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  onClose,
  type,
  title,
  message,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            {type === 'success' ? (
              <Image
                source={require('../../../../assets/images/check-icon.png')}
                style={styles.icon}
              />
            ) : (
              <Icon name="error-outline" size={60} color={Colors.red} />
            )}
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={[
              styles.button,
              type === 'success' ? styles.successButton : styles.errorButton,
            ]}
            onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
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
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Maitree-Medium',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: Colors.softGray,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: Colors.gold,
  },
  errorButton: {
    backgroundColor: Colors.red,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
});

export default StatusModal; 