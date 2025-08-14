import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../constants/Colors';
const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.gold,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: Dimensions.get('window').height * 0.3,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.black,
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.black,
  },
  serviceDuration: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Maitree-Regular',
  },
  servicePrice: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Maitree-Bold',
  },
  removeButton: {
    backgroundColor: Colors.black,
    padding: 5,
    borderRadius: 15,
  },
  removeButtonText: {
    color: Colors.gold,
    fontSize: 12,
    fontFamily: 'Maitree-Bold',
  },
  summary: {
    borderColor: Colors.black,
    paddingTop: 10,
    marginTop: 10,
  },
  summaryText: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: 'Maitree-SemiBold',
    marginBottom: 5,
  },
  continueButton: {
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 34,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: Colors.gold,
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Maitree-SemiBold',
    color: Colors.black,
    marginTop: 20,
  },
  slotTitle: {
    fontSize: 14,
    fontFamily: 'Maitree-Bold',
    color: Colors.black,
    marginTop: 10,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeSlotButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.black,
  },
  timeSlotSelected: {
    backgroundColor: Colors.black,
  },
  timeSlotDisabled: {
    backgroundColor: Colors.softGray,
  },
  timeSlotTextDisabled: {
    color: Colors.softGray,
  },
});
export default modalStyles;
