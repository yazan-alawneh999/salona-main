import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 230,
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    color: Colors.black,
    fontFamily: 'Maitree-Bold',
  },
  cardSubtitle: {
    fontSize: 10,
    color: Colors.hardGray,
    fontFamily: 'Maitree-Regular',
    marginTop: 4,
  },
  cardDistance: {
    fontSize: 12,
    color: Colors.gold,
    fontFamily: 'Maitree-Regular',
    marginTop: 4,
  },
});
export default styles;
