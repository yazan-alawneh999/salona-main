import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputContainer: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
  },
  otpInputActive: {
    borderColor: Colors.gold,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gold,
    marginLeft: 16,
  },
  instruction: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  otpInput: {
    width: width * 0.12,
    // height: width * 0.12,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.white,
    backgroundColor: Colors.black,
  },
  timerText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: Colors.gold,
    textAlign: 'center',
    // marginTop: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,

    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    // marginTop: 20,
    
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  pinCodeContainer: {
    flexDirection: 'row',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinCodeText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    width: '100%',
  },
  focusStick: {
    backgroundColor: Colors.gold,
    height: 2,
    marginTop: 10,
  },
  activePinCodeContainer: {
    borderColor: Colors.gold,
    borderWidth: 1,
  },
  filledPinCodeContainer: {
    backgroundColor: Colors.gold,
  },
  disabledPinCodeContainer: {
    backgroundColor: Colors.hardGray,
  },
  placeholderText: {
    color: Colors.hardGray,
  },
  submitButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default styles;
