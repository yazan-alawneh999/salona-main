import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 80,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 30,
    alignItems: 'center',
  },
  loginButton: {
    width: '90%',
    borderRadius: 25,
  },
  signupButton: {
    borderRadius: 12,
    width: '90%',
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 2.4,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: Colors.hardGray,
    letterSpacing: 1.2,
    lineHeight: 30,
    fontWeight: '500',
    marginBottom: 20,
  },
  signInTxt: {
    marginTop: 10,
    color: Colors.customBlack,
    fontSize: 16,
    lineHeight: 24,
  },
  loginTxtSapan: {
    color: Colors.gold,
    fontWeight: '600',
    fontSize: 12,
  },

  signUpProviderTxt: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gold,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    // position: 'absolute',
    // top: 40,
    // right: 10,
    // zIndex: 2,
  },
  signUpProviderWrapper: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 2,
  },
});

export default styles;
