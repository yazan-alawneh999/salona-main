import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerContainerRTL: {
    flexDirection: 'row-reverse',
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  footerItemActive: {
    borderTopWidth: 2,
    borderTopColor: Colors.gold,
  },
  footerLabel: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Maitree-Regular',
  },
  footerLabelActive: {
    color: Colors.white,
    fontFamily: 'Maitree-Medium',
  },
});

export default styles;
