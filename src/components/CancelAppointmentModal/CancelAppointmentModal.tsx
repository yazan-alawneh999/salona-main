import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import { useTranslation } from '../../contexts/TranslationContext';

interface CancelAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState('');
  const { t, isRTL } = useTranslation();

  const handleSubmission = () => {
    onSubmit(reason);
    setReason('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{t.reviewBooking.modals.cancel.title}</Text>
          <TextInput
            style={styles.textInput}
            value={reason}
            onChangeText={setReason}
            placeholder={t.reviewBooking.modals.cancel.placeholder}
            placeholderTextColor={Colors.softGray}
            multiline
            textAlign={isRTL ? 'right' : 'left'}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
            <Text style={styles.submitButtonText}>{t.reviewBooking.modals.cancel.submit}</Text>
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
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    padding: 10,
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.gold,
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
});

export default CancelAppointmentModal;
