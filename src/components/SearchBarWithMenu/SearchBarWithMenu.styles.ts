import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 45,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.black,
    borderColor: Colors.white,
    // borderWidth: 1,
    elevation: 4,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 15,
    minHeight: 45,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 10,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  menuIconWrapper: {
    marginLeft: 10,
    backgroundColor: Colors.black,
    borderColor: Colors.gold,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 50,
    justifyContent: 'center',
  },
});
export default styles;
