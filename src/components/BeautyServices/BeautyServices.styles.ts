import { StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // alignSelf:'flex-start'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: Colors.gold,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.gold,
  },
  servicesList: {
    paddingHorizontal: 20,
  },
  serviceContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  serviceImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
  },
});

export default styles;
