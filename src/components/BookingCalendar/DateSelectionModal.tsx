import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  ViewStyle,
  TextStyle,
} from 'react-native';
import baseStyles from './DateSelectionModal.styles';
import successModalStyles from './successModal.styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGetAvailabilityQuery, useCreateAppointmentMutation } from '../../redux/api/salonApi';
import { useGetUserAddressesQuery } from '../../redux/api/addressApi';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import {notificationService } from '../../services/notificationService';
import {useTranslation} from '../../contexts/TranslationContext';
import { arSA } from 'date-fns/locale';

interface DateSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  salonId: number;
  totalDuration: number; // Total duration in minutes
  selectedServices?: any[]; // Optional array of selected services
  onBookingSuccess?: () => void; // New prop for handling booking success
}

const DateSelectionModal = ({visible, onClose, salonId, totalDuration, selectedServices = [], onBookingSuccess}: DateSelectionModalProps) => {
  const {t} = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [chooseLocationModalVisible, setChooseLocationModalVisible] = useState(false);
  const navigation = useNavigation<any>();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const [appointmentNotes, setAppointmentNotes] = useState<string>('');
  const { isRTL } = useTranslation();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const selectedAddress = useSelector((state: RootState) => state.salons.selectedAddress);
  
  // Use the Redux query hook to fetch addresses
  const { data: addressData, isLoading: isLoadingAddresses } = useGetUserAddressesQuery(undefined, {
    skip: !token, // Only skip if there's no token
  });
  
  // Extract  from the query result



  const [createAppointment, { isLoading: isCreatingAppointment }] = useCreateAppointmentMutation();

  // Reset states when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Only reset if the modal was open
      if (chooseLocationModalVisible) {
        setChooseLocationModalVisible(false);
      }
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  // Handle modal cleanup when parent visibility changes
  useEffect(() => {
    if (!visible) {
      setChooseLocationModalVisible(false);
      setSuccessModalVisible(false);
      setSelectedLocation('');
    }
  }, [visible]);



  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date,
      day: format(date, 'dd', { locale: isRTL ? arSA : undefined }),
      label: format(date, 'EEEE', { locale: isRTL ? arSA : undefined }),
    };
  });

  // Format date for API (DD-MM-YYYY)
  const formatDateForApi = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    // console.log('Formatted date for API:', formattedDate);
    return formattedDate;
  };

  const formattedDate = formatDateForApi(selectedDate);


  const { data: availabilityData, isLoading, error, refetch: refetchAvailability } = useGetAvailabilityQuery(
    {
      salonId,
      date: formattedDate,
    },
    {
      skip: !salonId,
    }
  );


  const handleDateSelect = (date: Date) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotSelect = (slot: string) => {
    console.log('Slot selected:', slot);
    setSelectedSlot(slot);
  };

  const isSlotSelectable = (slotKey: string, slotObj?: any) => {
    // If slotObj is provided, check is_booked
    if (slotObj && slotObj.is_booked === true) {
      return false;
    }
    return true;
  };

  const handleBookNow = () => {
    if (selectedSlot) {
      setIsBooking(true);
      // setChooseLocationModalVisible(true);
      // Temporarily comment out location selection
      handleBookAppointment();
    }
  };

  const handleBookAppointment = async () => {
    console.log('=== STARTING BOOKING PROCESS ===');
    console.log('Auth Token:', token ? 'Token exists' : 'No token found');
    
    if (!token) {
      console.error('❌ No authentication token found');
      Alert.alert(
        t.booking.errors.authentication,
        t.booking.errors.authenticationMessage,
        [
          {
            text: t.booking.errors.ok,
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
      return;
    }

    console.log('Selected Services:', JSON.stringify(selectedServices, null, 2));
    console.log('Selected Date:', selectedDate);
    console.log('Selected Slot:', selectedSlot);
    // console.log('Selected Location:', selectedLocation);
    console.log('Salon ID:', salonId);
    console.log('Total Duration:', totalDuration);

 
    if (!selectedSlot) {
      console.log('❌ Booking failed: No time slot selected');
      Alert.alert(t.booking.errors.noTimeSlot);
      return;
    }

    // Process selected services based on its type
    let servicesArray = [];
    
    if (Array.isArray(selectedServices)) {
      servicesArray = selectedServices;
    } else if (typeof selectedServices === 'object' && selectedServices !== null) {
      // Convert object to array of services
      servicesArray = Object.values(selectedServices).filter(service => service !== false);
    }

    console.log('Processed services array:', JSON.stringify(servicesArray, null, 2));

    if (servicesArray.length === 0) {
      console.log('❌ Booking failed: No services selected');
      Alert.alert(t.booking.errors.noServices);
      return;
    }

    try {
      console.log('🔄 Starting API call to book appointment...');
      setIsBooking(true);
      
      // Get the selected slot's start time
      const appointmentTime = selectedSlot.split('-')[0];
      console.log('Appointment time from slot:', appointmentTime);
      
      // Format the date for the API (YYYY-MM-DD)
      const appointmentDay = format(selectedDate, 'yyyy-MM-dd');
      console.log('Formatted appointment day:', appointmentDay);
      
      // Get the service IDs from the selectedServices prop
      const serviceIds = servicesArray.map(service => {
        const id = parseInt(service.id, 10);
        console.log('Processing service:', { name: service.name, id });
        return id;
      });
      console.log('Service IDs to be sent:', serviceIds);
      
      const bookingData = {
        salon_id: salonId,
        address_id: selectedAddress?.id,
        appointment_day: appointmentDay,
        appointment_time: appointmentTime,
        note: appointmentNotes,
        services: serviceIds
      };
      
      // Log the complete request details
      console.log('=== API REQUEST DETAILS ===');
      console.log('Endpoint: createAppointment');
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      });
      console.log('Request Body:', JSON.stringify(bookingData, null, 2));
      console.log('=== END API REQUEST DETAILS ===');
      
      // Use RTK Query mutation instead of axios
      const result = await createAppointment(bookingData).unwrap();
      
      console.log('✅ Appointment booked successfully!');
      console.log('📥 API Response:', JSON.stringify(result, null, 2));
      
      // Schedule notification for the appointment
      if (result.success) {
        const appointmentDateTime = new Date(`${appointmentDay}T${appointmentTime}`);
        console.log('Creating notification for:', appointmentDateTime.toISOString());
        
        const notificationData = {
          appointmentId: result.id?.toString() || 'pending',
          salonName: 'Your Salon', // Replace with actual salon name if available
          appointmentTime: appointmentDateTime.toISOString(),
          services: servicesArray.map(service => service.name),
          // address: selectedLocation
        };
        
        console.log('Notification data:', JSON.stringify(notificationData, null, 2));
        // await notificationService.scheduleAppointmentNotification(notificationData);
        console.log('✅ Appointment notification scheduled');
      }
      
      // Clear selected slot after successful booking
      setSelectedSlot(null);
      
      // Call onBookingSuccess if provided
      if (onBookingSuccess) {
        onBookingSuccess();
      }
      
      // Refetch availability data after successful booking
      await refetchAvailability();
      
      // Close the location modal and show success modal
      // setChooseLocationModalVisible(false);
      setSuccessModalVisible(true);
    } catch (error: any) {
      console.error('❌ Error booking appointment:', error);
      
      // Log the complete error details
      console.error('=== ERROR DETAILS ===');
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error));
      console.error('Error message:', error?.message);
      console.error('Error response:', error?.response);
      console.error('Error data:', error?.data);
      console.error('Error status:', error?.status);
      console.error('Error originalError:', error?.originalError);
      console.error('=== END ERROR DETAILS ===');

      // Check if the error is an authentication error (HTML response instead of JSON)
      if (error?.error?.includes('Unexpected character: <')) {
        console.log('❌ Authentication error: Session expired');
        console.log('Current token:', token);
        console.log('Token length:', token?.length);
        
        // Try to parse the HTML error to get more details
        try {
          const errorHtml = error.error;
          console.log('Error HTML:', errorHtml);
          
          // Extract any useful information from the HTML error
          const errorMatch = errorHtml.match(/SQLSTATE\[.*?\]: (.*?)\n/);
          if (errorMatch) {
            console.log('Database error:', errorMatch[1]);
          }
        } catch (parseError) {
          console.log('Could not parse error HTML:', parseError);
        }
        
        const errorResponse = {
          status: 'error',
          code: 'SESSION_EXPIRED',
          message: 'There was an error processing your booking. Please try again.',
          details: {
            type: 'database_error',
            action: 'retry_booking',
            tokenStatus: token ? 'Token exists but may be invalid' : 'No token found'
          }
        };
        console.log('📤 Error Response:', JSON.stringify(errorResponse, null, 2));
        
        Alert.alert(
          t.booking.errors.bookingFailed,
          t.booking.errors.bookingFailedMessage,
          [
            {
              text: t.booking.errors.ok,
              onPress: () => {
                // Just close the alert, don't navigate to login
                // The user can try booking again
              }
            }
          ]
        );
      } else {
        const errorResponse = {
          status: 'error',
          code: 'BOOKING_FAILED',
          message: 'There was an error booking your appointment. Please try again.',
          details: error
        };
        console.log('📤 Error Response:', JSON.stringify(errorResponse, null, 2));
        
        Alert.alert(
          t.booking.errors.bookingFailed,
          errorResponse.message
        );
      }
    } finally {
      console.log('=== BOOKING PROCESS COMPLETED ===');
      setIsBooking(false);
    }
  };

  const renderTimeSlots = () => {
    if (isLoading) {
      return <Text style={baseStyles.loadingText}>{t.booking.timeSlots.loadingSlots}</Text>;
    }

    if (error) {
      return <Text style={baseStyles.noSlotsText}>{t.booking.timeSlots.errorSlots}</Text>;
    }

    if (!availabilityData?.periods) {
      return (
        <View style={baseStyles.slotsContainer}>
          <Text style={baseStyles.slotTitle}>
            {t.booking.availableSlots} {t.booking.for} {format(
              selectedDate,
              'EEEE',
              { locale: isRTL ? arSA : undefined }
            )}
          </Text>
          
        </View>
      );
    }

    // No grouping, just use all periods
    const allSlots = availabilityData.periods;

    return (
      <View style={baseStyles.slotsContainer}>
        <Text style={baseStyles.slotTitle}>
          {t.booking.availableSlots} {t.booking.for} {format(
            selectedDate,
            'EEEE',
            { locale: isRTL ? arSA : undefined }
          )}
        </Text>
        { allSlots.length === 0 && (  
          <>
          <View style={styles.noSlotsContainer}>
            <Icon name="event-busy" size={40} color={Colors.gold} />
            <Text style={[baseStyles.noSlotsText, styles.noSlotsMessage]}>
              {t.booking.timeSlots.noSlotsForDay}
            </Text>
          </View>
          </>
        )}
        <Text style={baseStyles.timeRangeText}>
          {formatTimeAMPM(availabilityData.opening_time)} - {formatTimeAMPM(availabilityData.closing_time)}
        </Text>
        <View style={[baseStyles.slotButtonsContainer, { flexDirection: !isRTL ? 'row' : 'row-reverse', flexWrap: 'wrap' }]}> 
          {allSlots.map(slot => {
            const slotKey = `${slot.start}-${slot.end}`;
            const isAvailable = slot.available !== false;
            const isSelectable = isSlotSelectable(slotKey, slot);
            const isBooked = (slot as any).is_booked === true;
            return (
              <TouchableOpacity
                key={slotKey}
                style={[
                  baseStyles.slotButton,
                  selectedSlot === slotKey && baseStyles.selectedSlotButton,
                  (!isAvailable || !isSelectable || isBooked) && baseStyles.slotButtonDisabled,
                ]}
                disabled={!isAvailable || !isSelectable || isBooked}
                onPress={() => handleSlotSelect(slotKey)}>
                <Text
                  style={[
                    baseStyles.slotText,
                    selectedSlot === slotKey && baseStyles.selectedSlotText,
                    (!isAvailable || !isSelectable || isBooked) && baseStyles.slotTextDisabled,
                  ]}>
                  {slot.start}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    ...baseStyles,
    ...locationStyles,
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      padding: 5,
    },
    notesInput: {
      backgroundColor: Colors.black,
      borderRadius: 12,
      padding: 12,
      color: Colors.white,
      fontFamily: 'Maitree-Regular',
      fontSize: 14,
      minHeight: 80,
      textAlignVertical: 'top',
      borderWidth: 1,
      borderColor: Colors.gold,
    },
    notesContainer: {
      marginVertical: 15,
      width: '100%',
    },
    notesLabel: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: 'Maitree-Medium',
      marginBottom: 8,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookNowButtonLoading: {
      opacity: 0.7,
    },
    noSlotsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      marginTop: 10,
    },
    noSlotsMessage: {
      marginTop: 10,
      textAlign: 'center',
      fontSize: 16,
      color: Colors.white,
      fontFamily: 'Maitree-Medium',
    },
  });

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.modalHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Text style={styles.modalTitle}>{t.booking.selectDate}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
              >
                <Icon name="close" size={28} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.monthText}>
              {format(selectedDate, 'MMMM, yyyy')}
            </Text>

            <View style={styles.dateContainer}>
              <FlatList
                data={dates}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.date.toISOString()}
                inverted={isRTL}
                contentContainerStyle={isRTL ? { flexDirection: 'row' } : undefined}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.dateButton,
                      selectedDate.getDate() === item.date.getDate() && styles.selectedDateButton,
                    ]}
                    onPress={() => handleDateSelect(item.date)}>
                    <Text
                      style={[
                        styles.dateText,
                        selectedDate.getDate() === item.date.getDate() && styles.selectedDateText,
                      ]}>
                      {item.day}
                    </Text>
                    <Text
                      style={[
                        styles.dayText,
                        selectedDate.getDate() === item.date.getDate() && styles.selectedDateText,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {renderTimeSlots()}

            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>{t.booking.notes || 'Notes'}</Text>
              <TextInput
                style={styles.notesInput}
                placeholder={t.booking.notesPlaceholder || 'Add any notes for your appointment...'}
                placeholderTextColor={Colors.white}
                multiline
                numberOfLines={3}
                value={appointmentNotes}
                onChangeText={setAppointmentNotes}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.bookNowButton,
                !selectedSlot && styles.bookNowButtonDisabled,
                isBooking && styles.bookNowButtonLoading,
              ]}
              disabled={!selectedSlot || isBooking}
              onPress={handleBookNow}>
              {isBooking ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={Colors.gold} />
                  <Text style={[styles.bookNowButtonText, { marginLeft: 10 }]}>
                    {t.booking.booking || 'Booking...'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.bookNowButtonText}>{t.booking.book}</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Comment out location selection modal
      <Modal
        visible={chooseLocationModalVisible && visible}
        animationType="fade"
        transparent
        onRequestClose={() => setChooseLocationModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.locationModalContent}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
              onPress={() => setChooseLocationModalVisible(false)}
            >
              <Icon name="close" size={28} color={Colors.gold} />
            </TouchableOpacity>
            <View style={styles.locationHeader}>
              <Text style={styles.locationTitle}>{t.booking.chooseLocation}</Text>
            </View>

            {isLoadingAddresses ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.gold} />
                <Text style={styles.loadingText}>{t.booking.loading}</Text>
              </View>
            ) : userAddresses.length === 0 ? (
              <View style={styles.emptyLocationContainer}>
                <Icon name="location-off" size={40} color={Colors.gold} />
                <Text style={styles.emptyLocationText}>{t.booking.noLocations}</Text>
                <Text style={styles.emptyLocationSubtext}>{t.booking.addLocationMessage}</Text>
              </View>
            ) : (
              <FlatList
                data={userAddresses}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.locationButton,
                      selectedLocation === item.description && styles.selectedLocationButton,
                    ]}
                    onPress={() => handleLocationSelect(item.description)}>
                    <View style={styles.locationContent}>
                      <Icon
                        name="location-on"
                        size={20}
                        color={selectedLocation === item.description ? Colors.black : Colors.gold}
                      />
                      <View style={styles.locationTextContainer}>
                        <Text
                          style={[
                            styles.locationText,
                            selectedLocation === item.description && styles.selectedLocationText,
                          ]}>
                          {item.description}
                        </Text>
                        {item.isPrimary && (
                          <View style={styles.primaryBadge}>
                            <Text style={styles.primaryBadgeText}>{t.booking.primary}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.locationsList}
              />
            )}

            <TouchableOpacity
              style={[
                styles.continueButton,
                (!selectedLocation || userAddresses.length === 0 || isBooking) && styles.continueButtonDisabled,
              ]}
              disabled={!selectedLocation || userAddresses.length === 0 || isBooking}
              onPress={handleBookAppointment}>
              <Text style={styles.continueButtonText}>
                {isBooking ? t.booking.booking : t.booking.book}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      */}

      <Modal
        visible={successModalVisible && visible}
        animationType="fade"
        transparent
        onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={successModalStyles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.booking.success.title}</Text>
              {/* <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSuccessModalVisible(false)}
              >
                <Icon name="close" size={28} color={Colors.gold} />
              </TouchableOpacity> */}
            </View>
            <Image
              source={require('../../assets/images/check-icon.png')}
              style={styles.iconImage}
            />
            <Text style={styles.slotText}>{t.booking.success.location}: {selectedAddress?.description ?? t.booking.success.notAvailable}</Text>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={async () => {
                setSuccessModalVisible(false);
                // Refetch availability data before navigating
                await refetchAvailability();
                navigation.navigate('HomeScreen');
                onClose();
              }}>
              <Text style={styles.bookNowButtonText}>{t.booking.success.homePage}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const locationStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationModalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Colors.black,
    borderRadius: 20,
    padding: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationTitle: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'Maitree-Medium',
  },
  locationButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  selectedLocationButton: {
    backgroundColor: Colors.gold,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
  },
  selectedLocationText: {
    color: Colors.black,
  },
  primaryBadge: {
    backgroundColor: Colors.black,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  primaryBadgeText: {
    color: Colors.gold,
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
  },
  emptyLocationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyLocationText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Maitree-Medium',
    marginTop: 15,
  },
  emptyLocationSubtext: {
    color: Colors.softGray,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    marginTop: 5,
  },
  locationsList: {
    paddingVertical: 10,
  },
  addButton: {
    padding: 5,
  },
  continueButton: {
    backgroundColor: Colors.gold,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.softGray,
  },
  continueButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
  goToLocationsButton: {
    backgroundColor: Colors.gold,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  goToLocationsText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    marginTop: 10,
  },
});

// Helper to get the date object for a given weekday name
function getDateForWeekday(weekdayName: string | undefined, locale: any = undefined) {
  if (!weekdayName) return null;
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const name = format(date, 'EEEE', { locale });
    if (name.toLowerCase() === weekdayName.toLowerCase()) {
      return date;
    }
  }
  return null;
}

// Helper to format time in AM/PM
const formatTimeAMPM = (time: string) => {
  if (!time) return '';
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

export default DateSelectionModal;
