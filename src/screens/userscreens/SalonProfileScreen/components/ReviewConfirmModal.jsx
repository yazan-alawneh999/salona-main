// import React, {useState, useCallback, useMemo} from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';

// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// const ReviewConfirmModal = ({visible, onClose, onConfirm}) => {
//   const [notes, setNotes] = useState('');

//   // Memoize order data to prevent unnecessary re-renders
//   const orderData = useMemo(
//     () => ({
//       discountCode: 'إضافة',
//       subtotal: '55.00 د.أ',
//       discount: '-10 د.أ',
//       total: '45 د.أ',
//       payNow: '0 د.أ',
//       payAtCenter: '45 د.أ',
//       paymentMethod: 'الدفع في المركز',
//       serviceTime: 'خدمتان 2 • 2 س و30 د',
//     }),
//     [],
//   );

//   const handleConfirm = useCallback(() => {
//     onConfirm?.(notes);
//   }, [notes, onConfirm]);

//   const handleClose = useCallback(() => {
//     onClose?.();
//   }, [onClose]);

//   if (!visible) return null;

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="pageSheet"
//       onRequestClose={handleClose}>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={handleClose}
//             activeOpacity={0.7}>
//             <Text style={styles.closeIcon}>✕</Text>
//           </TouchableOpacity>

//           <Text style={styles.headerTitle}>مراجعة وتأكيد</Text>

//           <View style={styles.headerRight} />
//         </View>

//         <ScrollView
//           style={styles.scrollView}
//           showsVerticalScrollIndicator={false}
//           bounces={false}>
//           {/* Discount Code Section */}
//           <View style={styles.section}>
//             <View style={styles.row}>
//               <TouchableOpacity style={styles.addButton}>
//                 <Text style={styles.addButtonText}>
//                   {orderData.discountCode}
//                 </Text>
//               </TouchableOpacity>
//               <Text style={styles.sectionTitle}>رمز الخصم</Text>
//             </View>
//           </View>

//           {/* Order Summary */}
//           <View style={styles.section}>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryValue}>{orderData.subtotal}</Text>
//               <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
//             </View>

//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryValue}>{orderData.discount}</Text>
//               <Text style={styles.summaryLabel}>الخصومات</Text>
//             </View>
//           </View>

//           <View style={styles.divider} />

//           {/* Total Section */}
//           <View style={styles.section}>
//             <View style={styles.totalRow}>
//               <Text style={styles.totalValue}>{orderData.total}</Text>
//               <Text style={styles.totalLabel}>الإجمالي</Text>
//             </View>

//             <View style={styles.summaryRow}>
//               <Text style={[styles.summaryValue, styles.greenText]}>
//                 {orderData.payNow}
//               </Text>
//               <Text style={[styles.summaryLabel, styles.greenText]}>
//                 الدفع الآن
//               </Text>
//             </View>

//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryValue}>{orderData.payAtCenter}</Text>
//               <Text style={styles.summaryLabel}>الدفع في المركز</Text>
//             </View>
//           </View>

//           {/* Payment Method */}
//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>طريقة الدفع</Text>
//             <View style={styles.paymentMethodContainer}>
//               <View style={styles.paymentMethodIcon}>
//                 <Text style={styles.cardIcon}>💳</Text>
//               </View>
//               <Text style={styles.paymentMethodText}>
//                 {orderData.paymentMethod}
//               </Text>
//             </View>
//           </View>

//           {/* Notes Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionHeader}>ملاحظات</Text>
//             <View style={styles.notesContainer}>
//               <Text style={styles.notesPlaceholder}>
//                 إضافة تعليقات أو طلبات خاصة بالحجز
//               </Text>
//             </View>
//           </View>

//           {/* Service Time */}
//           <View style={styles.serviceTimeContainer}>
//             <Text style={styles.serviceTime}>{orderData.serviceTime}</Text>
//             <Text style={styles.totalPrice}>{orderData.total}</Text>
//           </View>
//         </ScrollView>

