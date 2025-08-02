import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

// Font family mapping for Maitree weights
const Fonts = {
  extraLight: 'Maitree-ExtraLight',
  light: 'Maitree-Light',
  regular: 'Maitree-Regular',
  medium: 'Maitree-Medium',
  semiBold: 'Maitree-SemiBold',
  bold: 'Maitree-Bold',
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors.black,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 10,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
  },
  menuIconWrapper: {
    marginLeft: 10,
    backgroundColor: Colors.black,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 50,
    justifyContent: 'center',
  },
  resultCount: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    marginBottom: 10,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridOption: {
    padding: 5,
  },
  optionText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    marginLeft: 5,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  listItemContainer: {
    marginBottom: 15,
    width: '100%',
  },
  listCard: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  listCardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  listCardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  listCardName: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    marginBottom: 4,
  },
  listCardProfession: {
    color: Colors.softGray,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    marginBottom: 8,
  },
  listCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listCardRatingText: {
    color: Colors.white,
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
  },
});

export default styles;
