import {StyleSheet} from 'react-native';
import Colors from '../../../../../constants/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: Colors.gold,
    shadowOpacity: 0.4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  contentRTL: {
    direction: 'rtl',
  },
  fieldContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.white,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.hardGray,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailsRTL: {
    flexDirection: 'row-reverse',
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.hardGray,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
  },
  oldPrice: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.softGray,
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },
  actionsRTL: {
    flexDirection: 'row-reverse',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  editButton: {},
  deleteButton: {},
  addButton: {},
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
  },
}); 