//         {/* Confirm Button */}
//         <View style={styles.footer}>
//           <TouchableOpacity
//             style={styles.confirmButton}
//             onPress={handleConfirm}
//             activeOpacity={0.8}>
//             <Text style={styles.confirmButtonText}>تأكيد</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   closeButton: {
//     width: 32,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   closeIcon: {
//     fontSize: 18,
//     color: '#333333',
//     fontWeight: '300',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333333',
//     textAlign: 'center',
//   },
//   headerRight: {
//     width: 32,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   section: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     color: '#333333',
//     fontWeight: '500',
//   },
//   addButton: {
//     backgroundColor: '#F8F9FA',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E9ECEF',
//   },
//   addButtonText: {
//     fontSize: 14,
//     color: '#6C757D',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   summaryLabel: {
//     fontSize: 16,
//     color: '#333333',
//   },
//   summaryValue: {
//     fontSize: 16,
//     color: '#333333',
//     fontWeight: '500',
//   },
//   greenText: {
//     color: '#28A745',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#F0F0F0',
//     marginHorizontal: 20,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   totalLabel: {
//     fontSize: 18,
//     color: '#333333',
//     fontWeight: '600',
//   },
//   totalValue: {
//     fontSize: 18,
//     color: '#333333',
//     fontWeight: '700',
//   },
//   sectionHeader: {
//     fontSize: 18,
//     color: '#333333',
//     fontWeight: '600',
//     marginBottom: 16,
//   },
//   paymentMethodContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E9ECEF',
//   },
//   paymentMethodIcon: {
//     width: 40,
//     height: 40,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   cardIcon: {
//     fontSize: 20,
//   },
//   paymentMethodText: {
//     fontSize: 16,
//     color: '#333333',
//     fontWeight: '500',
//   },
//   notesContainer: {
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     padding: 16,
//     minHeight: 120,
//     borderWidth: 1,
//     borderColor: '#E9ECEF',
//   },
//   notesPlaceholder: {
//     fontSize: 14,
//     color: '#6C757D',
//     textAlign: 'right',
//   },
//   serviceTimeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#F8F9FA',
//     marginTop: 16,
//   },
//   serviceTime: {
//     fontSize: 14,
//     color: '#6C757D',
//   },
//   totalPrice: {
//     fontSize: 18,
//     color: '#333333',
//     fontWeight: '700',
//   },
//   footer: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     paddingBottom: 32,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//   },
//   confirmButton: {
//     backgroundColor: '#28A745',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   confirmButtonText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
// });

// export default ReviewConfirmModal;
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
  paymentMethod = 'الدفع في المركز',
  isRTL = true,
  isBooking,
  initialNotes = '',
}) => {
  const {t} = useTranslation();
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

    // Calculate total duration in hours
    const totalMinutes =
      selectedServices.length > 0
        ? selectedServices.reduce(
            (sum, service) => sum + (service.duration || 0),
            0,
          ) / 60
        : 150; // Default 2.5 hours (150 minutes)

    const totalHours = totalMinutes / 60;
    const hours = Math.floor(totalHours);
    const remainingMinutes = Math.round((totalHours - hours) * 60);

    let durationText = '';
    if (hours > 0 && remainingMinutes > 0) {
      durationText = `${hours} س و${remainingMinutes} د`;
    } else if (hours > 0) {
      durationText = `${hours} س`;
    } else if (totalHours > 0) {
      durationText = `${totalHours.toFixed(1)} س`;
    } else {
      durationText = '2 س و30 د'; // Default fallback
    }

    const servicesCount =
      selectedServices.length > 0 ? selectedServices.length : 2;
    const serviceTime = `خدمتان ${servicesCount} • ${durationText}`;

    return {
      subtotal: `${subtotal.toFixed(0)} د.أ`,
      discount: `${discount.toFixed(0)}- د.أ`,
      total: `${total.toFixed(0)} د.أ`,
      payNow: '0 د.أ',
      payAtCenter: `${total.toFixed(0)} د.أ`,
      paymentMethod,
      serviceTime,
      totalAmount: total,
    };
  }, [selectedServices, discountAmount, paymentMethod]);

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
                <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
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
