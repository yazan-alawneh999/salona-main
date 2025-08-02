import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  message,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
<Image source={require('../../assets/images/check-icon.png')} style={styles.image} />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Home Page</Text>
          </TouchableOpacity>
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
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: Colors.gold,
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
  image: {
    width: 40, // Adjust the size of the image
    height: 40,
    resizeMode: 'contain',
  },
});

export default SuccessModal;
