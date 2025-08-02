import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../../../../constants/Colors';
import { useTranslation } from '../../../../../context/TranslationContext';
import { useTheme } from '../../../../../context/ThemeContext';
import { useLanguage } from '../../../../../context/LanguageContext';

interface PackageModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (packageData: {
    name: string;
    description: string;
    services: string;
    amount: number;
    time: string;
    discount_percentage: number;
  }) => void;
  initialData?: {
    name: string;
    description: string;
    services: string;
    amount: number;
    time: string;
    discount_percentage: number;
  };
}

const PackageModal: React.FC<PackageModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData,
}) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { isRTL } = useLanguage();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [services, setServices] = useState(initialData?.services || '');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [discountPercentage, setDiscountPercentage] = useState(
    initialData?.discount_percentage?.toString() || '0'
  );

  const handleSave = () => {
    if (!name || !description || !amount || !time) {
      // Show error message
      return;
    }

    onSave({
      name,
      description,
      services,
      amount: parseFloat(amount),
      time,
      discount_percentage: parseFloat(discountPercentage) || 0,
    });
  };

  if (!visible) return null;

  return (
    <View style={[styles.modalContainer, isDarkMode && styles.modalContainerDark]}>
      <View style={[styles.modalContent, isDarkMode && styles.modalContentDark]}>
        <Text style={[styles.modalTitle, isDarkMode && styles.modalTitleDark]}>
          {initialData ? t('editPackage') : t('addPackage')}
        </Text>

        <ScrollView style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              {t('packageName')}
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={name}
              onChangeText={setName}
              placeholder={t('enterPackageName')}
              placeholderTextColor={isDarkMode ? Colors.gray : Colors.lightGray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              {t('description')}
            </Text>
            <TextInput
              style={[styles.input, styles.textArea, isDarkMode && styles.inputDark]}
              value={description}
              onChangeText={setDescription}
              placeholder={t('enterDescription')}
              placeholderTextColor={isDarkMode ? Colors.gray : Colors.lightGray}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              {t('services')}
            </Text>
            <TextInput
              style={[styles.input, styles.textArea, isDarkMode && styles.inputDark]}
              value={services}
              onChangeText={setServices}
              placeholder={t('enterServices')}
              placeholderTextColor={isDarkMode ? Colors.gray : Colors.lightGray}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              {t('time')}
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={time}
              onChangeText={setTime}
              placeholder={t('enterTime')}
              placeholderTextColor={isDarkMode ? Colors.gray : Colors.lightGray}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              {t('price')}
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={amount}
              onChangeText={setAmount}
              placeholder={t('enterPrice')}
              placeholderTextColor={isDarkMode ? Colors.gray : Colors.lightGray}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode && styles.labelDark]}>
              {t('discountPercentage')}
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={discountPercentage}
              onChangeText={setDiscountPercentage}
              placeholder={t('enterDiscountPercentage')}
              placeholderTextColor={isDarkMode ? Colors.gray : Colors.lightGray}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}>
            <Text style={styles.buttonText}>{t('save')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalContentDark: {
    backgroundColor: Colors.darkBackground,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Maitree-Bold',
    color: Colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTitleDark: {
    color: Colors.white,
  },
  form: {
    maxHeight: '80%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.black,
    marginBottom: 8,
  },
  labelDark: {
    color: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: Colors.black,
  },
  inputDark: {
    borderColor: Colors.darkBorder,
    color: Colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: Colors.lightGray,
  },
  saveButton: {
    backgroundColor: Colors.gold,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    textAlign: 'center',
  },
});

export default PackageModal; 