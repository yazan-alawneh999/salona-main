import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {Dimensions} from 'react-native';
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: Dimensions.get('window').height * 0.1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
  },
  monthText: {
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    // backgroundColor: Colors.gold,
  },
  selectedDateButton: {
    // backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
  },
  selectedDateText: {
    color: Colors.white,
  },
  slotsContainer: {
    marginTop: 20,
  },
  slotTitle: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
    marginBottom: 10,
  },
  timeOfDayTitle: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.black,
    marginVertical: 10,
  },
  slotButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  slotButton: {
    width: (Dimensions.get('window').width - 60) / 4,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,

    marginVertical: 5,
  },
  slotLocationButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSlotButton: {
    backgroundColor: Colors.black,
    borderColor: Colors.gold,
  },
  slotText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
  },
  selectedSlotText: {
    color: Colors.gold,
    fontFamily: 'Maitree-Medium',
  },
  bookNowButton: {
    backgroundColor: Colors.gold,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  bookNowButtonDisabled: {
    backgroundColor: Colors.gold,
  },
  bookNowButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  locationsWrapper: {
    // flex:1,
    width: '100%',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: Colors.black,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  selectedLocationButton: {
    backgroundColor: Colors.hardGray,
    borderColor: Colors.gold,
  },
  addButtonText: {
    color: Colors.gold,
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  noSlotsText: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  slotButtonDisabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.softGray,
  },
  slotTextDisabled: {
    color: Colors.hardGray,
  },
  timeRangeText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
  },
  durationText: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  selectedTimeContainer: {
    backgroundColor: Colors.black,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedTimeText: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
  },
});
export default styles;
