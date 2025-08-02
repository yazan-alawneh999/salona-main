import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.hardGray,
  },
  cardContainerRTL: {
    flexDirection: 'row-reverse',
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  infoContainerRTL: {
    marginRight: 0,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  serviceName: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
    marginBottom: 2,
    textAlign: 'left',
  },
  serviceNameRTL: {
    textAlign: 'right',
  },
  duration: {
    fontSize: 11,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    textAlign: 'left',
  },
  durationRTL: {
    textAlign: 'right',
  },
  serviceDescription: {
    fontSize: 11,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    textAlign: 'left',
    marginTop: 2,
  },
  serviceDescriptionRTL: {
    textAlign: 'right',
  },
  priceAndButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceAndButtonRTL: {
    flexDirection: 'row-reverse',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
    marginRight: 8,
  },
  priceRTL: {
    marginRight: 0,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: Colors.gold,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  editButtonRTL: {
    marginLeft: 8,
  },
  editButtonSelected: {
    backgroundColor: Colors.black,
    borderColor: Colors.gold,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
    color: Colors.black,
  },
  editButtonTextRTL: {
    textAlign: 'right',
  },
  editButtonTextSelected: {
    color: Colors.gold,
  },
  deleteButton: {
    backgroundColor: Colors.black,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  deleteButtonRTL: {
    marginLeft: 8,
  },
  deleteButtonSelected: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  deleteButtonText: {
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
  deleteButtonTextRTL: {
    textAlign: 'right',
  },
  deleteButtonTextSelected: {
    color: Colors.black,
  },
  addButton: {
    backgroundColor: Colors.gold,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  addButtonRTL: {
    marginLeft: 8,
  },
  addButtonSelected: {
    backgroundColor: Colors.black,
    borderColor: Colors.gold,
    borderWidth: 1,
  },
  addButtonText: {
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
    color: Colors.black,
  },
  addButtonTextRTL: {
    textAlign: 'right',
  },
  addButtonTextSelected: {
    color: Colors.gold,
  },
});

export default styles;
