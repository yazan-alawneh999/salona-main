import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Service, Package} from '../../types/salon';
import Colors from '../../constants/Colors';

interface EditPackageModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    amount: string;
    services: string;
    time: string;
    discount_percentage?: number;
  }) => void;
  availableServices: Service[];
  defaultValues: Package;
}

const EditPackageModal: React.FC<EditPackageModalProps> = ({
  visible,
  onClose,
  onSubmit,
  availableServices,
  defaultValues,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [time, setTime] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [selectedServices, setSelectedServices] = useState<{[key: string]: Service}>({});

  useEffect(() => {
    // Initialize form with package data
    setName(defaultValues.name);
    setDescription(defaultValues.description);
    setAmount(defaultValues.amount.toString());
    setTime(defaultValues.time);
    setDiscountPercentage(defaultValues.discount_percentage?.toString() || '');

    // Parse services JSON and set selected services
    try {
      const servicesObj = JSON.parse(defaultValues.services);
      const selected: {[key: string]: Service} = {};
      Object.entries(servicesObj).forEach(([serviceName, serviceId]) => {
        const service = availableServices.find(s => s.id.toString() === serviceId);
        if (service) {
          selected[service.id] = service;
        }
      });
      setSelectedServices(selected);
    } catch (error) {
      console.error('Error parsing services JSON:', error);
    }
  }, [defaultValues, availableServices]);

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
      services: servicesJson,
      time,
      discount_percentage: discountPercentage ? parseInt(discountPercentage) : 0
    });
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
          <Text style={styles.title}>Edit Package</Text>
          <ScrollView>
            <Text style={styles.inputLabel}>Package Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the name of your package (e.g. Silver Package)"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputLabel}>Package Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe what's included in this package and any special features"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
            <Text style={styles.inputLabel}>Package Price (JDs) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the total price for this package"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <Text style={styles.inputLabel}>Package Duration (Minutes) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the total duration for all services"
              value={time}
              onChangeText={setTime}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Discount Percentage</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter discount percentage (0-100)"
              value={discountPercentage}
              onChangeText={setDiscountPercentage}
              keyboardType="numeric"
              maxLength={3}
            />

            <Text style={styles.sectionTitle}>Select Services for Package *</Text>
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
                <Text style={styles.submitButtonText}>Update Package</Text>
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
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Maitree-Bold',
    color: Colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-SemiBold',
    color: Colors.black,
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
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
  inputLabel: {
    fontSize: 15,
    fontFamily: 'Maitree-Medium',
    color: Colors.black,
    marginBottom: 6,
    marginTop: 4,
  },
});

export default EditPackageModal; 