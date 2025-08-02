import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '../../contexts/TranslationContext';

interface EditServiceModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (serviceData: {
    name: string;
    description: string;
    cost: string;
    time: string;
  }) => void;
  defaultValues?: {
    name: string;
    description: string;
    price: number;
    time: string;
  };
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  visible,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (defaultValues) {
      setServiceName(defaultValues.name || '');
      setDescription(defaultValues.description || '');
      setCost(defaultValues.price?.toString() || '');
      setTime(defaultValues.time || '');
    }
  }, [defaultValues, visible]);

  const handleSubmit = () => {
    if (serviceName && cost) {
      onSubmit({ name: serviceName, description, cost, time });
      setServiceName('');
      setDescription('');
      setCost('');
      setTime('');
      onClose();
    } else {
      Alert.alert(
        t.editServiceModal.errorTitle,
        t.editServiceModal.errorMessage
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Icon name="close" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{t.editServiceModal.editService}</Text>
          <Text style={styles.serviceLabel}>{t.editServiceModal.serviceName}</Text>

          <TextInput
            style={styles.input}
            placeholder={t.editServiceModal.serviceName}
            placeholderTextColor={Colors.hardGray}
            value={serviceName}
            onChangeText={setServiceName}
          />
          <Text style={styles.serviceLabel}>{t.addServiceModal.description}</Text>
          
          <TextInput
            style={styles.input}
            placeholder={t.editServiceModal.description}
            placeholderTextColor={Colors.hardGray}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.serviceLabel}>{t.addServiceModal.cost}</Text>

          <TextInput
            style={styles.input}
            placeholder={t.editServiceModal.cost}
            placeholderTextColor={Colors.hardGray}
            value={cost}
            keyboardType="numeric"
            onChangeText={setCost}
          />
          <Text style={styles.serviceLabel}>{t.editServiceModal.timeTitle}</Text>

          <TextInput
            style={styles.input}
            placeholder={t.editServiceModal.time}
            placeholderTextColor={Colors.hardGray}
            value={time}
            onChangeText={setTime}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t.addServiceModal.submit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.black,
    borderRadius: 15,
    padding: 20,
    width: '100%',
    gap: 10
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceLabel: {
    fontSize: 18,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'Maitree-Regular',
    fontSize: 14,
    color: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  submitButtonText: {
    color: Colors.gold,
    fontFamily: 'Maitree-Medium',
    fontSize: 16,
  },
});

export default EditServiceModal;

