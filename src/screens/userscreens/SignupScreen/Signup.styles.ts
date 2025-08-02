import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../constants/Colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
    marginTop: 20,
  },
  backButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.gold,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    color: Colors.white,
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
  },
  termsLink: {
    color: Colors.gold,
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  brandTitle: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#F94F6D',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  registerTitle: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: Colors.customBlack,
    textAlign: 'center',
    marginBottom: height * 0.005,
  },
  registerSubtitle: {
    fontSize: width * 0.04,
    color: '#888',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  inputGroupField: {
    width: '100%',
    marginBottom: height * 0.018,
  },
  inputLabel: {
    fontSize: width * 0.045,
    color: Colors.customBlack,
    marginBottom: height * 0.008,
    textAlign: 'left',
  },
  inputLabelRtl: {
    textAlign: 'right',
  },
  inputField: {
    width: '100%',
    backgroundColor: Colors.customWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: width * 0.045,
    color: Colors.customBlack,
    paddingVertical: height * 0.014,
    paddingHorizontal: width * 0.04,
  },
  inputFieldRtl: {
    textAlign: 'right',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.customWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.004,
  },
  phoneInputRowRtl: {
    flexDirection: 'row-reverse',
  },
  inputFieldPhone: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.014,
  },
  flagIcon: {
    width: width * 0.08,
    height: width * 0.08,
    marginHorizontal: width * 0.01,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  phonePrefix: {
    fontSize: width * 0.045,
    color: Colors.customBlack,
    marginHorizontal: width * 0.01,
  },
});

export default styles;
