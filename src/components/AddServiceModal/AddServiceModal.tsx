import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { useTranslation } from '../../contexts/TranslationContext';
interface AddServiceModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (serviceData: {
    name: string;
    description: string;
    cost: string;
    time: string;
  }) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [time, setTime] = useState('');
  const { t } = useTranslation();
  const handleSubmit = () => {
    if (serviceName && cost) {
      onSubmit({ name: serviceName, description, cost, time });
      setServiceName('');
      setDescription('');
      setCost('');
      setTime('');
      onClose();
    } else {
      Alert.alert(t.addServiceModal.required);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{t.addServiceModal.title}</Text>
          <ScrollView>
            <Text style={styles.inputLabel}>{t.addServiceModal.serviceName}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addServiceModal.serviceNamePlaceholder}
              placeholderTextColor={Colors.softGray}
              value={serviceName}
              onChangeText={setServiceName}
            />
            
            <Text style={styles.inputLabel}>{t.addServiceModal.description}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t.addServiceModal.descriptionPlaceholder}
              placeholderTextColor={Colors.softGray}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            
            <Text style={styles.inputLabel}>{t.addServiceModal.cost}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addServiceModal.costPlaceholder}
              placeholderTextColor={Colors.softGray}
              value={cost}
              keyboardType="numeric"
              onChangeText={setCost}
            />
            
            <Text style={styles.inputLabel}>{t.addServiceModal.duration}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addServiceModal.durationPlaceholder}
              placeholderTextColor={Colors.softGray}
              value={time}
              keyboardType="numeric"
              onChangeText={setTime}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>{t.addServiceModal.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!serviceName || !cost) && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!serviceName || !cost}>
                <Text style={styles.submitButtonText}>{t.addServiceModal.addService}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 15,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: Colors.black,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.black,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    minWidth: 80,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
});

export default AddServiceModal;


