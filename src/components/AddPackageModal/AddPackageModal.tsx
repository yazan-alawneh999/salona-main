import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Service} from '../../types/salon';
import Colors from '../../constants/Colors';
import { useTranslation } from '../../contexts/TranslationContext';
interface AddPackageModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    amount: string;
    oldAmount?: string;
    services: string;
    time: string;
    discount_percentage: number;
  }) => void;
  availableServices: Service[];
}

const AddPackageModal: React.FC<AddPackageModalProps> = ({
  visible,
  onClose,
  onSubmit,
  availableServices,
}) => {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const [time, setTime] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [selectedServices, setSelectedServices] = useState<{[key: string]: Service}>({});

  const handleSubmit = () => {
    // Convert selected services to JSON string
    const servicesJson = JSON.stringify(
      Object.entries(selectedServices).reduce((acc, [key, service]) => {
        acc[service.service] = service.id.toString();
        return acc;
      }, {} as {[key: string]: string}),
    );

    onSubmit({
      name,
      description,
      amount,
      oldAmount: oldAmount || undefined,
      services: servicesJson,
      time,
      discount_percentage: discountPercentage ? parseInt(discountPercentage) : 0
    });

    // Reset form
    setName('');
    setDescription('');
    setAmount('');
    setOldAmount('');
    setTime('');
    setDiscountPercentage('');
    setSelectedServices({});
  };

  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      if (prev[service.id]) {
        const updated = {...prev};
        delete updated[service.id];
        return updated;
      }
      return {...prev, [service.id]: service};
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{t.addPackage.title}</Text>
          <ScrollView>
            <Text style={styles.inputLabel}>{t.addPackage.name}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addPackage.namePlaceholder}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputLabel}>{t.addPackage.description}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t.addPackage.descriptionPlaceholder}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <Text style={styles.inputLabel}>{t.addPackage.price}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addPackage.pricePlaceholder}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <Text style={styles.inputLabel}>{t.addPackage.oldPrice}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addPackage.oldPricePlaceholder}
              value={oldAmount}
              onChangeText={setOldAmount}
              keyboardType="numeric"
            />
            <Text style={styles.inputLabel}>{t.addPackage.duration}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addPackage.durationPlaceholder}
              value={time}
              onChangeText={setTime}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>{t.addPackage.discountPercentage}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.addPackage.discountPercentagePlaceholder}
              value={discountPercentage}
              onChangeText={setDiscountPercentage}
              keyboardType="numeric"
              maxLength={3}
            />

            <Text style={styles.sectionTitle}>{t.addPackage.selectServices}</Text>
            <View style={styles.servicesContainer}>
              {availableServices.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceItem,
                    selectedServices[service.id] && styles.selectedService,
                  ]}
                  onPress={() => toggleService(service)}>
                  <Text
                    style={[
                      styles.serviceText,
                      selectedServices[service.id] && styles.selectedServiceText,
                    ]}>
                    {service.service}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!name || !description || !amount || !time || Object.keys(selectedServices).length === 0) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={
                  !name ||
                  !description ||
                  !amount ||
                  !time ||
                  Object.keys(selectedServices).length === 0
                }>
                <Text style={styles.submitButtonText}>Add Package</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-SemiBold',
    color: Colors.white,
    marginBottom: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  serviceItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  selectedService: {
    backgroundColor: Colors.gold,
  },
  serviceText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.black,
  },
  selectedServiceText: {
    color: Colors.white,
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
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
  },
});

export default AddPackageModal; 