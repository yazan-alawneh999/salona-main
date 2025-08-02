import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Switch,
  FlatList,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import {useUpdateAvailabilityMutation} from '../../../../redux/api/salonApi';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface EditAvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
  dayId: number;
  currentOpeningTime: string;
  currentClosingTime: string;
  salonId: number;
  onSuccess: () => void;
  isOpen?: boolean;
}

const EditAvailabilityModal: React.FC<EditAvailabilityModalProps> = ({
  visible,
  onClose,
  dayId,
  currentOpeningTime,
  currentClosingTime,
  salonId,
  onSuccess,
  isOpen = true,
}) => {
  const {t} = useTranslation();
  const [isDayOpen, setIsDayOpen] = useState(isOpen);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [isOpeningTimePicker, setIsOpeningTimePicker] = useState(true);

  // Generate time slots with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute, 0);
        const formattedTime = time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push(formattedTime);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Convert 24h to 12h format for display
  const convertTo12Hour = (time24: string) => {
    console.log('Converting time:', time24);
    if (!time24) {
      console.log('Time is empty, returning default');
      return '12:00 AM';
    }

    const timeParts = time24.split(':');
    if (timeParts.length < 2) {
      console.log('Invalid time format, returning default');
      return '12:00 AM';
    }

    const hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1].padStart(2, '0');
    
    if (isNaN(hours)) {
      console.log('Invalid hours, returning default');
      return '12:00 AM';
    }

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    
    const result = `${hour12}:${minutes} ${ampm}`;
    console.log('Converted time:', result);
    return result;
  };

  // Convert 12h to 24h format for API
  const convertTo24Hour = (time12: string) => {
    const [time, period] = time12.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const [openingTime, setOpeningTime] = useState(() => {
    console.log('Initial opening time:', currentOpeningTime);
    return convertTo12Hour(currentOpeningTime);
  });
  const [closingTime, setClosingTime] = useState(() => {
    console.log('Initial closing time:', currentClosingTime);
    return convertTo12Hour(currentClosingTime);
  });
  const [updateAvailability] = useUpdateAvailabilityMutation();

  const handleTimeSelect = (time: string) => {
    if (isOpeningTimePicker) {
      setOpeningTime(time);
    } else {
      setClosingTime(time);
    }
    setIsTimePickerVisible(false);
  };

  const handleSave = async () => {
    try {
      let opening24, closing24;
      if (isDayOpen) {
        opening24 = convertTo24Hour(openingTime);
        closing24 = convertTo24Hour(closingTime);
        // Validate that closing time is after opening time
        const [openingHour, openingMinute] = opening24.split(':').map(Number);
        const [closingHour, closingMinute] = closing24.split(':').map(Number);
        if (closingHour < openingHour || (closingHour === openingHour && closingMinute <= openingMinute)) {
          ToastAndroid.show('Closing time must be after opening time', ToastAndroid.SHORT);
          return;
        }
      } else {
        // Static valid times for closed days
        opening24 = '12:00'; // 12:00 PM
        closing24 = '20:00'; // 08:00 PM
      }
      const updateData = {
        id: dayId,
        opening_time: opening24,
        closing_time: closing24,
        is_open: isDayOpen ? 1 : 0,
      };
      console.log('[EditAvailabilityModal] Sending updateAvailability request:', updateData);
      await updateAvailability(updateData).unwrap();
      ToastAndroid.show('Availability updated successfully', ToastAndroid.SHORT);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating availability:', error);
      ToastAndroid.show('Failed to update availability', ToastAndroid.SHORT);
    }
  };

  const TimePickerModal = () => (
    <Modal
      visible={isTimePickerVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setIsTimePickerVisible(false)}>
      <View style={styles.timePickerModalContainer}>
        <View style={styles.timePickerContent}>
          <Text style={styles.timePickerTitle}>
            {isOpeningTimePicker ? 'Select Opening Time' : 'Select Closing Time'}
          </Text>
          <FlatList
            data={timeSlots}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.timeSlot}
                onPress={() => handleTimeSelect(item)}>
                <Text style={styles.timeSlotText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.timeList}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsTimePickerVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t.editAvailability.title}</Text>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>{t.editAvailability.open}</Text>
            <Switch
              value={isDayOpen}
              onValueChange={setIsDayOpen}
              trackColor={{ false: Colors.hardGray, true: Colors.gold }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.editAvailability.openingTime}</Text>
            <TouchableOpacity
              style={[styles.timeSelector, !isDayOpen && styles.inputDisabled]}
              onPress={() => {
                if (isDayOpen) {
                  setIsOpeningTimePicker(true);
                  setIsTimePickerVisible(true);
                }
              }}>
              <Text style={styles.timeSelectorText}>{openingTime}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.editAvailability.closingTime}</Text>
            <TouchableOpacity
              style={[styles.timeSelector, !isDayOpen && styles.inputDisabled]}
              onPress={() => {
                if (isDayOpen) {
                  setIsOpeningTimePicker(false);
                  setIsTimePickerVisible(true);
                }
              }}>
              <Text style={styles.timeSelectorText}>{closingTime}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TimePickerModal />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  toggleLabel: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    marginBottom: 5,
  },
  timeSelector: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 5,
    padding: 15,
    marginTop: 5,
  },
  timeSelectorText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.gold,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Maitree-Regular',
  },
  saveButtonText: {
    color: Colors.black,
    textAlign: 'center',
    fontFamily: 'Maitree-Bold',
  },
  timePickerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  timePickerContent: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  timePickerTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
    marginBottom: 20,
    textAlign: 'center',
  },
  timeList: {
    maxHeight: 300,
  },
  timeSlot: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  timeSlotText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.gold,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    textAlign: 'center',
  },
});

export default EditAvailabilityModal; 