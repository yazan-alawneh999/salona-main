import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.black,
  },
  content: {
    width: '100%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.gold,
  },
  footerContainerRTL: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.gold,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  footerLabel: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Maitree-Regular',
  },
});

export default styles;
