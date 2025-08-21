import React, {useState, useCallback, useMemo} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import {useTranslation} from '../../../../contexts/TranslationContext';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ReviewConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  selectedServices = [],
  // discountCode = null,
  discountAmount = 0,
  paymentMethod,
  isRTL = true,
  isBooking,
  initialNotes = '',
}) => {
  const {t} = useTranslation();
  
  // Set default payment method if not provided
  const defaultPaymentMethod = paymentMethod || t.booking.reviewModal.payAtCenter;
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (visible) {
      setNotes(initialNotes || '');
    }
  }, [visible, initialNotes]);

  // Calculate totals based on selected services
  const orderData = useMemo(() => {
    const subtotal =
      selectedServices.length > 0
        ? selectedServices.reduce(
            (sum, service) => sum + (service.price || 0),
            0,
          )
        : 55; // Default value when no services selected

    const discount = discountAmount >= 0 ? discountAmount : 10; // Default discount
    const total = Math.max(0, subtotal - discount);

    // Calculate total duration in minutes
    const totalMinutes =
      selectedServices.length > 0
        ? selectedServices.reduce(
            (sum, service) => sum + (service.duration || 0),
            0,
          )
        : 150; // Default 2.5 hours (150 minutes)

    // Format duration properly - convert to hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let durationText = '';
    if (hours > 0 && minutes > 0) {
      // Format: "2 hr and 30 min" or "2 س و30 د"
      durationText = `${hours} ${t.booking.reviewModal.hour} ${t.booking.reviewModal.and} ${minutes} ${t.booking.reviewModal.minute}`;
    } else if (hours > 0) {
      // Format: "2 hr" or "2 س"
      durationText = `${hours} ${t.booking.reviewModal.hour}`;
    } else if (minutes > 0) {
      // Format: "30 min" or "30 د"
      durationText = `${minutes} ${t.booking.reviewModal.minute}`;
    } else {
      // Default fallback: "2 hr and 30 min" or "2 س و30 د"
      durationText = `2 ${t.booking.reviewModal.hour} ${t.booking.reviewModal.and} 30 ${t.booking.reviewModal.minute}`;
    }

    const servicesCount =
      selectedServices.length > 0 ? selectedServices.length : 2;
    const serviceTime = `${t.booking.reviewModal.services} ${servicesCount} • ${durationText}`;

    return {
      subtotal: `${subtotal.toFixed(0)} ${t.home.currency}`,
      discount: `${discount.toFixed(0)}- ${t.home.currency}`,
      total: `${total.toFixed(0)} ${t.home.currency}`,
      payNow: `0 ${t.home.currency}`,
      payAtCenter: `${total.toFixed(0)} ${t.home.currency}`,
      paymentMethod: defaultPaymentMethod,
      serviceTime,
      totalAmount: total,
    };
  }, [selectedServices, discountAmount, defaultPaymentMethod, t]);

  // const handleConfirm = useCallback(() => {
  //   const bookingData = {
  //     services: selectedServices,
  //     notes: notes.trim(),
  //     discountCode,
  //     discountAmount,
  //     total: orderData.totalAmount,
  //     paymentMethod,
  //   };
  //   onConfirm?.(bookingData);
  // }, [
  //   selectedServices,
  //   notes,
  //   discountCode,
  //   discountAmount,
  //   orderData.totalAmount,
  //   paymentMethod,
  //   onConfirm,
  // ]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  if (!visible) return null;

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleClose}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
              {t.booking.reviewModal.title}
            </Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {/* Discount Code Section */}
            <View style={styles.discountSection}>
              <View style={styles.discountRow}>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>
                    {t.booking.reviewModal.add}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.discountLabel}>
                  {t.booking.reviewModal.discountCode}
                </Text>
              </View>
            </View>

            {/* Order Summary */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryValue}>{orderData.subtotal}</Text>
                <Text style={styles.summaryLabel}>
                  {t.booking.reviewModal.subtotal}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryValue}>{orderData.discount}</Text>
                <Text style={styles.summaryLabel}>
                  {t.booking.reviewModal.discounts}
                </Text>
              </View>
            </View>

            {/* Total Section */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalValue}>{orderData.total}</Text>
                <Text style={styles.totalLabel}>
                  {t.booking.reviewModal.total}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryValue, styles.greenText]}>
                  {orderData.payNow}
                </Text>
                <Text style={[styles.summaryLabel, styles.greenText]}>
                  {t.booking.reviewModal.payNow}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryValue}>{orderData.payAtCenter}</Text>
                <Text style={styles.summaryLabel}>
                  {t.booking.reviewModal.payAtCenter}
                </Text>
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.paymentSection}>
              <Text style={styles.sectionHeader}>
                {t.booking.reviewModal.paymentMethod}
              </Text>
              <View style={styles.paymentMethodContainer}>
                <View style={styles.paymentMethodIcon}>
                  <Text style={styles.cardIcon}>🏪</Text>
                </View>
                <Text style={styles.paymentMethodText}>{orderData.paymentMethod}</Text>
              </View>
            </View>

            {/* Notes Section */}
            <View style={styles.notesSection}>
              <Text style={styles.sectionHeader}>
                {t.booking.reviewModal.notes}
              </Text>
              <View style={styles.notesContainer}>
                <TextInput
                  style={styles.notesInput}
                  placeholder={t.booking.reviewModal.notesPlaceholder}
                  placeholderTextColor="#9CA3AF"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
          </ScrollView>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.serviceTimeContainer}>
              <Text style={styles.serviceTime}>{orderData.serviceTime}</Text>
              <Text style={styles.bottomTotal}>{orderData.total}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                isBooking && {opacity: 0.7}, // dim when loading
              ]}
              onPress={() => onConfirm?.(notes)}
              disabled={isBooking} // disable during booking
              activeOpacity={0.8}>
              {isBooking ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ActivityIndicator size="small" color="#FFF" />
                  <Text style={[styles.confirmButtonText, {marginLeft: 8}]}>
                    {t.booking.reviewModal.confirming}
                  </Text>
                </View>
              ) : (
                <Text style={styles.confirmButtonText}>
                  {t.booking.reviewModal.confirm}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    height: 56,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  discountSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discountLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  addButton: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  addButtonText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '400',
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  totalSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#F8F9FA',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  greenText: {
    color: '#28A745',
  },
  paymentSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  cardIcon: {
    fontSize: 18,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  notesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  notesContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  notesInput: {
    fontSize: 14,
    color: '#111827',
    textAlign: 'right',
    lineHeight: 20,
    width: '100%',
    minHeight: 80,
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 34,
  },
  serviceTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  serviceTime: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '400',
  },
  bottomTotal: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ReviewConfirmModal;
